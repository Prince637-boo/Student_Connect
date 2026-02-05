// controllers/project.controller.js
const { Project, User, Comment, Like } = require('../models');

exports.createProject = async (req, res) => {
    try {
        const projectObject = req.body;

        let imageUrl = null;
        let videoUrl = null;

        if (req.file) {
            const url = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
            if (req.file.mimetype.startsWith('image/')) {
                imageUrl = url;
            } else if (req.file.mimetype.startsWith('video/')) {
                videoUrl = url;
            }
        }

        const { title, description, category, youtubeLink } = projectObject;

        if (!title || !description || !category) {
            return res.status(400).json({ error: "Tous les champs sont obligatoires !" });
        }

        const ownerId = req.auth.userId;

        const newProject = await Project.create({
            title,
            description,
            category,
            youtubeLink,
            imageUrl,
            videoUrl,
            ownerId
        });

        res.status(201).json(newProject);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la création du projet" });
    }
};

// --- RÉCUPÉRER TOUS LES PROJETS ---
exports.getAllProjects = async (req, res) => {
    try {
        const projects = await Project.findAll({
            include: [
                {
                    model: User,
                    attributes: ['nom', 'prenom']
                },
                {
                    model: Comment,
                    include: { model: User, attributes: ['nom', 'prenom'] } // Pour afficher l'auteur du com
                },
                {
                    model: Like,
                    attributes: ['userId'] // On récupère juste les ID des likers pour le front
                }
            ],
            order: [['createdAt', 'DESC']]
        });
        res.status(200).json(projects);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Erreur lors de la récupération des projets." });
    }
};

// --- MODIFIER UN PROJET ---
exports.updateProject = async (req, res) => {
    try {
        const { id } = req.params;
        const project = await Project.findByPk(id);

        if (!project) return res.status(404).json({ error: "Projet introuvable" });

        if (project.ownerId !== req.auth.userId) {
            return res.status(403).json({ error: "Action non autorisée !" });
        }

        const projectObject = { ...req.body };

        if (req.file) {
            const url = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
            if (req.file.mimetype.startsWith('image/')) {
                projectObject.imageUrl = url;
            } else if (req.file.mimetype.startsWith('video/')) {
                projectObject.videoUrl = url;
            }
        }

        await project.update(projectObject);
        res.status(200).json({ message: "Projet mis à jour !", project });
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la modification." });
    }
};

// --- SUPPRIMER UN PROJET ---
exports.deleteProject = async (req, res) => {
    try {
        const { id } = req.params;
        const project = await Project.findByPk(id);

        if (!project) return res.status(404).json({ error: "Projet introuvable" });

        if (project.ownerId !== req.auth.userId) {
            return res.status(403).json({ error: "Action non autorisée !" });
        }

        await project.destroy();
        res.status(200).json({ message: "Projet supprimé avec succès." });
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la suppression." });
    }
};

// --- LIKE / DISLIKE ---
exports.likeProject = async (req, res) => {
    try {
        const projectId = req.params.id;
        const userId = req.auth.userId;

        const project = await Project.findByPk(projectId);
        if (!project) return res.status(404).json({ error: "Projet introuvable" });

        const existingLike = await Like.findOne({
            where: { projectId, userId }
        });

        if (existingLike) {
            await existingLike.destroy();
            res.status(200).json({ message: "Like supprimé" });
        } else {
            await Like.create({ projectId, userId });
            res.status(201).json({ message: "Like ajouté" });
        }
    } catch (error) {
        res.status(500).json({ error: "Erreur lors du like." });
    }
};

// --- AJOUTER UN COMMENTAIRE ---
exports.addComment = async (req, res) => {
    try {
        const projectId = req.params.id;
        const { content } = req.body;
        const userId = req.auth.userId;

        if (!content) {
            return res.status(400).json({ error: "Le commentaire est vide" });
        }

        const project = await Project.findByPk(projectId);
        if (!project) {
            return res.status(404).json({ error: "Projet introuvable" });
        }

        const newComment = await Comment.create({
            content,
            projectId,
            userId
        });

        // On renvoie le commentaire avec les infos du user pour l'affichage direct
        const commentWithUser = await Comment.findByPk(newComment.id, {
            include: { model: User, attributes: ['nom', 'prenom'] }
        });

        res.status(201).json({ message: "Commentaire ajouté", comment: commentWithUser });
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de l'ajout du commentaire" });
    }
};

// --- INCRÉMENTER LES VUES ---
exports.trackView = async (req, res) => {
    try {
        const { id } = req.params;
        const project = await Project.findByPk(id);

        if (!project) {
            return res.status(404).json({ error: "Projet introuvable" });
        }

        const views = (project.views || 0) + 1;
        await project.update({ views });

        res.status(200).json({ views });
    } catch (error) {
        res.status(500).json({ error: "Erreur lors du tracking des vues" });
    }
};

