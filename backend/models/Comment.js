const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Comment = sequelize.define('Comment', {
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    }
    // Les clés étrangères userId et projectId seront générées par les associations
});

module.exports = Comment;
