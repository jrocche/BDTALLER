const db = require('../database/database'); // Asegúrate de tener la configuración de la base de datos

class Servicio {
    static async obtenerTodos() {
        const result = await db.query('SELECT * FROM taller.servicios');
        return result.rows.map(servicio => ({
            ...servicio,
            precio: parseFloat(servicio.precio) // Asegurarse de que el precio sea un número
        }));
    }

    static async obtenerPorId(id) {
        const result = await db.query('SELECT * FROM taller.servicios WHERE id_servicio = $1', [id]);
        return result.rows[0];
    }

    static async crear(servicioData) {
        const { nombre, descripcion, precio } = servicioData;
        const result = await db.query(
            'INSERT INTO taller.servicios (nombre, descripcion, precio) VALUES ($1, $2, $3) RETURNING *',
            [nombre, descripcion, precio]
        );
        return result.rows[0];
    }

    static async actualizar(id, servicioData) {
        const { nombre, descripcion, precio } = servicioData;
        const result = await db.query(
            'UPDATE taller.servicios SET nombre = $1, descripcion = $2, precio = $3 WHERE id_servicio = $4 RETURNING *',
            [nombre, descripcion, precio, id]
        );
        return result.rows[0];
    }

    static async eliminar(id) {
        const result = await db.query('DELETE FROM taller.servicios WHERE id_servicio = $1', [id]);
        return result.rowCount > 0; // Devuelve true si se eliminó un registro
    }
}

module.exports = Servicio;