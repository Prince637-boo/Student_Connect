const express = require('express');
const app = express();
const authRoutes = require('./routes/auth.routes'); 
const userRoutes = require('./routes/user.routes');
const projectRoutes = require('./routes/project.routes');

app.use(express.json());

// Routes pour l'authentification

app.use('/api/auth', authRoutes);

// Routes pour les profils

app.use('/api/user', userRoutes);

// Routes pour les projets

app.use('/api/projects', projectRoutes);

app.listen(5000, () => console.log("Serveur prêt ! "));