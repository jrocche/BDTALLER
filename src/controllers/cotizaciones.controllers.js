const Cotizacion = require('../models/cotizacion.model');
const PDFDocument = require('pdfkit');
const { Response } = require('express');

// Obtener todas las cotizaciones
exports.obtenerTodasCotizaciones = async (req, res) => {
    try {
        const cotizaciones = await Cotizacion.obtenerTodas();
        res.status(200).json(cotizaciones);
    } catch (error) {
        console.error('Error al obtener cotizaciones:', error);
        res.status(500).json({ 
            message: 'Error al obtener cotizaciones', 
            error: error.message 
        });
    }
};


// Obtener cotización por ID
exports.obtenerCotizacionPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const cotizacion = await Cotizacion.obtenerPorId(id);
        if (cotizacion) {
            res.status(200).json(cotizacion);
        } else {
            res.status(404).json({ message: 'Cotización no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener cotización', error });
    }
};

// Crear una nueva cotización
exports.crearCotizacion = async (req, res) => {
    try {
        const cotizacionData = {
            ...req.body,
            servicios_detalle: req.body.servicios_detalle || '[]'
        };

        // Validar datos requeridos
        if (!cotizacionData.id_cliente) {
            return res.status(400).json({ 
                message: 'El ID del cliente es requerido' 
            });
        }

        // Asegurarse de que servicios_detalle sea un string JSON válido
        if (typeof cotizacionData.servicios_detalle !== 'string') {
            cotizacionData.servicios_detalle = JSON.stringify(cotizacionData.servicios_detalle);
        }

        const nuevaCotizacion = await Cotizacion.crear(cotizacionData);
        res.status(201).json(nuevaCotizacion);
    } catch (error) {
        console.error('Error al crear cotización:', error);
        res.status(500).json({ 
            message: 'Error al crear cotización', 
            error: error.message 
        });
    }
};

// Actualizar cotización por ID
exports.actualizarCotizacion = async (req, res) => {
    try {
        const { id } = req.params;
        const cotizacionData = req.body;

        // Asegurarse de que servicios_detalle sea un string JSON válido
        if (cotizacionData.servicios_detalle && typeof cotizacionData.servicios_detalle !== 'string') {
            cotizacionData.servicios_detalle = JSON.stringify(cotizacionData.servicios_detalle);
        }

        const cotizacionActualizada = await Cotizacion.actualizar(id, cotizacionData);
        
        if (!cotizacionActualizada) {
            return res.status(404).json({ message: 'Cotización no encontrada' });
        }

        res.status(200).json(cotizacionActualizada);
    } catch (error) {
        console.error('Error al actualizar cotización:', error);
        res.status(500).json({ 
            message: 'Error al actualizar cotización', 
            error: error.message 
        });
    }
};

// Eliminar cotización por ID
exports.eliminarCotizacion = async (req, res) => {
    try {
        const { id } = req.params;
        const eliminado = await Cotizacion.eliminar(id);
        
        if (!eliminado) {
            return res.status(404).json({ message: 'Cotización no encontrada' });
        }
        
        res.status(204).send();
    } catch (error) {
        console.error('Error al eliminar cotización:', error);
        res.status(500).json({ 
            message: 'Error al eliminar cotización', 
            error: error.message 
        });
    }
};

// Imprimir detalle de cotización en PDF
exports.imprimirCotizacionPDF = async (req, res) => {
    const { id } = req.params;
    try {
        const cotizacion = await Cotizacion.obtenerPorId(id);
        if (!cotizacion) {
            return res.status(404).json({ message: 'Cotización no encontrada' });
        }

        const doc = new PDFDocument();
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=cotizacion_${id}.pdf`);

        doc.pipe(res);

        doc.fontSize(25).text('Detalle de Cotización', { align: 'center' });
        doc.moveDown();
        doc.fontSize(12).text(`ID Cotización: ${cotizacion.id_cotizacion}`);
        doc.text(`ID Cliente: ${cotizacion.id_cliente}`);
        doc.text(`ID Servicio: ${cotizacion.id_servicio}`);
        doc.text(`Fecha: ${cotizacion.fecha}`);
        doc.text(`Hora: ${cotizacion.hora}`);
        doc.text(`Estado: ${cotizacion.estado}`);
        doc.text(`Tipo Cliente: ${cotizacion.tipo_cliente}`);
        doc.text(`Precio: Q${cotizacion.precio.toFixed(2)}`);

        doc.end();
    } catch (error) {
        res.status(500).json({ message: 'Error al generar PDF', error });
    }
};