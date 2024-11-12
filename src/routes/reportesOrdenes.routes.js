const express = require('express');
const router = express.Router();
const reportesOrdenesController = require('../controllers/reportesOrdenes.controllers');

// Rutas para los reportes de órdenes
router.get('/reportes-ordenes/estado', reportesOrdenesController.reportePorEstado);
router.get('/reportes-ordenes/prioridad', reportesOrdenesController.reportePorPrioridad);
router.get('/reportes-ordenes/responsable', reportesOrdenesController.reportePorResponsable);

module.exports = router;