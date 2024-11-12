const pool = require("../database/database");
const bcrypt = require("bcryptjs");

// Obtener todos los usuarios
const getAllUsuarios = async (req, res, next) => {
  try {
    const usuarios = await pool.query(
      "SELECT id_usuario, nombre, email, telefono, direccion, dpi, fecha_inicio_labores, activo FROM taller.usuarios"
    );
    res.json(usuarios.rows );
  } catch (error) {
    next(error);
  }
};


// Obtener un usuario por ID
const getUsuario = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "SELECT id_usuario, nombre, email, telefono, direccion, activo FROM taller.usuarios WHERE id_usuario = $1",
      [id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ message: "Usuario no encontrado" });
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

// Crear un nuevo usuario
const crearUsuario = async (req, res, next) => {
  try {
    const { nombre, email, contrasenia, telefono, direccion, dpi, fecha_inicio_labores } = req.body;
    const hashedPassword = await bcrypt.hash(contrasenia, 10);
    const result = await pool.query(
      `INSERT INTO taller.usuarios (nombre, email, contrasenia, telefono, direccion, dpi, fecha_inicio_labores, activo) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, true) RETURNING *`,
      [nombre, email, hashedPassword, telefono, direccion, dpi, fecha_inicio_labores]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

// Actualizar un usuario
const actualizarUsuario = async (req, res, next) => {
  const { id } = req.params;
  const { nombre, email, telefono, direccion, dpi, fecha_inicio_labores, activo } = req.body;

  try {
    const result = await pool.query(
      `UPDATE taller.usuarios 
       SET nombre = COALESCE($1, nombre), 
           email = COALESCE($2, email), 
           telefono = COALESCE($3, telefono), 
           direccion = COALESCE($4, direccion), 
           dpi = COALESCE($5, dpi), 
                 fecha_inicio_labores = COALESCE($6, fecha_inicio_labores), 
                 activo = COALESCE($7, activo) 
             WHERE id_usuario = $8 RETURNING *`,
      [nombre, email, telefono, direccion, activo, id, dpi, fecha_inicio_labores]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ message: "Usuario no encontrado" });
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

// Eliminar un usuario
const eliminarUsuario = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM taller.usuarios WHERE id_usuario = $1",
      [id]
    );
    if (result.rowCount === 0)
      return res.status(404).json({ message: "Usuario no encontrado" });
    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsuarios,
  getUsuario,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
};