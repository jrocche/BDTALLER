const Servicio = require('../models/servicio.model');

// Obtener todos los servicios
exports.obtenerTodosServicios = async (req, res) => {
    try {
        const servicios = await Servicio.obtenerTodos();
        res.status(200).json(servicios);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener servicios', error });
    }
};

// Obtener servicio por ID
exports.obtenerServicioPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const servicio = await Servicio.obtenerPorId(id);
        if (servicio) {
            res.status(200).json(servicio);
        } else {
            res.status(404).json({ message: 'Servicio no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener servicio', error });
    }
};

// Crear un nuevo servicio
exports.crearServicio = async (req, res) => {
    const servicioData = req.body;
    try {
        const nuevoServicio = await Servicio.crear(servicioData);
        res.status(201).json(nuevoServicio);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear servicio', error });
    }
};

// Actualizar servicio por ID
exports.actualizarServicio = async (req, res) => {
    const { id } = req.params;
    const servicioData = req.body;
    try {
        const servicioActualizado = await Servicio.actualizar(id, servicioData);
        if (servicioActualizado) {
            res.status(200).json(servicioActualizado);
        } else {
            res.status(404).json({ message: 'Servicio no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar servicio', error });
    }
};

// Eliminar servicio por ID
exports.eliminarServicio = async (req, res) => {
    const { id } = req.params;
    try {
        const eliminado = await Servicio.eliminar(id);
        if (eliminado) {
            res.status(204).send(); // No content
        } else {
            res.status(404).json({ message: 'Servicio no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar servicio', error });
    }
};