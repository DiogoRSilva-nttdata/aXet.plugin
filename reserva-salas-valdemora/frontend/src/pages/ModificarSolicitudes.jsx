import { useEffect, useState } from "react";
import api from "../services/api";

function ModificarSolicitudes() {
  const [solicitudes, setSolicitudes] = useState([]);
  const salasFijas = [
    { id: 1, nombre: "Sala Norte" },
    { id: 2, nombre: "Sala Sur" },
    { id: 3, nombre: "Sala Este" },
    { id: 4, nombre: "Sala Oeste" },
    { id: 5, nombre: "Sala Polivalente" },
  ];
  const [editando, setEditando] = useState(null);

  const fetchData = async () => {
    const resSolicitudes = await api.get("/solicitudes");
    setSolicitudes(resSolicitudes.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const guardarCambios = async () => {
    await api.put(`/solicitudes/${editando.id}`, {
      estado: editando.estado,
      SalaId: editando.SalaId,
    });
    setEditando(null);
    fetchData();
  };

  const eliminarSolicitud = async (id) => {
    if (!window.confirm("¿Seguro que quieres eliminar esta solicitud?"))
      return;

    await api.delete(`/solicitudes/${id}`);
    fetchData();
  };

  return (
    <div>
      <h1>Modificar Solicitudes</h1>

      <table style={{ width: "100%", background: "white" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Sala</th>
            <th>Usuario</th>
            <th>Fecha</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {solicitudes.map((s) => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.Sala?.nombre}</td>
              <td>{s.User?.email}</td>
              <td>{s.fecha}</td>
              <td>{s.estado}</td>
              <td>
                <button
                  onClick={() => setEditando({ ...s })}
                  style={{ marginRight: "0.5rem" }}
                >
                  Editar
                </button>
                <button
                  onClick={() => eliminarSolicitud(s.id)}
                  style={{ background: "red", color: "white" }}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editando && (
        <div className="modal">
          <div className="modal-content">
            <h3>Editar Solicitud #{editando.id}</h3>

            <label>Estado</label>
            <select
              value={editando.estado}
              onChange={(e) =>
                setEditando({ ...editando, estado: e.target.value })
              }
            >
              <option value="pendiente">Pendiente</option>
              <option value="aceptada">Aceptada</option>
              <option value="rechazada">Rechazada</option>
            </select>

            <label>Sala</label>
            <select
              value={editando.SalaId}
              onChange={(e) =>
                setEditando({ ...editando, SalaId: e.target.value })
              }
            >
              {salasFijas.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.nombre}
                </option>
              ))}
            </select>

            <div style={{ marginTop: "1rem" }}>
              <button onClick={guardarCambios}>Guardar</button>
              <button
                onClick={() => setEditando(null)}
                style={{ marginLeft: "1rem" }}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ModificarSolicitudes;
