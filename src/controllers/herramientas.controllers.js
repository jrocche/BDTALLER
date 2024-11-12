// src/controllers/herramientas.controllers.js
const herramientasModel = require("../models/herramientas.model");

// Obtener todas las herramientas
const getAllHerramientas = async (req, res, next) => {
  try {
    const result = await herramientasModel.getAllHerramientas();
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};

// Obtener una herramienta por ID
const getHerramienta = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await herramientasModel.getHerramientaById(id);
    if (result.rows.length === 0) return res.status(404).json({ message: "Herramienta no encontrada" });
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

// Crear una nueva herramienta
const crearHerramienta = async (req, res, next) => {
  try {
    const herramienta = req.body;
    const result = await herramientasModel.crearHerramienta(herramienta);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

// Actualizar una herramienta
const actualizarHerramienta = async (req, res, next) => {
  const { id } = req.params;
  const herramienta = req.body;
  try {
    // Obtener el estado actual de la herramienta
    const herramientaActual = await herramientasModel.getHerramientaById(id);
    
    if (herramientaActual.rows.length === 0) {
      return res.status(404).json({ message: "Herramienta no encontrada" });
    }

    const estadoActual = herramientaActual.rows[0].estado;
    
    // Actualizar la herramienta
    const result = await herramientasModel.actualizarHerramienta(id, herramienta);

    // Si el estado ha cambiado, registrar en el historial
    if (herramienta.estado && estadoActual !== herramienta.estado) {
      await herramientasModel.registrarCambioEstado(
        id,
        estadoActual,
        herramienta.estado,
        herramienta.observaciones || `Cambio de estado de ${estadoActual} a ${herramienta.estado}`,
        herramienta.responsable
      );
    }

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

// Eliminar una herramienta
const eliminarHerramienta = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await herramientasModel.eliminarHerramienta(id);
    if (result.rowCount === 0) return res.status(404).json({ message: "Herramienta no encontrada" });
    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

const getHistorialHerramienta = async (req, res, next) => {
  const { id } = req.params;
  try {
    const herramienta = await herramientasModel.getHerramientaById(id);
    const historial = await herramientasModel.getHistorialHerramienta(id);
    
    if (herramienta.rows.length === 0) {
      return res.status(404).json({ message: "Herramienta no encontrada" });
    }

    res.json({
      herramienta: herramienta.rows[0],
      historial: historial.rows
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllHerramientas,
  getHerramienta,
  crearHerramienta,
  actualizarHerramienta,
  eliminarHerramienta,
  getHistorialHerramienta,
};