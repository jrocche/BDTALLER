const Cliente = require('../models/cliente.model');

// Obtener todos los clientes
exports.obtenerTodosClientes = async (req, res) => {
    try {
        const clientes = await Cliente.obtenerTodos();
        res.status(200).json(clientes);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener clientes', error });
    }
};

// Obtener cliente por ID
exports.obtenerClientePorId = async (req, res) => {
    const { id } = req.params;
    try {
        const cliente = await Cliente.obtenerPorId(id);
        if (cliente) {
            res.status(200).json(cliente);
        } else {
            res.status(404).json({ message: 'Cliente no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener cliente', error });
    }
};

// Crear un nuevo cliente
exports.crearCliente = async (req, res) => {
    const clienteData = req.body;
    try {
        const nuevoCliente = await Cliente.crear(clienteData);
        res.status(201).json(nuevoCliente);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear cliente', error });
    }
};

// Actualizar cliente por ID
exports.actualizarCliente = async (req, res) => {
    const { id } = req.params;
    const clienteData = req.body;
    try {
        const clienteActualizado = await Cliente.actualizar(id, clienteData);
        if (clienteActualizado) {
            res.status(200).json(clienteActualizado);
        } else {
            res.status(404).json({ message: 'Cliente no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar cliente', error });
    }
};

// Eliminar cliente por ID
exports.eliminarCliente = async (req, res) => {
    const { id } = req.params;
    try {
        const eliminado = await Cliente.eliminar(id);
        if (eliminado) {
            res.status(204).send(); // No content
        } else {
            res.status(404).json({ message: 'Cliente no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar cliente', error });
    }
};