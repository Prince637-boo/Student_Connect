// controllers/user.controller.js
const { User, Project, Like, Comment } = require('../models');

// Récupérer le profil de l'utilisateur connecté avec ses projets
exports.getMe = async (req, res) => {
    try {
        const userId = req.auth.userId;
        const user = await User.findByPk(userId, {
            attributes: { exclude: ['password'] },
            include: [
                {
                    model: Project,
                    include: [
                        { model: Like, attributes: ['userId'] },
                        { model: Comment, attributes: ['id'] }
                    ]
                }
            ]
        });

        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération du profil" });
    }
};

// Mettre à jour son profil
exports.updateProfile = async (req, res) => {
    try {
        const userId = req.auth.userId;
        const { bio, skills, github, linkedin } = req.body;

        const user = await User.findByPk(userId);
        if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

        const updateData = { bio, skills, github, linkedin };

        if (req.file) {
            updateData.photoUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
        }

        await user.update(updateData);

        res.status(200).json({
            message: "Profil mis à jour ! ✨",
            user: {
                id: user.id,
                nom: user.nom,
                prenom: user.prenom,
                bio: user.bio,
                skills: user.skills,
                github: user.github,
                linkedin: user.linkedin,
                photoUrl: user.photoUrl
            }
        });
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la mise à jour du profil" });
    }
};