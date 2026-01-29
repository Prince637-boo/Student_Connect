const express = require('express');
const app = express();
const authRoutes = require('./routes/auth.routes'); 
const userRoutes = require('./routes/user.routes');
const projectRoutes = require('./routes/project.routes');
const sequelize = require('./config/database');

app.use(express.json());

// Routes pour l'authentification

app.use('/api/auth', authRoutes);

// Routes pour les profils

app.use('/api/user', userRoutes);

// Routes pour les projets

app.use('/api/projects', projectRoutes);

//  On synchronise la base de données avant de lancer le serveur
sequelize.sync()
    .then(() => {
        console.log('La base de données est synchronisée ! 🐘');
        app.listen(5000, () => console.log("Serveur prêt sur le port 5000 ! "));
    })
    .catch(err => {
        console.error('Erreur de synchronisation : ', err);
    });
