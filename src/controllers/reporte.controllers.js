const Reporte = require('../models/reporte.model');

exports.obtenerIngresosProyectados = async (req, res) => {
    const { fechaInicio, fechaFin } = req.query;
    try {
        const totalIngresos = await Reporte.obtenerIngresosProyectados(fechaInicio, fechaFin);
        res.status(200).json({ totalIngresos });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener ingresos proyectados', error });
    }
};

exports.obtenerServiciosMasSolicitados = async (req, res) => {
    const { fechaInicio, fechaFin } = req.query;
    try {
        const servicios = await Reporte.obtenerServiciosMasSolicitados(fechaInicio, fechaFin);
        res.status(200).json(servicios);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener servicios más solicitados', error });
    }
};

exports.obtenerCotizacionesPorEstado = async (req, res) => {
    const { fechaInicio, fechaFin } = req.query;
    try {
        const cotizacionesPorEstado = await Reporte.obtenerCotizacionesPorEstado(fechaInicio, fechaFin);
        res.status(200).json(cotizacionesPorEstado);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener cotizaciones por estado', error });
    }
};