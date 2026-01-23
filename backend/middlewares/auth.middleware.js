// middlewares/auth.middleware.js
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        // 1. Récupérer le token dans le header "Authorization"
        const token = req.headers.authorization.split(' ')[1];

        if (!token) {
            return res.status(401).json({ error: "Accès refusé, token manquant ! " });
        }

        // 2. Vérifier et décoder le token
        const decodedToken = jwt.verify(token, "MA_CLE_SECRETE_SUPER_SECURISEE");

        // 3. Ajouter les infos de l'utilisateur à la requête
        req.auth = { userId: decodedToken.id };

        // 4. Passer à la suite (le contrôleur suivant)
        next();

    } catch (error) {
        res.status(401).json({ error: "Requête non authentifiée ! ❌" });
    }
};