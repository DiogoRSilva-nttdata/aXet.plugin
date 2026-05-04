const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Centro = sequelize.define('Centro', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  direccion: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'centros',
  timestamps: true
});

module.exports = Centro;
