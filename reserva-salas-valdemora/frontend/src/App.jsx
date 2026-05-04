import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserRole } from "./utils/auth";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Salas from "./pages/Salas";
import Solicitudes from "./pages/Solicitudes";
import Calendario from "./pages/Calendario";
import Incidencias from "./pages/Incidencias";
import Historico from "./pages/Historico";
import ModificarSolicitudes from "./pages/ModificarSolicitudes";
import Layout from "./components/Layout";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
}

function AdminRoute({ children }) {
  const role = getUserRole();
  return role === "admin" ? children : <Navigate to="/solicitudes" />;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route
            index
            element={
              <AdminRoute>
                <Dashboard />
              </AdminRoute>
            }
          />
          <Route path="salas" element={<Salas />} />
          <Route path="solicitudes" element={<Solicitudes />} />
          <Route path="calendario" element={<Calendario />} />
          <Route path="incidencias" element={<Incidencias />} />
          <Route path="historico" element={<Historico />} />
          <Route
            path="modificar-solicitudes"
            element={
              <AdminRoute>
                <ModificarSolicitudes />
              </AdminRoute>
            }
          />
        </Route>

        <Route
          path="*"
          element={<Navigate to={isAuthenticated ? "/" : "/login"} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
