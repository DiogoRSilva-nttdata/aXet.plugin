# EXTENSIONES OPCIONALES – SEGURIDAD, CALIDAD Y DEUDA TÉCNICA  
Proyecto: Sistema de Reserva de Salas – Valdemora  


---

# 1. SEGURIDAD IMPLEMENTADA

## 1.1 Autenticación basada en JWT  
El sistema implementa autenticación mediante JSON Web Tokens (JWT).  
Tras un login correcto, el backend genera un token firmado con expiración de 1 hora.  

**Implementación:**
- Archivo: `backend/src/services/authService.js`
- Uso de `jwt.sign()` con clave secreta definida en variables de entorno.
- El token incluye el `id` del usuario y su `role`.

**Beneficios:**
- Evita sesiones en servidor.
- Permite expiración automática.
- Garantiza integridad mediante firma criptográfica.


## 1.2 Hash de contraseñas con bcrypt  
Las contraseñas no se almacenan en texto plano.  
Se utiliza bcrypt para validar credenciales durante el login.

**Implementación:**
- Archivo: `backend/src/services/authService.js`
- Uso de `bcrypt.compare()`.

**Beneficio:**
- Protección frente a filtraciones de base de datos.
- Seguridad ante ataques de fuerza bruta.


## 1.3 Control de acceso basado en roles (RBAC)  
El sistema implementa control de acceso por roles: `admin`, `gestor` y `ciudadano`.

**Implementación:**
- Asociación Sequelize entre `User` y `Role`.
- El rol se incluye en el JWT.
- Middleware `authMiddleware.js` protege rutas.
- El frontend adapta la interfaz según el rol detectado.

**Beneficio:**
- Separación clara de permisos.
- Principio de mínimo privilegio.


---

# 2. CALIDAD DEL SOFTWARE

## 2.1 Arquitectura en capas  
El backend está organizado en:

- Models (Sequelize)
- Controllers
- Services
- Middlewares
- Routes

**Ventajas:**
- Separación de responsabilidades.
- Mayor mantenibilidad.
- Escalabilidad del sistema.


## 2.2 Tests unitarios  
El proyecto incluye tests tanto para servicios como para controladores.

**Ubicación:**
- `backend/tests/controllers`
- `backend/tests/services`

**Ventajas:**
- Validación automática del comportamiento esperado.
- Reducción de regresiones.
- Mayor confiabilidad del sistema.


## 2.3 Buenas prácticas aplicadas

- Uso de variables de entorno (`.env`)
- Separación frontend/backend
- Uso de ORM (Sequelize)
- Código modular y estructurado


---

# 3. DEUDA TÉCNICA IDENTIFICADA

Aunque el sistema cumple los requisitos funcionales, se identifican posibles mejoras futuras:

## 3.1 Validación avanzada de inputs  
Actualmente no se utiliza una librería específica como `express-validator` o `Joi`.  
Podría añadirse para reforzar validación y seguridad.

## 3.2 Rate limiting  
No se ha implementado limitación de intentos de login.  
Sería recomendable para prevenir ataques de fuerza bruta.

## 3.3 Logging estructurado  
No se utiliza un sistema de logging avanzado (Winston, Morgan persistente).  
Recomendable en entornos productivos.

## 3.4 CI/CD  
No se ha configurado un pipeline de integración continua.  
Podría automatizar tests y despliegues.


---

# 4. OTRAS MEJORAS TÉCNICAS DESTACABLES

## 4.1 Protección de rutas en frontend  
El frontend verifica el rol antes de mostrar determinadas opciones.

## 4.2 Arquitectura desacoplada  
Separación completa frontend/backend basada en API REST.

## 4.3 Base de datos normalizada  
Uso correcto de relaciones Sequelize (`User ↔ Role`, etc.).


---

# CONCLUSIÓN

El proyecto no solo cumple los requisitos funcionales del enunciado,  
sino que incorpora mecanismos reales de seguridad, calidad del software  
y una identificación consciente de deuda técnica.

Estas extensiones opcionales demuestran una aproximación profesional  
al desarrollo del sistema.
