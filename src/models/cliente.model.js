const db = require('../database/database'); 

class Cliente {
    static async obtenerTodos() {
        const result = await db.query('SELECT * FROM taller.clientes');
        return result.rows;
    }

    static async obtenerPorId(id) {
        const result = await db.query('SELECT * FROM taller.clientes WHERE id_cliente = $1', [id]);
        return result.rows[0];
    }

    static async crear(clienteData) {
        const { nombre, telefono, direccion, email, dpi, nit } = clienteData;
        const result = await db.query(
            'INSERT INTO taller.clientes (nombre, telefono, direccion, email, dpi, nit) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [nombre, telefono, direccion, email, dpi, nit]
        );
        return result.rows[0];
    }

    static async actualizar(id, clienteData) {
        const { nombre, telefono, direccion, email, dpi, nit } = clienteData;
        const result = await db.query(
            'UPDATE taller.clientes SET nombre = $1, telefono = $2, direccion = $3, email = $4, dpi = $5, nit = $6 WHERE id_cliente = $7 RETURNING *',
            [nombre, telefono, direccion, email, dpi, nit, id]
        );
        return result.rows[0];
    }

    static async eliminar(id) {
        const result = await db.query('DELETE FROM taller.clientes WHERE id_cliente = $1', [id]);
        return result.rowCount > 0; // Devuelve true si se eliminó un registro
    }
}

module.exports = Cliente;