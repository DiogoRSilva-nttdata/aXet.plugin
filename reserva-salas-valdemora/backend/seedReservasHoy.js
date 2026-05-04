const { sequelize } = require("./src/config/database");
const { Solicitud, Reserva, Sala, User, Centro } = require("./src/models");

async function seed() {
  try {
    await sequelize.authenticate();

    const user = await User.findOne();
    const sala = await Sala.findOne();

    if (!user || !sala) {
      console.log("❌ No hay usuarios o salas creadas.");
      process.exit(1);
    }

    const hoy = new Date().toISOString().split("T")[0];

    for (let i = 1; i <= 3; i++) {
      const horaInicio = `${9 + i}:00:00`;
      const horaFin = `${10 + i}:00:00`;

      const solicitud = await Solicitud.create({
        fecha: hoy,
        horaInicio,
        horaFin,
        tipoActividad: `Actividad demo ${i}`,
        estado: "aceptada",
        UserId: user.id,
        SalaId: sala.id,
      });

      await Reserva.create({
        fechaConfirmacion: new Date(),
        SolicitudId: solicitud.id,
      });
    }

    console.log("✅ Reservas creadas para hoy correctamente.");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error creando reservas:", error);
    process.exit(1);
  }
}

seed();
