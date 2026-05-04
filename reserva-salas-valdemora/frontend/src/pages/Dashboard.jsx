import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { getUserRole } from "../utils/auth";

function Dashboard() {
  const [stats, setStats] = useState({
    resueltasHoy: 0,
    pendientesHoy: 0,
    canceladasHoy: 0,
  });

  const navigate = useNavigate();
  const role = getUserRole();

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await api.get("/solicitudes");
        const solicitudes = response.data;

        const hoy = new Date().toISOString().split("T")[0];

        const resueltasHoy = solicitudes.filter(
          (s) =>
            s.estado === "aceptada" &&
            s.updatedAt?.startsWith(hoy)
        ).length;

        const pendientesHoy = solicitudes.filter(
          (s) =>
            s.estado === "pendiente" &&
            s.createdAt?.startsWith(hoy)
        ).length;

        const canceladasHoy = solicitudes.filter(
          (s) =>
            s.estado === "rechazada" &&
            s.updatedAt?.startsWith(hoy)
        ).length;

        setStats({ resueltasHoy, pendientesHoy, canceladasHoy });
      } catch (error) {
        console.error("Error cargando estadísticas:", error);
      }
    }

    fetchStats();
  }, []);

  const total =
    stats.resueltasHoy +
    stats.pendientesHoy +
    stats.canceladasHoy;

  const percentage = (value) =>
    total === 0 ? 0 : Math.round((value / total) * 100);

  return (
    <div>
      <h1 style={{ marginBottom: "1rem" }}>Panel de Control</h1>
      <p style={{ marginBottom: "2rem", color: "#64748b" }}>
        Resumen de actividad del sistema hoy.
      </p>

      {/* Tarjetas superiores */}
      <div
        style={{
          display: "flex",
          gap: "1rem",
          marginBottom: "2rem",
        }}
      >
        <Card
          title="Resueltas Hoy"
          value={stats.resueltasHoy}
          color="#16a34a"
        />
        <Card
          title="Pendientes Hoy"
          value={stats.pendientesHoy}
          color="#f59e0b"
        />
        <Card
          title="Canceladas Hoy"
          value={stats.canceladasHoy}
          color="#dc2626"
        />
      </div>

      {/* Barras */}
      <div
        style={{
          background: "#f8fafc",
          padding: "1.5rem",
          borderRadius: "8px",
          marginBottom: "2rem",
        }}
      >
        <h3 style={{ marginBottom: "1rem" }}>
          Distribución de Solicitudes Hoy
        </h3>

        <Bar
          label="Resueltas"
          value={percentage(stats.resueltasHoy)}
          color="#16a34a"
        />
        <Bar
          label="Pendientes"
          value={percentage(stats.pendientesHoy)}
          color="#f59e0b"
        />
        <Bar
          label="Canceladas"
          value={percentage(stats.canceladasHoy)}
          color="#dc2626"
        />
      </div>

      <div style={{ display: "flex", gap: "1rem" }}>
        <button
          onClick={() => navigate("/solicitudes")}
          style={{
            padding: "0.9rem 1.5rem",
            fontSize: "1rem",
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Gestionar Solicitudes
        </button>

        {role === "admin" && (
          <button
            onClick={() => navigate("/modificar-solicitudes")}
            style={{
              padding: "0.9rem 1.5rem",
              fontSize: "1rem",
              background: "#7c3aed",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Modificar Solicitudes
          </button>
        )}
      </div>
    </div>
  );
}

function Card({ title, value, color }) {
  return (
    <div
      style={{
        flex: 1,
        background: "#ffffff",
        padding: "1.5rem",
        borderRadius: "8px",
        borderTop: `4px solid ${color}`,
        boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
      }}
    >
      <h4 style={{ marginBottom: "0.5rem" }}>{title}</h4>
      <h2>{value}</h2>
    </div>
  );
}

function Bar({ label, value, color }) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <div style={{ marginBottom: "0.3rem" }}>
        {label} ({value}%)
      </div>
      <div
        style={{
          width: "100%",
          height: "8px",
          background: "#e2e8f0",
          borderRadius: "4px",
        }}
      >
        <div
          style={{
            width: `${value}%`,
            height: "8px",
            background: color,
            borderRadius: "4px",
          }}
        />
      </div>
    </div>
  );
}

export default Dashboard;
