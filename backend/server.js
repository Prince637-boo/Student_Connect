require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet'); // Sécurisation des headers HTTP
const morgan = require('morgan'); // Logging
const errorHandler = require('./middlewares/errorHandler');
const app = express();
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const projectRoutes = require('./routes/project.routes');
const messageRoutes = require('./routes/Message.routes');
const sequelize = require('./config/database');
require('./models'); // Charge les associations

const path = require('path');

// 2. Configuration des options CORS
const corsOptions = {
    origin: 'http://localhost:5173', // L'adresse de ton frontend Vite
    optionsSuccessStatus: 200,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true // Permet d'envoyer des cookies ou headers d'autorisation si besoin
};

//  Application du middleware avant mes routes
app.use(cors(corsOptions));
app.use(helmet()); // Protection avec Helmet
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" })); // Pour permettre le chargement des images
app.use(morgan('dev'));




app.use(express.json());

// Servir les images de manière statique
app.use('/images', express.static(path.join(__dirname, 'images')));

const authLimiter = require('./middlewares/rateLimit');

// Routes pour l'authentification

app.use('/api/auth', authLimiter, authRoutes);

// Routes pour les profils

app.use('/api/user', userRoutes);

// Routes pour les projets

app.use('/api/projects', projectRoutes);

// Routes pour les messages

app.use('/api/messages', messageRoutes);

// Middleware de gestion d'erreur global (à mettre à la fin)
app.use(errorHandler);

//  On synchronise la base de données avant de lancer le serveur
sequelize.sync({ alter: true })
    .then(() => {
        console.log('La base de données est synchronisée ! 🐘');
        app.listen(5000, () => console.log("Serveur prêt sur le port 5000 ! "));
    })
    .catch(err => {
        console.error('Erreur de synchronisation : ', err);
    });




