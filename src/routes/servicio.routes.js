const express = require('express');
const router = express.Router();
const servicioController = require('../controllers/servicio.controllers');

// Rutas para la API de servicios
router.get('/servicios', servicioController.obtenerTodosServicios); // Obtener todos los servicios
router.get('/servicios/:id', servicioController.obtenerServicioPorId); // Obtener servicio por ID
router.post('/servicios', servicioController.crearServicio); // Crear un nuevo servicio
router.put('/servicios/:id', servicioController.actualizarServicio); // Actualizar servicio por ID
router.delete('/servicios/:id', servicioController.eliminarServicio); // Eliminar servicio por ID

module.exports = router;