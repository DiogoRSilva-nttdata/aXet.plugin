// Punto de entrada del servidor

const app = require('./src/app');
const { testConnection } = require('./src/config/database');
require('dotenv').config();

const PORT = process.env.PORT || 3001;

testConnection();

const { syncDatabase } = require('./src/models');
syncDatabase();

app.listen(PORT, () => {
  console.log(`Servidor backend ejecutándose en puerto ${PORT}`);
});
