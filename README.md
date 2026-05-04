# 📦 Sistema de Gestión y Reserva de Salas – Valdemora 🚀

### Plataforma Integral para la Administración de Reservas, Solicitudes e Incidencias

---

## 📝 Documentos base del proyecto

### 📋 Análisis de requisitos

- [Análisis funcional y de requisitos](./documentos/An%C3%A1lisis%20funcional%20y%20de%20requisitos.docx)

### 👤 Historias de usuario

- [Historias de Usuario](./documentos/Historias%20de%20Usuario.docx)

### 🛠️ Diseño técnico y propuesta tecnológica

- [Diseño técnico y propuesta tecnológica](./documentos/Dise%C3%B1o%20t%C3%A9cnico%20y%20propuesta%20tecnol%C3%B3gica.docx)
### 🗓️ Plan de pruebas

- 🗓️ [Plan de Pruebas](./documentos/Plan_de_Pruebas_Reserva_Salas.pdf)
  
###  🔐 Extensiones opcionales

- 🔐 [Extensiones opcionales: Seguridad, Calidad y Deuda Técnica](./documentos/Extensiones_opcionales_Seguridad_Calidad_Deuda_Tecnica.md)

# 🖼️ Capturas de Pantalla del Sistema

---

# 1️⃣ Login

### 🔐 Autenticación de usuario

__Descripción:__\
Pantalla de acceso al sistema donde los usuarios introducen sus credenciales para autenticarse. El acceso está protegido mediante control de roles y validación de sesión.

![Login](./screenshots/login.png)

---

# 2️⃣ Dashboard

### 📊 Panel principal de control

__Descripción:__\
Vista general del sistema donde se muestran indicadores clave como reservas activas, solicitudes pendientes, incidencias abiertas y estado general de ocupación.

![Dashboard](./screenshots/dashboard.png)

---

# 3️⃣ Gestión de Salas

### 🏢 Listado de salas registradas

__Descripción:__\
Visualización completa de las salas disponibles en el sistema, mostrando información relevante como centro asociado, capacidad y estado.

![Gestión de salas - Listado](./screenshots/Gesti%C3%B3n%20de%20salas%201.png)

---

### ✏️ Edición de salas

__Descripción:__\
Formulario para modificar la información de una sala existente, permitiendo actualizar datos como capacidad, centro o características específicas.

![Gestión de salas - Edición](./screenshots/Gesti%C3%B3n%20de%20salas%20(editar_salas).png)

---

# 4️⃣ Gestión de Solicitudes

### 📄 Listado general de solicitudes

__Descripción:__\
Pantalla donde se muestran todas las solicitudes registradas, permitiendo su revisión, aprobación o rechazo por parte del administrador.
El estado de cada solicitud se representa mediante un sistema visual de colores:

- 🟢 __Verde__ → Solicitud aceptada
- 🟡 __Amarillo__ → Solicitud pendiente
- 🔴 __Rojo__ → Solicitud rechazada

![Gestión de solicitudes - Listado](./screenshots/Gesti%C3%B3n%20solicitudes.png)

---

### 📅 Filtro avanzado por fecha

__Descripción:__\
Es posible filtrar las solicitudes por fecha utilizando diferentes modalidades:

- Antes de una fecha
- Después de una fecha
- Fecha exacta
- Entre un rango de fechas

Esto permite una gestión más precisa y eficiente.

![Gestión de solicitudes - Filtro](./screenshots/Gesti%C3%B3n%20solicitudes%20(filtrar).png)

---

# 5️⃣ Calendario

### 🗓️ Vista calendario de reservas

__Descripción:__\
Representación visual de las reservas en formato calendario, facilitando la visualización de disponibilidad y ocupación por día.
El estado de cada solicitud realizada hoy se representa mediante un sistema visual de colores:

- 🟢 __Verde__ → Solicitud aceptada
- 🟡 __Amarillo__ → Solicitud pendiente
- 🔴 __Rojo__ → Solicitud rechazada

![Calendario](./screenshots/Calendario.png)

---

# 6️⃣ Incidencias

### ⚠️ Gestión de incidencias

__Descripción:__\
Módulo para registrar, consultar y gestionar incidencias asociadas a salas o reservas, permitiendo su seguimiento y resolución.

![Incidencias](./screenshots/Incidencias.png)

---

# 7️⃣ Histórico

### 📚 Registro histórico de acciones

__Descripción:__\
Sección donde se almacenan todas las acciones relevantes del sistema, permitiendo trazabilidad y control de auditoría.

![Histórico](./screenshots/Hist%C3%B3rico.png)


# 🗂️ Estructura del Proyecto

```javascript
repo-root/
├── documentos/                # Documentación funcional, técnica y plan de pruebas
├── screenshots/               # Capturas utilizadas en el README
├── reserva-salas-valdemora/
│   ├── backend/               # API REST, lógica de negocio, seguridad y tests
│   ├── frontend/              # SPA React + Vite (interfaz, roles y experiencia de usuario)
│   └── memory-bank/           # Contexto técnico, decisiones arquitectónicas e insights
```

---

# 🚀 Puesta en Marcha (Quickstart)

## 🔧 Backend

__Instalación__

```bash
cd reserva-salas-valdemora/backend
npm install
```

__Ejecución__

```bash
npm start
```

__Tests unitarios__

```bash
npm test
```

---

## 🖥️ Frontend

__Instalación__

```bash
cd reserva-salas-valdemora/frontend
npm install
```

__Ejecución__

```bash
npm run dev
```

__Tests__

```bash
npm test
```

---

# 🛠️ Tecnologías Principales

### 🎨 Frontend

- React + Vite
- JavaScript moderno (ES6+)
- SPA modular
- Gestión de autenticación en cliente
- Diseño responsive

### ⚙️ Backend

- Node.js ≥ 18
- Express
- Arquitectura REST
- PostgreSQL
- Autenticación basada en JWT
- Middleware de control de acceso por roles

### 🧪 Testing

- Tests automatizados con `npm test`
- Estructura organizada en `/tests`
- Separación por controladores y servicios
- Cobertura enfocada a lógica de negocio

---

# 🧩 Arquitectura y Escalabilidad

El sistema está diseñado siguiendo principios de:

- Separación clara entre frontend y backend
- Organización modular por dominios
- Control de roles y seguridad centralizada
- Fácil extensión para nuevas funcionalidades

La estructura facilita mantenimiento, evolución y escalabilidad futura.


```

