const express = require('express');
const router = express.Router();
const reporteController = require('../controllers/reporte.controllers.js');

// Rutas para los reportes
router.get('/reportes/ingresos-proyectados', reporteController.obtenerIngresosProyectados);
router.get('/reportes/servicios-mas-solicitados', reporteController.obtenerServiciosMasSolicitados);
router.get('/reportes/cotizaciones-por-estado', reporteController.obtenerCotizacionesPorEstado);

module.exports = router;