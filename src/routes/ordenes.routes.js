const express = require('express');
const router = express.Router();
const ordenesController = require('../controllers/ordenes.Controllers');

// Rutas para la API de órdenes
router.get('/ordenes', ordenesController.obtenerTodasOrdenes); // Obtener todas las órdenes
router.get('/ordenes/:id', ordenesController.obtenerOrdenPorId); // Obtener orden por ID
router.post('/ordenes', ordenesController.crearOrden); // Crear una nueva orden
router.put('/ordenes/:id', ordenesController.actualizarOrden); // Actualizar orden por ID
router.delete('/ordenes/:id', ordenesController.eliminarOrden); // Eliminar orden por ID


module.exports = router;