const EmpleadoModel = require('../models/empleado.model');

class EmpleadoController {
  async getAllEmpleados(req, res) {
    try {
      const empleados = await EmpleadoModel.getAllEmpleados();
      res.json(empleados);
    } catch (error) {
      console.error('Error en getAllEmpleados:', error);
      res.status(500).json({ 
        message: 'Error al obtener empleados', 
        error: error.message 
      });
    }
  }

  async createEmpleado(req, res) {
    try {
      const nuevoEmpleado = await EmpleadoModel.createEmpleado(req.body);
      res.status(201).json(nuevoEmpleado);
    } catch (error) {
      if (error.message === 'El email ya está registrado') {
        return res.status(400).json({ message: error.message });
      }
      console.error('Error en createEmpleado:', error);
      res.status(500).json({ 
        message: 'Error al crear empleado', 
        error: error.message 
      });
    }
  }

  async updateEmpleado(req, res) {
    try {
      const empleadoActualizado = await EmpleadoModel.updateEmpleado(req.params.id, req.body);
      res.json(empleadoActualizado);
    } catch (error) {
      if (error.message === 'Empleado no encontrado') {
        return res.status(404).json({ message: error.message });
      }
      if (error.message === 'El email ya está registrado') {
        return res.status(400).json({ message: error.message });
      }
      console.error('Error en updateEmpleado:', error);
      res.status(500).json({ 
        message: 'Error al actualizar empleado', 
        error: error.message 
      });
    }
  }

  async deleteEmpleado(req, res) {
    try {
      await EmpleadoModel.deleteEmpleado(req.params.id);
      res.json({ message: 'Empleado eliminado exitosamente' });
    } catch (error) {
      if (error.message === 'Empleado no encontrado') {
        return res.status(404).json({ message: error.message });
      }
      console.error('Error en deleteEmpleado:', error);
      res.status(500).json({ 
        message: 'Error al eliminar empleado', 
        error: error.message 
      });
    }
  }
}

module.exports = new EmpleadoController();