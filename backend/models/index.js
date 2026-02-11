const User = require('./User');
const Project = require('./Project');
const Comment = require('./Comment');
const Like = require('./Like');
const Message = require('./Message');

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

// Un utilisateur peut envoyer beaucoup de messages
User.hasMany(Message, { foreignKey: 'senderId', as: 'sentMessages' });
// Un utilisateur peut recevoir beaucoup de messages
User.hasMany(Message, { foreignKey: 'receiverId', as: 'receivedMessages' });

// Chaque message appartient à un expéditeur et un destinataire
Message.belongsTo(User, { foreignKey: 'senderId', as: 'sender' });
Message.belongsTo(User, { foreignKey: 'receiverId', as: 'receiver' });

module.exports = { User, Project, Comment, Like, Message };