require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'postgres',// on précise qu'on veut utiliser postgres
        port: process.env.DB_PORT,
        logging: false, // on désactive les logs

        
    }
);

// on test la connection
async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Connection to database has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }    
}

testConnection();

module.exports = sequelize;