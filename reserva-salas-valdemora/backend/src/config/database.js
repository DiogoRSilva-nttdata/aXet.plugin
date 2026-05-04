const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  String(process.env.DB_NAME),
  String(process.env.DB_USER),
  String(process.env.DB_PASSWORD),
  {
    host: String(process.env.DB_HOST),
    port: Number(process.env.DB_PORT),
    dialect: 'postgres',
    logging: false
  }
);

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión a PostgreSQL establecida correctamente.');
  } catch (error) {
    console.error('❌ Error al conectar con PostgreSQL:', error);
  }
};

module.exports = { sequelize, testConnection };
