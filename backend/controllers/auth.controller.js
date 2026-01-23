// controllers/auth.controller.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 
// Simulation de base de données
let users = [];

// --- INSCRIPTION ---
exports.register = async (req, res) => {
    try {
        const { email, password, nom, prenom, sexe, ecole } = req.body;

        // 1. Vérification des champs vides
        if (!email || !password || !nom || !prenom || !sexe || !ecole) {
            return res.status(400).json({ error: "Tous les champs sont obligatoires ! " });
        }

        // 2. Vérification de la longueur du mot de passe
        if (password.length < 8) {
            return res.status(400).json({ 
                error: "Le mot de passe doit contenir au moins 8 caractères ! " 
            });
        }

        // 3. Vérification du format de l'email (Regex)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: "L'adresse email n'est pas valide ! " });
        }

        // 4. Vérification si l'email existe déjà
        const userExists = users.find(u => u.email === email);
        if (userExists) {
            return res.status(400).json({ error: "Cet email est déjà utilisé ! " });
        }

        // 5. Hachage du mot de passe
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 6. Création et ENREGISTREMENT de l'utilisateur
        const newUser = {
            id: Date.now(),
            email,
            password: hashedPassword,
            nom,
            prenom,
            sexe,
            ecole
        };

        users.push(newUser); // <--- Très important : on l'ajoute au tableau !

        // 7. Réponse de succès
        res.status(201).json({ 
            message: "Utilisateur créé avec succès ! ",
            user: { nom: newUser.nom, prenom: newUser.prenom, email: newUser.email } 
        });

    } catch (error) {
        res.status(500).json({ error: "Erreur serveur lors de l'inscription." });
    }
};

// --- LOGIN ---
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Chercher l'utilisateur
        const user = users.find(u => u.email === email);
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