// controllers/user.controller.js

// Simulation d'une base de profils (en attendant PostgreSQL)
let profiles = [];

// Récupérer le profil de l'utilisateur connecté
exports.getMe = (req, res) => {
    // Grace au middleware, on a l'ID dans req.auth.userId
    const userId = req.auth.userId;
    const userProfile = profiles.find(p => p.userId === userId);

    if (!userProfile) {
        return res.status(404).json({ message: "Profil non trouvé" });
    }
    res.status(200).json(userProfile);
};

// Mettre à jour ou créer son profil
exports.updateProfile = (req, res) => {
    const userId = req.auth.userId;
    const { bio, skills, github, linkedin } = req.body;

    // On cherche si le profil existe déjà pour le mettre à jour, sinon on le crée
    let profileIndex = profiles.findIndex(p => p.userId === userId);

    const updatedData = { userId, bio, skills, github, linkedin };

    if (profileIndex !== -1) {
        profiles[profileIndex] = updatedData;
    } else {
        profiles.push(updatedData);
    }

    res.status(200).json({ message: "Profil mis à jour ! ✨", profile: updatedData });
};