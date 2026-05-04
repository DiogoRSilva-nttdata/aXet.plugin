const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Centro = require('./Centro');

const Sala = sequelize.define('Sala', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  capacidad: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'salas',
  timestamps: true
});

Sala.belongsTo(Centro, { foreignKey: { allowNull: false } });
Centro.hasMany(Sala);

module.exports = Sala;
