import { useEffect, useState } from "react";
import api from "../services/api";

function Incidencias() {
  const [incidencias, setIncidencias] = useState([]);
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);

  const [nuevaIncidencia, setNuevaIncidencia] = useState({
    ReservaId: "",
    tipo: "",
    descripcion: "",
  });

  const fetchIncidencias = async () => {
    try {
      const response = await api.get("/incidencias");
      setIncidencias(response.data);
    } catch (error) {
      console.error("Error cargando incidencias:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchReservas = async () => {
    try {
      const response = await api.get("/reservas");
      setReservas(response.data);
    } catch (error) {
      console.error("Error cargando reservas:", error);
    }
  };

  useEffect(() => {
    fetchReservas();
    fetchIncidencias();
  }, []);

  const handleCrearIncidencia = async (e) => {
    e.preventDefault();
    try {
      await api.post("/incidencias", nuevaIncidencia);
      setNuevaIncidencia({
        ReservaId: "",
        tipo: "",
        descripcion: "",
      });
      fetchIncidencias();
    } catch (error) {
      console.error("Error creando incidencia:", error);
    }
  };

  const cambiarEstado = async (id, estado) => {
    try {
      await api.put(`/incidencias/${id}/estado`, { estado });
      fetchIncidencias();
    } catch (error) {
      console.error("Error cambiando estado:", error);
    }
  };

  return (
    <div>
      <h1>Gestión de Incidencias</h1>

      {/* Crear incidencia */}
      <form
        onSubmit={handleCrearIncidencia}
        style={{
          marginTop: "1rem",
          marginBottom: "2rem",
          background: "white",
          padding: "1rem",
          borderRadius: "6px",
        }}
      >
        <h3>Nueva Incidencia</h3>

        <select
          value={nuevaIncidencia.ReservaId}
          onChange={(e) =>
            setNuevaIncidencia({
              ...nuevaIncidencia,
              ReservaId: e.target.value,
            })
          }
          required
          style={{ marginRight: "1rem" }}
        >
          <option value="">Seleccionar Reserva</option>
          {reservas.map((r) => (
            <option key={r.id} value={r.id}>
              Reserva #{r.id} - {r.fecha}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Tipo"
          value={nuevaIncidencia.tipo}
          onChange={(e) =>
            setNuevaIncidencia({ ...nuevaIncidencia, tipo: e.target.value })
          }
          required
          style={{ marginRight: "1rem" }}
        />

        <input
          type="text"
          placeholder="Descripción"
          value={nuevaIncidencia.descripcion}
          onChange={(e) =>
            setNuevaIncidencia({
              ...nuevaIncidencia,
              descripcion: e.target.value,
            })
          }
          required
          style={{ marginRight: "1rem" }}
        />

        <button
          type="submit"
          style={{
            padding: "0.6rem 1.2rem",
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          Crear
        </button>
      </form>

      {loading ? (
        <p>Cargando incidencias...</p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            background: "white",
          }}
        >
          <thead>
            <tr style={{ background: "#e2e8f0" }}>
              <th style={{ padding: "0.75rem" }}>ID</th>
              <th style={{ padding: "0.75rem" }}>Reserva</th>
              <th style={{ padding: "0.75rem" }}>Tipo</th>
              <th style={{ padding: "0.75rem" }}>Descripción</th>
              <th style={{ padding: "0.75rem" }}>Estado</th>
              <th style={{ padding: "0.75rem" }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {incidencias.map((i) => (
              <tr key={i.id} style={{ borderBottom: "1px solid #e2e8f0" }}>
                <td style={{ padding: "0.75rem" }}>{i.id}</td>
                <td style={{ padding: "0.75rem" }}>
                  Reserva #{i.ReservaId}
                </td>
                <td style={{ padding: "0.75rem" }}>{i.tipo}</td>
                <td style={{ padding: "0.75rem" }}>{i.descripcion}</td>
                <td style={{ padding: "0.75rem" }}>{i.estado}</td>
                <td style={{ padding: "0.75rem" }}>
                  <button
                    onClick={() => cambiarEstado(i.id, "cerrada")}
                    style={{
                      background: "#16a34a",
                      color: "white",
                      border: "none",
                      padding: "0.25rem 0.5rem",
                      cursor: "pointer",
                    }}
                  >
                    Cerrar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Incidencias;
