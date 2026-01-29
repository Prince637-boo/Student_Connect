// controllers/auth.controller.js
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 
exports.register = async (req, res) => {
    try {
        const { nom, prenom, email, password, sexe, ecole } = req.body;

        //vérification: est-ce que tous les champs sont remplis ?
        if (!nom || !prenom || !email || !password || !sexe || !ecole) {
            return res.status(400).json({ error: "Tous les champs sont obligatoires." });
        }

        // 1. Hachage du mot de passe
        const hashedPassword = await bcrypt.hash(password, 12);

        // 2. Création de l'utilisateur en base de données
        const newUser = await User.create({
            nom,
            prenom,
            email,
            password: hashedPassword,
            sexe,
            ecole
        });

        res.status(201).json({ 
            message: "Utilisateur créé en base de données ! ",
            userId: newUser.id 
        });

    } catch (error) {
        // Sequelize renvoie une erreur spécifique si l'email existe déjà (unique constraint)
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ error: "Cet email est déjà utilisé." });
        }
        res.status(500).json({ error: "Erreur lors de l'inscription." });
    }
};

// --- LOGIN ---
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Chercher l'utilisateur
        const user = await User.findOne({ where: { email : email } });
        if (!user) {
                return res.status(400).json({ error: "Utilisateur non trouvé ! " });
            }

        // 2. Vérifier le mot de passe
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Mot de passe incorrect ! " });
        }

        // 3. Créer le Token JWT
        // On met l'ID de l'utilisateur dedans. "RANDOM_SECRET" est une clé que tu choisiras.
        const token = jwt.sign(
            { id: user.id }, 
            "MA_CLE_SECRETE_SUPER_SECURISEE", 
            { expiresIn: '24h' } // Le token expire après un jour
        );

        res.status(200).json({
            message: "Connexion réussie ! ",
            token: token,
            user: { id: user.id, nom: user.nom, prenom: user.prenom }
        });

    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la connexion" });
    }
};