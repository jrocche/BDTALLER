const Orden = require('../models/orden');

// Reporte por estado
exports.reportePorEstado = async (req, res) => {
    try {
        const ordenes = await Orden.obtenerTodas();
        const reportes = {
            pendiente: ordenes.filter(o => o.estado === 'pendiente').length,
            en_progreso: ordenes.filter(o => o.estado === 'en_progreso').length,
            completado: ordenes.filter(o => o.estado === 'completado').length,
        };
        res.status(200).json(reportes);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener reporte por estado', error });
    }
};

// Reporte por prioridad
exports.reportePorPrioridad = async (req, res) => {
    try {
        const ordenes = await Orden.obtenerTodas();
        const reportes = {
            alta: ordenes.filter(o => o.prioridad === 'ALTA').length,
            media: ordenes.filter(o => o.prioridad === 'MEDIA').length,
            baja: ordenes.filter(o => o.prioridad === 'BAJA').length,
        };
        res.status(200).json(reportes);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener reporte por prioridad', error });
    }
};

// Reporte por responsable
exports.reportePorResponsable = async (req, res) => {
    try {
        const ordenes = await Orden.obtenerTodas();
        const reportes = ordenes.reduce((acc, orden) => {
            acc[orden.responsable] = (acc[orden.responsable] || 0) + 1;
            return acc;
        }, {});
        res.status(200).json(reportes);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener reporte por responsable', error });
    }
};