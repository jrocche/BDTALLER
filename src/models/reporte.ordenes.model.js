const pool = require('../database/database');

class Orden {
    static async obtenerTodas() {
        const query = 'SELECT * FROM taller.ordenes_trabajo';
        const { rows } = await pool.query(query);
        return rows;
    }

    // Puedes agregar más métodos aquí según sea necesario, por ejemplo:
    static async obtenerPorId(id) {
        const query = 'SELECT * FROM taller.ordenes_trabajo WHERE id_orden = $1';
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    }

    static async crearOrden(ordenData) {
        const { fecha_inicio, fecha_fin, estado, costo_total, prioridad, modelovehiculo, modo_pago, nombre_cliente, responsable, descripcion_servicio, servicio } = ordenData;
        const query = `
            INSERT INTO taller.ordenes_trabajo (fecha_inicio, fecha_fin, estado, costo_total, prioridad, modelovehiculo, modo_pago, nombre_cliente, responsable, descripcion_servicio, servicio)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
            RETURNING *`;
        const { rows } = await pool.query(query, [fecha_inicio, fecha_fin, estado, costo_total, prioridad, modelovehiculo, modo_pago, nombre_cliente, responsable, descripcion_servicio, servicio]);
        return rows[0];
    }

    // Agrega más métodos según sea necesario
}

module.exports = Orden;