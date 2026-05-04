const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Solicitud = require('./Solicitud');

const Reserva = sequelize.define('Reserva', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  fechaConfirmacion: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'reservas',
  timestamps: true
});

Reserva.belongsTo(Solicitud, { foreignKey: { allowNull: false } });
Solicitud.hasOne(Reserva);

module.exports = Reserva;
