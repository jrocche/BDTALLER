// src/models/herramientas.model.js
const pool = require("../database/database");

// Funciones para interactuar con la base de datos
const getAllHerramientas = async () => {
  return await pool.query("SELECT * FROM taller.inventario_herramientas");
};

const getHerramientaById = async (id) => {
  return await pool.query("SELECT * FROM taller.inventario_herramientas WHERE id_herramienta = $1", [id]);
};

const crearHerramienta = async (herramienta) => {
  const { nombre, descripcion, cantidad, estado, fecha_adquisicion, precio, responsable } = herramienta;
  return await pool.query(
    `INSERT INTO taller.inventario_herramientas (nombre, descripcion, cantidad, estado, fecha_adquisicion, precio, responsable) 
     VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
    [nombre, descripcion, cantidad, estado, fecha_adquisicion, precio, responsable]
  );
};

const actualizarHerramienta = async (id, herramienta) => {
  const { nombre, descripcion, cantidad, estado, fecha_adquisicion, precio, responsable } = herramienta;
  return await pool.query(
    `UPDATE taller.inventario_herramientas 
     SET nombre = COALESCE($1, nombre), 
         descripcion = COALESCE($2, descripcion), 
         cantidad = COALESCE($3, cantidad), 
         estado = COALESCE($4, estado), 
         fecha_adquisicion = COALESCE($5, fecha_adquisicion), 
         precio = COALESCE($6, precio), 
         responsable = COALESCE($7, responsable) 
     WHERE id_herramienta = $8 RETURNING *`,
    [nombre, descripcion, cantidad, estado, fecha_adquisicion, precio, responsable, id]
  );
};

const eliminarHerramienta = async (id) => {
  return await pool.query("DELETE FROM taller.inventario_herramientas WHERE id_herramienta = $1", [id]);
};

const getHistorialHerramienta = async (id) => {
  return await pool.query(
    `SELECT * FROM taller.historial_herramientas 
     WHERE id_herramienta = $1 
     ORDER BY fecha_cambio DESC`,
    [id]
  );
};

const registrarCambioEstado = async (idHerramienta, estadoAnterior, estadoNuevo, observaciones, usuarioResponsable) => {
  return await pool.query(
    `INSERT INTO taller.historial_herramientas 
     (id_herramienta, estado_anterior, estado_nuevo, observaciones, usuario_responsable) 
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [idHerramienta, estadoAnterior, estadoNuevo, observaciones, usuarioResponsable]
  );
};

module.exports = {
  getAllHerramientas,
  getHerramientaById,
  crearHerramienta,
  actualizarHerramienta,
  eliminarHerramienta,
  getHistorialHerramienta,
  registrarCambioEstado,
};