const pool = require('../database/database');

class EmpleadoModel {
  async getAllEmpleados() {
    try {
      const query = 'SELECT * FROM taller.empleados ORDER BY id_empleado DESC';
      const { rows } = await pool.query(query);
      return rows;
    } catch (error) {
      console.error('Error en getAllEmpleados:', error);
      throw error;
    }
  }

  async createEmpleado(empleadoData) {
    try {
      const query = `
        INSERT INTO taller.empleados 
        (nombre, telefono, email, direccion, puesto, fecha_contratacion, salario)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *
      `;
      const values = [
        empleadoData.nombre,
        empleadoData.telefono || null,
        empleadoData.email || null,
        empleadoData.direccion || null,
        empleadoData.puesto,
        empleadoData.fecha_contratacion,
        empleadoData.salario || null
      ];
      const { rows } = await pool.query(query, values);
      return rows[0];
    } catch (error) {
      // Manejo específico para error de email duplicado
      if (error.code === '23505' && error.constraint === 'empleados_email_key') {
        throw new Error('El email ya está registrado');
      }
      console.error('Error en createEmpleado:', error);
      throw error;
    }
  }

  async updateEmpleado(id, empleadoData) {
    try {
      const query = `
        UPDATE taller.empleados 
        SET nombre = $1, 
            telefono = $2, 
            email = $3, 
            direccion = $4, 
            puesto = $5, 
            fecha_contratacion = $6, 
            salario = $7
        WHERE id_empleado = $8
        RETURNING *
      `;
      const values = [
        empleadoData.nombre,
        empleadoData.telefono || null,
        empleadoData.email || null,
        empleadoData.direccion || null,
        empleadoData.puesto,
        empleadoData.fecha_contratacion,
        empleadoData.salario || null,
        id
      ];
      const { rows } = await pool.query(query, values);
      if (rows.length === 0) {
        throw new Error('Empleado no encontrado');
      }
      return rows[0];
    } catch (error) {
      if (error.code === '23505' && error.constraint === 'empleados_email_key') {
        throw new Error('El email ya está registrado');
      }
      console.error('Error en updateEmpleado:', error);
      throw error;
    }
  }

  async deleteEmpleado(id) {
    try {
      const query = 'DELETE FROM taller.empleados WHERE id_empleado = $1 RETURNING *';
      const { rows } = await pool.query(query, [id]);
      if (rows.length === 0) {
        throw new Error('Empleado no encontrado');
      }
      return rows[0];
    } catch (error) {
      console.error('Error en deleteEmpleado:', error);
      throw error;
    }
  }
}

module.exports = new EmpleadoModel();