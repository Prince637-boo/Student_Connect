const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    // Sequelize crée l'ID automatiquement si on ne le précise pas,
    // mais on peut le définir pour plus de contrôle.
    nom: {
        type: DataTypes.STRING,
        allowNull: false
    },
    prenom: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Empêche deux comptes avec le même email
        validate: { isEmail: true }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    sexe: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ecole: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = User;