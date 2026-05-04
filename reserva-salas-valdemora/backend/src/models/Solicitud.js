const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const User = require('./User');
const Sala = require('./Sala');

const Solicitud = sequelize.define('Solicitud', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  fecha: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  horaInicio: {
    type: DataTypes.TIME,
    allowNull: false
  },
  horaFin: {
    type: DataTypes.TIME,
    allowNull: false
  },
  tipoActividad: {
    type: DataTypes.STRING,
    allowNull: false
  },
  estado: {
    type: DataTypes.ENUM('pendiente', 'en_revision', 'aceptada', 'rechazada', 'cancelada'),
    allowNull: false,
    defaultValue: 'pendiente'
  }
}, {
  tableName: 'solicitudes',
  timestamps: true
});

Solicitud.belongsTo(User, { foreignKey: { allowNull: false } });
User.hasMany(Solicitud);

Solicitud.belongsTo(Sala, { foreignKey: { allowNull: false } });
Sala.hasMany(Solicitud);

module.exports = Solicitud;
