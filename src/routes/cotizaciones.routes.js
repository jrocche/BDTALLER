const express = require('express');
const router = express.Router();
const cotizacionesController = require('../controllers/cotizaciones.controllers');

// Rutas para la API de cotizaciones
router.get('/cotizaciones', cotizacionesController.obtenerTodasCotizaciones); // Obtener todas las cotizaciones
router.get('/cotizaciones/:id', cotizacionesController.obtenerCotizacionPorId); // Obtener cotización por ID
router.post('/cotizaciones', cotizacionesController.crearCotizacion); // Crear una nueva cotización
router.put('/cotizaciones/:id', cotizacionesController.actualizarCotizacion); // Actualizar cotización por ID
router.delete('/cotizaciones/:id', cotizacionesController.eliminarCotizacion); // Eliminar cotización por ID
router.get('/cotizaciones/pdf/:id', cotizacionesController.imprimirCotizacionPDF); // Imprimir cotización en PDF

module.exports = router;