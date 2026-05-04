import { NavLink } from "react-router-dom";
import { getUserRole } from "../utils/auth";

function Sidebar() {
  const role = getUserRole();
  const linkStyle = ({ isActive }) => ({
    padding: "0.75rem 1rem",
    display: "block",
    textDecoration: "none",
    color: isActive ? "white" : "#cbd5e1",
    background: isActive ? "#2563eb" : "transparent",
    borderRadius: "4px",
    marginBottom: "0.5rem",
  });

  return (
    <aside
      style={{
        width: "220px",
        background: "#1e293b",
        padding: "1rem",
        minHeight: "100vh",
      }}
    >
      <h3 style={{ color: "white", marginBottom: "1.5rem" }}>
        {role === "admin"
          ? "Panel Admin"
          : role === "gestor"
          ? "Panel Gestor"
          : "Panel Usuario"}
      </h3>

      <nav>
        {role === "admin" && (
          <NavLink to="/" style={linkStyle} end>
            Dashboard
          </NavLink>
        )}
        <NavLink to="/salas" style={linkStyle}>
          Salas
        </NavLink>
        <NavLink to="/solicitudes" style={linkStyle}>
          Solicitudes
        </NavLink>
        <NavLink to="/calendario" style={linkStyle}>
          Calendario
        </NavLink>
        <NavLink to="/incidencias" style={linkStyle}>
          Incidencias
        </NavLink>
        <NavLink to="/historico" style={linkStyle}>
          Histórico
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;
