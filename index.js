const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
require("dotenv").config();


const authRoutes = require("./src/routes/auth");
const usuarioRoutes = require("./src/routes/usuario.routes");
const clienteRoutes = require("./src/routes/cliente.routes");
const ordenesRoutes = require("./src/routes/ordenes.routes");
const servicioRoutes = require("./src/routes/servicio.routes");
const cotizacionesRoutes = require("./src/routes/cotizaciones.routes");
const herramientasRoutes = require("./src/routes/herramientas.routes");
const reporteRoutes = require("./src/routes/reporte.routes"); // Asegúrate de que la ruta sea correcta
const reportesOrdenesRoutes = require("./src/routes/reportesOrdenes.routes");
const empleadoRoutes = require("./src/routes/empleado.routes");





app.use(cors({
    origin: '*', // En producción, deberías especificar el dominio exacto
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



const PORT = process.env.PORT || 5000;

try {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
} catch (error) {
  console.error("Error al iniciar la aplicación:", error);
}


// Añade esta ruta después de configurar cors
app.get('/test', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ 
      message: 'API funcionando correctamente',
      dbTime: result.rows[0].now
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Error conectando a la base de datos',
      details: error.message
    });
  }
});

