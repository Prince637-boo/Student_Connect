const User = require('./User');
const Project = require('./Project');
const Comment = require('./Comment');
const Like = require('./Like');

// Relations User <-> Project
User.hasMany(Project, { foreignKey: 'ownerId' });
Project.belongsTo(User, { foreignKey: 'ownerId' });

// Relations User <-> Comment
User.hasMany(Comment, { foreignKey: 'userId' });
Comment.belongsTo(User, { foreignKey: 'userId' });

// Relations Project <-> Comment
Project.hasMany(Comment, { foreignKey: 'projectId' });
Comment.belongsTo(Project, { foreignKey: 'projectId' });

// Relations Likes (User <-> Project)
User.hasMany(Like, { foreignKey: 'userId' });
Like.belongsTo(User, { foreignKey: 'userId' });

Project.hasMany(Like, { foreignKey: 'projectId' });
Like.belongsTo(Project, { foreignKey: 'projectId' });

module.exports = { User, Project, Comment, Like };