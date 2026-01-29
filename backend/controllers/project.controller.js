// controllers/project.controller.js
const User = require('../models/User');

// Créer un nouveau projet
const Project = require('../models/Project');

exports.createProject = async (req, res) => {
    try {
        const { title, description, category } = req.body;

        if (!title || !description || !category) {
            return res.status(400).json({ error: "Tous les champs sont obligatoires !" });
        }
        
        // C'est ici qu'on utilise l'ID extrait du token ! 🔑
        const ownerId = req.auth.userId; 

        const newProject = await Project.create({
            title,
            description,
            category,
            ownerId // On lie le projet à l'utilisateur
        });

        res.status(201).json(newProject);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la création du projet" });
    }
};

// Récupérer tous les projets
exports.getAllProjects = (req, res) => {
    res.status(200).json(projects);
};

// --- RÉCUPÉRER TOUS LES PROJETS ---
exports.getAllProjects = async (req, res) => {
    try {
        const projects = await Project.findAll({
            include: { model: User, attributes: ['nom', 'prenom'] } // On inclut l'auteur
        });
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération des projets." });
    }
};

// --- MODIFIER UN PROJET ---
exports.updateProject = async (req, res) => {
    try {
        const { id } = req.params;
        const project = await Project.findByPk(id);

        if (!project) return res.status(404).json({ error: "Projet introuvable" });

        // Vérification du propriétaire
        if (project.ownerId !== req.auth.userId) {
            return res.status(403).json({ error: "Action non autorisée !" });
        }

        await project.update(req.body); // Met à jour avec les données envoyées
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

        await project.destroy(); // Suppression physique en base de données
        res.status(200).json({ message: "Projet supprimé avec succès." });
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la suppression." });
    }
};

// --- LIKE / DISLIKE ---
exports.likeProject = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.auth.userId;
        const project = await Project.findByPk(id);

        if (!project) return res.status(404).json({ error: "Projet introuvable" });

        // Sequelize gère les tableaux JSON si tu as défini le champ comme tel
        let likes = project.likes || [];
        const index = likes.indexOf(userId);

        if (index === -1) {
            likes.push(userId);
        } else {
            likes.splice(index, 1);
        }

        await project.update({ likes }); // On sauvegarde le nouveau tableau de likes
        res.status(200).json({ message: "Interaction enregistrée", likesCount: likes.length });
    } catch (error) {
        res.status(500).json({ error: "Erreur lors du like." });
    }
};