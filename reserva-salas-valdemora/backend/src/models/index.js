const { sequelize } = require('../config/database');

const Role = require('./Role');
const User = require('./User');
const Centro = require('./Centro');
const Sala = require('./Sala');
const Solicitud = require('./Solicitud');
const Reserva = require('./Reserva');
const Incidencia = require('./Incidencia');
const Historico = require('./Historico');

// 🔥 ASOCIACIONES
User.belongsTo(Role, { foreignKey: 'RoleId' });
Role.hasMany(User, { foreignKey: 'RoleId' });

const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('✅ Base de datos sincronizada correctamente.');

    // Seeder automático de roles (Paso 3 - RBAC)
    const defaultRoles = ['admin', 'gestor', 'ciudadano'];

    for (const roleName of defaultRoles) {
      await Role.findOrCreate({
        where: { name: roleName }
      });
    }

    console.log('✅ Roles verificados/creados correctamente.');
    
  } catch (error) {
    console.error('❌ Error al sincronizar la base de datos:', error);
  }
};

module.exports = {
  sequelize,
  Role,
  User,
  Centro,
  Sala,
  Solicitud,
  Reserva,
  Incidencia,
  Historico,
  syncDatabase
};
