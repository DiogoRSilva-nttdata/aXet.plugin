import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

function Layout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />

      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <header
          style={{
            padding: "1rem",
            background: "#0f172a",
            color: "white",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2>Reserva de Salas - Valdemora</h2>
          <button
            onClick={handleLogout}
            style={{
              background: "#ef4444",
              color: "white",
              border: "none",
              padding: "0.5rem 1rem",
              cursor: "pointer",
            }}
          >
            Cerrar sesión
          </button>
        </header>

        <main style={{ flex: 1, padding: "2rem", background: "#f8fafc" }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
