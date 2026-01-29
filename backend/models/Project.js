const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Project = sequelize.define('Project', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    views: {
    type: DataTypes.INTEGER,
    defaultValue: 0
    },

    // On ne définit pas ownerId ici manuellement, 
    // car les "Associations" vont s'en charger proprement.
});

module.exports = Project;
