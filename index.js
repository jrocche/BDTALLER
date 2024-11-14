const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const errorHandler = require("./src/middleware/errorHandler");
const pool = require("./src/database/database");
const app = express();
require("dotenv").config();

const authRoutes = require("./src/routes/auth");
const usuarioRoutes = require("./src/routes/usuario.routes");
const clienteRoutes = require("./src/routes/cliente.routes");
const ordenesRoutes = require("./src/routes/ordenes.routes");
const servicioRoutes = require("./src/routes/servicio.routes");
const cotizacionesRoutes = require("./src/routes/cotizaciones.routes");
const herramientasRoutes = require("./src/routes/herramientas.routes");
const reporteRoutes = require("./src/routes/reporte.routes");
const reportesOrdenesRoutes = require("./src/routes/reportesOrdenes.routes");
const empleadoRoutes = require("./src/routes/empleado.routes");

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(morgan("dev"));
app.use(express.json());

app.use("/", authRoutes);
app.use("/", usuarioRoutes);
app.use("/", clienteRoutes);
app.use("/", ordenesRoutes);
app.use("/", servicioRoutes);
app.use("/", cotizacionesRoutes);
app.use("/", herramientasRoutes);
app.use("/", reporteRoutes);
app.use("/", reportesOrdenesRoutes);
app.use("/api", empleadoRoutes);

app.get('/test', async (req, res, next) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ 
      message: 'API funcionando correctamente',
      dbTime: result.rows[0].now
    });
  } catch (error) {
    next(error);
  }
});

app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Ruta no encontrada"
  });
});

app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Error interno del servidor",
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

