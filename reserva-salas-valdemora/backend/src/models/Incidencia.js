const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Reserva = require('./Reserva');
const User = require('./User');

const Incidencia = sequelize.define('Incidencia', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  tipo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  estado: {
    type: DataTypes.ENUM('abierta', 'en_proceso', 'resuelta'),
    allowNull: false,
    defaultValue: 'abierta'
  }
}, {
  tableName: 'incidencias',
  timestamps: true
});

Incidencia.belongsTo(Reserva, { foreignKey: { allowNull: false } });
Reserva.hasMany(Incidencia);

Incidencia.belongsTo(User, { foreignKey: { allowNull: false } });
User.hasMany(Incidencia);

module.exports = Incidencia;
