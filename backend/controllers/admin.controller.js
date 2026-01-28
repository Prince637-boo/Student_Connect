// controllers/admin.controller.js
exports.deleteAnything = (req, res) => {
    // Dans le futur, on vérifiera si user.role === 'admin'
    // Pour l'instant, on simule une suppression globale
    const { type, id } = req.body; // type peut être 'project' ou 'offer'
    
    // Logique de suppression forcée ici...
    res.status(200).json({ message: `L'admin a supprimé le/la ${type} avec succès.` });
};