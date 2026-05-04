const { sequelize } = require('./src/config/database');

async function fix() {
  try {
    await sequelize.query(
      `UPDATE "incidencias"
       SET "tipo" = 'Daño material'
       WHERE "id" = 1;`
    );

    console.log("✅ Registro corregido correctamente.");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error corrigiendo registro:", error);
    process.exit(1);
  }
}

fix();
