import { useEffect, useState } from "react";
import api from "../services/api";

function Historico() {
  const [registros, setRegistros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtroAccion, setFiltroAccion] = useState("TODOS");

  const fetchHistorico = async () => {
    try {
      const response = await api.get("/historico");
      setRegistros(response.data);
    } catch (error) {
      console.error("Error cargando histórico:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistorico();
  }, []);

  return (
    <div>
      <h1>Histórico del Sistema</h1>

      {loading ? (
        <p>Cargando histórico...</p>
      ) : (
        <>
          <div style={{ marginTop: "1rem" }}>
            <select
              value={filtroAccion}
              onChange={(e) => setFiltroAccion(e.target.value)}
              style={{
                padding: "0.5rem",
                borderRadius: "6px",
                border: "1px solid #cbd5e1",
              }}
            >
              <option value="TODOS">Todas las acciones</option>
              <option value="ELIMINAR">Eliminar</option>
              <option value="CAMBIO_ESTADO">Cambio_estado</option>
              <option value="CREAR">Crear</option>
            </select>
          </div>

          <table
            style={{
              width: "100%",
              marginTop: "1.5rem",
              borderCollapse: "collapse",
              background: "white",
              fontSize: "0.85rem",
            }}
          >
          <thead>
            <tr style={{ background: "#e2e8f0" }}>
              <th style={{ padding: "0.75rem" }}>Fecha</th>
              <th style={{ padding: "0.75rem" }}>Entidad</th>
              <th style={{ padding: "0.75rem" }}>ID</th>
              <th style={{ padding: "0.75rem" }}>Acción</th>
              <th style={{ padding: "0.75rem" }}>Descripción</th>
              <th style={{ padding: "0.75rem" }}>Usuario</th>
            </tr>
          </thead>
          <tbody>
            {registros
              .filter((r) =>
                filtroAccion === "TODOS"
                  ? true
                  : r.accion === filtroAccion
              )
              .map((r) => {
                const colorAccion =
                  r.accion === "ELIMINAR"
                    ? "#dc2626"
                    : r.accion === "CAMBIO_ESTADO"
                    ? "#eab308"
                    : r.accion === "CREAR"
                    ? "#16a34a"
                    : "#475569";

                return (
                  <tr key={r.id} style={{ borderBottom: "1px solid #e2e8f0" }}>
                    <td style={{ padding: "0.5rem" }}>
                      {new Date(r.createdAt).toLocaleString()}
                    </td>
                    <td style={{ padding: "0.5rem" }}>{r.entidad}</td>
                    <td style={{ padding: "0.5rem" }}>{r.entidadId}</td>
                    <td
                      style={{
                        padding: "0.5rem",
                        fontWeight: "600",
                        color: colorAccion,
                      }}
                    >
                      {r.accion}
                    </td>
                    <td style={{ padding: "0.5rem" }}>{r.descripcion}</td>
                    <td style={{ padding: "0.5rem" }}>
                      {r.User?.email || "—"}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        </>
      )}
    </div>
  );
}

export default Historico;
