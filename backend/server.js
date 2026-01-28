const express = require('express');
const app = express();
const authRoutes = require('./Routes/auth.routes'); 
const userRoutes = require('./routes/user.routes');

app.use(express.json());

// Routes pour l'authentification

app.use('/api/auth', authRoutes);

// Routes pour les profils

app.use('/api/user', userRoutes);

app.listen(5000, () => console.log("Serveur prêt ! "));