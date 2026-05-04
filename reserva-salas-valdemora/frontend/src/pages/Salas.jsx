import { useEffect, useState } from "react";
import api from "../services/api";

function Salas() {
  const [salas, setSalas] = useState([]);
  const [loading, setLoading] = useState(true);

  const [nuevaSala, setNuevaSala] = useState({
    nombre: "",
    capacidad: "",
    CentroId: "",
  });

  const [editandoId, setEditandoId] = useState(null);
  const [salaEditada, setSalaEditada] = useState({
    nombre: "",
    capacidad: "",
  });

  const fetchSalas = async () => {
    try {
      const response = await api.get("/salas");
      setSalas(response.data);
    } catch (error) {
      console.error("Error cargando salas:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setNuevaSala({
      ...nuevaSala,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await api.post("/salas", nuevaSala);
      setNuevaSala({ nombre: "", capacidad: "", CentroId: "" });
      fetchSalas();
    } catch (error) {
      console.error("Error creando sala:", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmacion = window.confirm("¿Seguro que deseas eliminar esta sala?");
    if (!confirmacion) return;

    try {
      await api.delete(`/salas/${id}`);
      fetchSalas();
    } catch (error) {
      console.error("Error eliminando sala:", error);
    }
  };

  const iniciarEdicion = (sala) => {
    setEditandoId(sala.id);
    setSalaEditada({
      nombre: sala.nombre,
      capacidad: sala.capacidad,
    });
  };

  const cancelarEdicion = () => {
    setEditandoId(null);
  };

  const guardarEdicion = async (id) => {
    try {
      await api.put(`/salas/${id}`, salaEditada);
      setEditandoId(null);
      fetchSalas();
    } catch (error) {
      console.error("Error actualizando sala:", error);
    }
  };

  useEffect(() => {
    fetchSalas();
  }, []);

  return (
    <div>
      <h1>Gestión de Salas</h1>

      {/* Formulario creación */}
      <form
        onSubmit={handleCreate}
        style={{
          marginTop: "1.5rem",
          marginBottom: "2rem",
          background: "white",
          padding: "1rem",
          borderRadius: "6px",
        }}
      >
        <h3>Nueva Sala</h3>

        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={nuevaSala.nombre}
          onChange={handleChange}
          required
          style={{ marginRight: "1rem", padding: "0.5rem" }}
        />

        <input
          type="number"
          name="capacidad"
          placeholder="Capacidad"
          value={nuevaSala.capacidad}
          onChange={handleChange}
          required
          style={{ marginRight: "1rem", padding: "0.5rem" }}
        />

        <input
          type="number"
          name="CentroId"
          placeholder="ID Centro"
          value={nuevaSala.CentroId}
          onChange={handleChange}
          required
          style={{ marginRight: "1rem", padding: "0.5rem" }}
        />

        <button
          type="submit"
          style={{
            padding: "0.5rem 1rem",
            background: "#2563eb",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Crear
        </button>
      </form>

      {/* Tabla */}
      {loading ? (
        <p>Cargando salas...</p>
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
              <th style={{ padding: "0.75rem", textAlign: "left" }}>ID</th>
              <th style={{ padding: "0.75rem", textAlign: "left" }}>Nombre</th>
              <th style={{ padding: "0.75rem", textAlign: "left" }}>Capacidad</th>
              <th style={{ padding: "0.75rem", textAlign: "left" }}>Centro</th>
              <th style={{ padding: "0.75rem", textAlign: "left" }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {salas.map((sala) => (
              <tr key={sala.id} style={{ borderBottom: "1px solid #e2e8f0" }}>
                <td style={{ padding: "0.75rem" }}>{sala.id}</td>
                <td style={{ padding: "0.75rem" }}>
                  {editandoId === sala.id ? (
                    <input
                      value={salaEditada.nombre}
                      onChange={(e) =>
                        setSalaEditada({ ...salaEditada, nombre: e.target.value })
                      }
                    />
                  ) : (
                    sala.nombre
                  )}
                </td>
                <td style={{ padding: "0.75rem" }}>
                  {editandoId === sala.id ? (
                    <input
                      type="number"
                      value={salaEditada.capacidad}
                      onChange={(e) =>
                        setSalaEditada({ ...salaEditada, capacidad: e.target.value })
                      }
                    />
                  ) : (
                    sala.capacidad
                  )}
                </td>
                <td style={{ padding: "0.75rem" }}>
                  {sala.Centro?.nombre || "—"}
                </td>
                <td style={{ padding: "0.75rem" }}>
                  {editandoId === sala.id ? (
                    <>
                      <button
                        onClick={() => guardarEdicion(sala.id)}
                        style={{
                          background: "#16a34a",
                          color: "white",
                          border: "none",
                          padding: "0.25rem 0.75rem",
                          marginRight: "0.5rem",
                          cursor: "pointer",
                        }}
                      >
                        Guardar
                      </button>
                      <button
                        onClick={cancelarEdicion}
                        style={{
                          background: "#64748b",
                          color: "white",
                          border: "none",
                          padding: "0.25rem 0.75rem",
                          cursor: "pointer",
                        }}
                      >
                        Cancelar
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => iniciarEdicion(sala)}
                        style={{
                          background: "#2563eb",
                          color: "white",
                          border: "none",
                          padding: "0.25rem 0.75rem",
                          marginRight: "0.5rem",
                          cursor: "pointer",
                        }}
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(sala.id)}
                        style={{
                          background: "#ef4444",
                          color: "white",
                          border: "none",
                          padding: "0.25rem 0.75rem",
                          cursor: "pointer",
                        }}
                      >
                        Eliminar
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Salas;
