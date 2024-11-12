// app.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const auth = require('./auth'); // Importamos el middleware de autenticación existente
const clienteRoutes = require('./routes/clienteRoutes');
const reporteRoutes = require('./routes/reporte.routes');
const empleadosRoutes = require('./routes/empleado.routes');

// Cargar variables de entorno
dotenv.config();

// Crear la aplicación Express
const app = express();

app.use(cors());
app.use(express.json());

// Aplicar autenticación a todas las rutas /api
app.use('/api', auth);

// Rutas
app.use('/api', clienteRoutes);
app.use('/api', reporteRoutes);
app.use('/api', empleadoRoutes);
// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Algo salió mal!',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// Puerto desde variables de entorno
const PORT = process.env.PORT || 5000;

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
}).on('error', (err) => {
  console.error('Error al iniciar el servidor:', err);
});

module.exports = app;