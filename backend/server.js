const express = require('express');
const app = express();
const authRoutes = require('./Routes/auth.routes'); 

app.use(express.json());


app.use('/api/auth', authRoutes);

app.listen(5000, () => console.log("Serveur prêt ! "));