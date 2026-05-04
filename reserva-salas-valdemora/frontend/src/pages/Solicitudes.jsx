import { useEffect, useState } from "react";
import api from "../services/api";
import { getUserRole, getUserId } from "../utils/auth";

function Solicitudes() {
  const [solicitudes, setSolicitudes] = useState([]);
  const [solicitudesOriginales, setSolicitudesOriginales] = useState([]);
  const [salas, setSalas] = useState([]);
  const [loading, setLoading] = useState(true);

  const [mostrarCrear, setMostrarCrear] = useState(false);
  const [mostrarFiltro, setMostrarFiltro] = useState(false);

  const [nuevaSolicitud, setNuevaSolicitud] = useState({
    SalaId: "",
    fecha: "",
    horaInicio: "",
    horaFin: "",
    tipoActividad: "",
  });

  const [filtro, setFiltro] = useState({
    tipo: "exacta",
    fecha1: "",
    fecha2: "",
  });

  const role = getUserRole();
  const userId = getUserId();

  const ordenar = (data) => {
    return data.sort((a, b) => {
      if (a.fecha === b.fecha) {
        return a.horaInicio.localeCompare(b.horaInicio);
      }
      return new Date(a.fecha) - new Date(b.fecha);
    });
  };

  const fetchSolicitudes = async () => {
    try {
      const response = await api.get("/solicitudes");
      const ordenadas = ordenar(response.data);
      setSolicitudesOriginales(ordenadas);
      setSolicitudes(ordenadas);
    } catch (error) {
      console.error("Error cargando solicitudes:", error);
    } finally {
      setLoading(false);
    }
  };


  const fetchSalas = async () => {
    try {
      const response = await api.get("/salas");
      setSalas(response.data);
    } catch (error) {
      console.error("Error cargando salas:", error);
    }
  };

  useEffect(() => {
    fetchSolicitudes();
    fetchSalas();
  }, []);

  const aplicarFiltro = () => {
    let filtradas = [...solicitudesOriginales];

    switch (filtro.tipo) {
      case "exacta":
        filtradas = filtradas.filter((s) => s.fecha === filtro.fecha1);
        break;
      case "antes":
        filtradas = filtradas.filter(
          (s) => new Date(s.fecha) < new Date(filtro.fecha1)
        );
        break;
      case "despues":
        filtradas = filtradas.filter(
          (s) => new Date(s.fecha) > new Date(filtro.fecha1)
        );
        break;
      case "entre":
        filtradas = filtradas.filter(
          (s) =>
            new Date(s.fecha) >= new Date(filtro.fecha1) &&
            new Date(s.fecha) <= new Date(filtro.fecha2)
        );
        break;
      default:
        break;
    }

    setSolicitudes(ordenar(filtradas));
    setMostrarFiltro(false);
  };

  const handleCrearSolicitud = async (e) => {
    e.preventDefault();
    try {
      await api.post("/solicitudes", nuevaSolicitud);
      setNuevaSolicitud({
        SalaId: "",
        fecha: "",
        horaInicio: "",
        horaFin: "",
        tipoActividad: "",
      });
      setMostrarCrear(false);
      fetchSolicitudes();
    } catch (error) {
      console.error("Error creando solicitud:", error);
    }
  };

  return (
    <div>
      <h1>Gestión de Solicitudes</h1>

      <div style={{ marginBottom: "1.5rem" }}>
        <button
          onClick={() => setMostrarCrear(true)}
          style={{
            marginRight: "1rem",
            padding: "0.6rem 1.2rem",
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          Crear Nueva Solicitud
        </button>

        <button
          onClick={() => setMostrarFiltro(true)}
          style={{
            padding: "0.6rem 1.2rem",
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          Filtrar
        </button>
      </div>

      {/* MODAL CREAR */}
      {mostrarCrear && (
        <div className="modal">
          <div className="modal-content">
            <h3>Nueva Solicitud</h3>
            <form onSubmit={handleCrearSolicitud}>
              <select
                value={nuevaSolicitud.SalaId}
                onChange={(e) =>
                  setNuevaSolicitud({
                    ...nuevaSolicitud,
                    SalaId: e.target.value,
                  })
                }
                required
              >
                <option value="">Seleccionar Sala</option>
                {salas.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.nombre}
                  </option>
                ))}
              </select>

              <input
                type="date"
                required
                value={nuevaSolicitud.fecha}
                onChange={(e) =>
                  setNuevaSolicitud({
                    ...nuevaSolicitud,
                    fecha: e.target.value,
                  })
                }
              />

              <input
                type="time"
                required
                value={nuevaSolicitud.horaInicio}
                onChange={(e) =>
                  setNuevaSolicitud({
                    ...nuevaSolicitud,
                    horaInicio: e.target.value,
                  })
                }
              />

              <input
                type="time"
                required
                value={nuevaSolicitud.horaFin}
                onChange={(e) =>
                  setNuevaSolicitud({
                    ...nuevaSolicitud,
                    horaFin: e.target.value,
                  })
                }
              />

              <input
                type="text"
                required
                placeholder="Tipo de actividad"
                value={nuevaSolicitud.tipoActividad}
                onChange={(e) =>
                  setNuevaSolicitud({
                    ...nuevaSolicitud,
                    tipoActividad: e.target.value,
                  })
                }
              />

              <div style={{ marginTop: "1rem" }}>
                <button type="submit">Guardar</button>
                <button
                  type="button"
                  onClick={() => setMostrarCrear(false)}
                  style={{ marginLeft: "1rem" }}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL FILTRO */}
      {mostrarFiltro && (
        <div className="modal">
          <div className="modal-content">
            <h3>Filtrar por Fecha</h3>

            <select
              value={filtro.tipo}
              onChange={(e) =>
                setFiltro({ ...filtro, tipo: e.target.value })
              }
            >
              <option value="exacta">Fecha exacta</option>
              <option value="antes">Antes de</option>
              <option value="despues">Después de</option>
              <option value="entre">Entre dos fechas</option>
            </select>

            <input
              type="date"
              value={filtro.fecha1}
              onChange={(e) =>
                setFiltro({ ...filtro, fecha1: e.target.value })
              }
            />

            {filtro.tipo === "entre" && (
              <input
                type="date"
                value={filtro.fecha2}
                onChange={(e) =>
                  setFiltro({ ...filtro, fecha2: e.target.value })
                }
              />
            )}

            <div style={{ marginTop: "1rem" }}>
              <button onClick={aplicarFiltro}>Aplicar</button>
              <button
                onClick={() => setMostrarFiltro(false)}
                style={{ marginLeft: "1rem" }}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <p>Cargando solicitudes...</p>
      ) : (
        <table
          style={{
            width: "100%",
            background: "white",
            borderCollapse: "collapse",
            fontSize: "0.85rem",
          }}
        >
          <thead style={{ background: "#f1f5f9" }}>
            <tr>
              <th style={{ padding: "0.5rem" }}>ID</th>
              <th style={{ padding: "0.5rem" }}>Sala</th>
              <th style={{ padding: "0.5rem" }}>Usuario</th>
              <th style={{ padding: "0.5rem" }}>Fecha</th>
              <th style={{ padding: "0.5rem" }}>Horario</th>
              <th style={{ padding: "0.5rem" }}>Actividad</th>
              <th style={{ padding: "0.5rem" }}>Estado</th>
              <th style={{ padding: "0.5rem" }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {solicitudes.map((s) => {
              const colorEstado =
                s.estado === "aceptada"
                  ? "#16a34a"
                  : s.estado === "pendiente"
                  ? "#eab308"
                  : s.estado === "rechazada"
                  ? "#dc2626"
                  : "#475569";

              return (
                <tr
                  key={s.id}
                  style={{ borderBottom: "1px solid #e2e8f0" }}
                >
                  <td style={{ padding: "0.5rem" }}>{s.id}</td>
                  <td style={{ padding: "0.5rem" }}>{s.Sala?.nombre}</td>
                  <td style={{ padding: "0.5rem" }}>{s.User?.email}</td>
                  <td style={{ padding: "0.5rem" }}>{s.fecha}</td>
                  <td style={{ padding: "0.5rem" }}>
                    {s.horaInicio} - {s.horaFin}
                  </td>
                  <td style={{ padding: "0.5rem" }}>{s.tipoActividad}</td>
                  <td
                    style={{
                      padding: "0.5rem",
                      fontWeight: "600",
                      color: colorEstado,
                    }}
                  >
                    {s.estado}
                  </td>
                  <td style={{ padding: "0.5rem" }}>
                    {["admin", "gestor"].includes(role) &&
                      s.estado === "pendiente" && (
                        <>
                          <button
                            onClick={async () => {
                              await api.put(
                                `/solicitudes/${s.id}/estado`,
                                { estado: "aceptada" }
                              );
                              fetchSolicitudes();
                            }}
                            style={{
                              marginRight: "0.5rem",
                              background: "#16a34a",
                              color: "white",
                              border: "none",
                              padding: "0.3rem 0.6rem",
                              cursor: "pointer",
                              fontSize: "0.75rem",
                            }}
                          >
                            Aprobar
                          </button>
                          <button
                            onClick={async () => {
                              await api.put(
                                `/solicitudes/${s.id}/estado`,
                                { estado: "rechazada" }
                              );
                              fetchSolicitudes();
                            }}
                            style={{
                              background: "#dc2626",
                              color: "white",
                              border: "none",
                              padding: "0.3rem 0.6rem",
                              cursor: "pointer",
                              fontSize: "0.75rem",
                            }}
                          >
                            Rechazar
                          </button>
                        </>
                      )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Solicitudes;
