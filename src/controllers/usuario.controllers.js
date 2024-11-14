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
    const { nombre, email, contrasenia, telefono, direccion, dpi, fecha_inicio_labores, activo } = req.body;
    
    console.log('Valor de activo recibido en el backend:', activo); // Para debugging
    
    const hashedPassword = await bcrypt.hash(contrasenia, 10);
    const result = await pool.query(
      `INSERT INTO taller.usuarios 
       (nombre, email, contrasenia, telefono, direccion, dpi, fecha_inicio_labores, activo) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
       RETURNING *`,
      [nombre, email, hashedPassword, telefono, direccion, dpi, fecha_inicio_labores, Boolean(activo)]
    );
    
    res.status(201).json({
      success: true,
      data: result.rows[0],
      message: 'Usuario creado exitosamente'
    });
  } catch (error) {
    console.error('Error en crearUsuario:', error);
    next(error);
  }
};

// Actualizar un usuario
const actualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Validar ID
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "ID de usuario requerido"
      });
    }

    // Validar datos requeridos
    const { nombre, email } = req.body;
    if (!nombre?.trim() || !email?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Nombre y email son requeridos"
      });
    }

    // Verificar si el usuario existe
    const userCheck = await pool.query(
      "SELECT id_usuario FROM taller.usuarios WHERE id_usuario = $1",
      [id]
    );

    if (userCheck.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Usuario no encontrado"
      });
    }

    // Construir query de actualización
    const updates = [];
    const values = [];
    let paramCount = 1;

    // Mapeo de campos a actualizar
    const fieldsToUpdate = {
      nombre,
      email,
      telefono: req.body.telefono,
      direccion: req.body.direccion,
      dpi: req.body.dpi,
      fecha_inicio_labores: req.body.fecha_inicio_labores,
      activo: req.body.activo,
      id_rol: req.body.id_rol
    };

    // Construir arrays de actualización
    for (const [key, value] of Object.entries(fieldsToUpdate)) {
      if (value !== undefined) {
        updates.push(`${key} = $${paramCount}`);
        values.push(value);
        paramCount++;
      }
    }

    // Manejar contraseña si existe
    if (req.body.nuevaContrasenia?.trim()) {
      const hashedPassword = await bcrypt.hash(req.body.nuevaContrasenia.trim(), 10);
      updates.push(`contrasenia = $${paramCount}`);
      values.push(hashedPassword);
      paramCount++;
    }

    // Agregar ID al final de los valores
    values.push(id);

    // Construir y ejecutar query
    const query = `
      UPDATE taller.usuarios 
      SET ${updates.join(', ')} 
      WHERE id_usuario = $${paramCount}
      RETURNING id_usuario, nombre, email, telefono, direccion, dpi, 
                fecha_inicio_labores, activo, id_rol
    `;

    const result = await pool.query(query, values);

    return res.json({
      success: true,
      data: result.rows[0],
      message: "Usuario actualizado exitosamente"
    });

  } catch (error) {
    console.error('Error en actualizarUsuario:', error);
    return res.status(500).json({
      success: false,
      message: "Error al actualizar el usuario",
      error: error.message
    });
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