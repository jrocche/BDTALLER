const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/cliente.controllers');

// Rutas para la API de clientes
router.get('/clientes', clienteController.obtenerTodosClientes); // Obtener todos los clientes
router.get('/clientes/:id', clienteController.obtenerClientePorId); // Obtener cliente por ID
router.post('/clientes', clienteController.crearCliente); // Crear un nuevo cliente
router.put('/clientes/:id', clienteController.actualizarCliente); // Actualizar cliente por ID
router.delete('/clientes/:id', clienteController.eliminarCliente); // Eliminar cliente por ID

module.exports = router;