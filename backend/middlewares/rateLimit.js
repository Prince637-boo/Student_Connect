const rateLimit = require('express-rate-limit');

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limite chaque IP à 100 requêtes par fenêtre
    message: "Trop de tentatives de connexion, veuillez réessayer plus tard."
});

module.exports = authLimiter;
