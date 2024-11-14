const Orden = require('../models/orden');

// Obtener todas las órdenes
exports.obtenerTodasOrdenes = async (req, res) => {
    try {
        const ordenes = await Orden.obtenerTodas();
        res.status(200).json(ordenes);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener órdenes', error });
    }
};

// Obtener orden por ID
exports.obtenerOrdenPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const orden = await Orden.obtenerPorId(id);
        if (orden) {
            res.status(200).json(orden);
        } else {
            res.status(404).json({ message: 'Orden no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener orden', error });
    }
};

// Crear una nueva orden
exports.crearOrden = async (req, res) => {
    try {
        const ordenData = req.body;
        console.log('Datos recibidos:', ordenData);

        // Validaciones básicas
        if (!ordenData.fecha_inicio || !ordenData.fecha_fin) {
            return res.status(400).json({ 
                message: 'Las fechas son requeridas' 
            });
        }

        // Preparar los datos para la base de datos
        const ordenParaCrear = {
            fecha_inicio: ordenData.fecha_inicio,
            fecha_fin: ordenData.fecha_fin,
            estado: ordenData.estado || 'pendiente',
            costo_total: parseFloat(ordenData.costo_total) || 0,
            prioridad: ordenData.prioridad || 'Baja',
            modelovehiculo: ordenData.modelovehiculo || '',
            modo_pago: ordenData.modo_pago || 'Efectivo',
            nombre_cliente: ordenData.nombre_cliente || '',
            id_empleado: ordenData.id_empleado || null,
            responsable: ordenData.responsable || '',
            servicio: ordenData.servicios?.[0]?.nombre || '', // Tomar el primer servicio como principal
            servicios_detalle: ordenData.servicios_detalle
        };

        const nuevaOrden = await Orden.crear(ordenParaCrear);
        res.status(201).json(nuevaOrden);
    } catch (error) {
        console.error('Error detallado al crear orden:', error);
        res.status(500).json({ 
            message: 'Error al crear orden', 
            error: error.message
        });
    }
};

// Actualizar orden por ID
exports.actualizarOrden = async (req, res) => {
    try {
        const { id } = req.params;
        const ordenData = req.body;

        console.log('Datos recibidos:', ordenData); // Para debugging

        // Validaciones básicas
        if (!ordenData.fecha_inicio || !ordenData.fecha_fin) {
            return res.status(400).json({ 
                message: 'Las fechas son requeridas' 
            });
        }

        // Asegurarse de que los campos tengan valores válidos
        const ordenParaActualizar = {
            fecha_inicio: ordenData.fecha_inicio,
            fecha_fin: ordenData.fecha_fin,
            estado: ordenData.estado || 'pendiente',
            costo_total: parseFloat(ordenData.costo_total) || 0,
            prioridad: ordenData.prioridad || 'Baja',
            modelovehiculo: ordenData.modelovehiculo || '',
            modo_pago: ordenData.modo_pago || 'Efectivo',
            nombre_cliente: ordenData.nombre_cliente || '',
            id_empleado: ordenData.id_empleado || null,
            responsable: ordenData.responsable || '',
            servicio: ordenData.servicio || '',
            servicios_detalle: ordenData.servicios_detalle || null
        };

        const ordenActualizada = await Orden.actualizar(id, ordenParaActualizar);
        
        if (!ordenActualizada) {
            return res.status(404).json({ message: 'Orden no encontrada' });
        }

        res.json(ordenActualizada);
    } catch (error) {
        console.error('Error detallado:', error);
        res.status(500).json({ 
            message: 'Error al actualizar orden', 
            error: error.message,
            stack: error.stack // Solo para desarrollo
        });
    }
};

// Eliminar orden por ID
exports.eliminarOrden = async (req, res) => {
    const { id } = req.params;
    try {
        const eliminado = await Orden.eliminar(id);
        if (eliminado) {
            res.status(204).send(); // No content
        } else {
            res.status(404).json({ message: 'Orden no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar orden', error });
    }
};