const express = require('express');
const router = express.Router();
const EmpleadoController = require('../controllers/empleado.controllers');

// Quitar el prefijo 'api' de las rutas ya que se agregará en app.js
router.get('/empleados', EmpleadoController.getAllEmpleados);
router.post('/empleados', EmpleadoController.createEmpleado);
router.put('/empleados/:id', EmpleadoController.updateEmpleado);
router.delete('/empleados/:id', EmpleadoController.deleteEmpleado);

module.exports = router;