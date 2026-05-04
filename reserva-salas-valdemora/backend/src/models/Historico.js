const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const User = require('./User');

const Historico = sequelize.define('Historico', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  entidad: {
    type: DataTypes.STRING,
    allowNull: false
  },
  entidadId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  accion: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  tableName: 'historicos',
  timestamps: true
});

Historico.belongsTo(User, { foreignKey: { allowNull: false } });
User.hasMany(Historico);

module.exports = Historico;
