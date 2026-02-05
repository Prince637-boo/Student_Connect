const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Like = sequelize.define('Like', {
    // Table de jointure simple, on peut ajouter des champs si besoin (ex: type de réaction)
    // Les clés étrangères userId et projectId seront générées par les associations
});

module.exports = Like;
