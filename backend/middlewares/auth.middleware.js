// middlewares/auth.middleware.js
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        // 1. Récupérer le token dans le header "Authorization"
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: "Accès refusé, token manquant ! " });
        }

        const token = authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ error: "Accès refusé, token manquant ! " });
        }

        // 2. Vérifier et décoder le token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET || "MA_CLE_SECRETE_SUPER_SECURISEE");

        // 3. Ajouter les infos de l'utilisateur à la requête
        req.auth = { userId: decodedToken.id };

        // 4. Passer à la suite (le contrôleur suivant)
        next();

    } catch (error) {
        res.status(401).json({ error: "Requête non authentifiée ! ❌" });
    }
};