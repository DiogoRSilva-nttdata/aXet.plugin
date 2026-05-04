import { useEffect, useState } from "react";
import api from "../services/api";

function Calendario() {
  const [reservas, setReservas] = useState([]);
  const [fechaSeleccionada, setFechaSeleccionada] = useState(
    new Date().toISOString().split("T")[0]
  );

  const fetchReservas = async () => {
    try {
      // Ahora cargamos TODAS las solicitudes, no solo reservas confirmadas
      const response = await api.get("/solicitudes");
      setReservas(response.data);
    } catch (error) {
      console.error("Error cargando solicitudes:", error);
    }
  };

  useEffect(() => {
    fetchReservas();
  }, []);

  const reservasDelDia = reservas.filter(
    (r) => r.fecha === fechaSeleccionada
  );

  const getColorByEstado = (estado) => {
    switch (estado) {
      case "aceptada":
        return "#dcfce7"; // verde claro
      case "pendiente":
        return "#fef9c3"; // amarillo claro
      case "rechazada":
        return "#fee2e2"; // rojo claro
      case "cancelada":
        return "#e2e8f0"; // gris claro
      default:
        return "#ffffff";
    }
  };

  return (
    <div>
      <h1>Calendario de Reservas</h1>

      <div style={{ marginBottom: "1.5rem" }}>
        <input
          type="date"
          value={fechaSeleccionada}
          onChange={(e) => setFechaSeleccionada(e.target.value)}
        />
      </div>

      <div
        style={{
          background: "white",
          padding: "1rem",
          borderRadius: "6px",
        }}
      >
        <h3>Reservas para {fechaSeleccionada}</h3>

        {reservasDelDia.length === 0 ? (
          <p>No hay reservas para este día.</p>
        ) : (
          <ul>
            {reservasDelDia.map((r) => (
              <li
                key={r.id}
                style={{
                  marginBottom: "0.75rem",
                  padding: "0.75rem",
                  borderRadius: "6px",
                  backgroundColor: getColorByEstado(r.estado),
                  border: "1px solid #e2e8f0",
                }}
              >
                <strong>Usuario:</strong> {r.User?.email || "—"} <br />
                <strong>Sala:</strong> {r.Sala?.nombre || "—"} <br />
                <strong>Horario:</strong> {r.horaInicio} - {r.horaFin} <br />
                <strong>Estado:</strong> {r.estado}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Calendario;
