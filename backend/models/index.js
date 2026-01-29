User.hasMany(Project, { foreignKey: 'ownerId' });
Project.belongsTo(User, { foreignKey: 'ownerId' });