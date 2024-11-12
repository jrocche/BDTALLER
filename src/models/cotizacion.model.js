const db = require('../database/database');

class Cotizacion {
    static async obtenerTodas() {
        try {
            const query = `
                SELECT c.*, cl.nombre as nombre_cliente,
                       c.servicios_detalle::text as servicios_detalle
                FROM taller.cotizaciones c
                LEFT JOIN taller.clientes cl ON c.id_cliente = cl.id_cliente
                ORDER BY c.id_cotizacion DESC
            `;
            const result = await db.query(query);
            return result.rows;
        } catch (error) {
            console.error('Error en obtenerTodas:', error);
            throw error;
        }
    }

    static async crear(cotizacionData) {
        try {
            const {
                id_cliente,
                servicios_detalle,
                fecha,
                hora,
                estado,
                tipo_cliente,
                precio
            } = cotizacionData;

            const query = `
                INSERT INTO taller.cotizaciones 
                (id_cliente, servicios_detalle, fecha, hora, estado, tipo_cliente, precio)
                VALUES ($1, $2::jsonb, $3, $4, $5, $6, $7)
                RETURNING *
            `;

            const values = [
                id_cliente,
                servicios_detalle,
                fecha || new Date().toISOString().split('T')[0],
                hora || new Date().toLocaleTimeString(),
                estado || 'Pendiente',
                tipo_cliente || 'Cliente',
                precio || 0
            ];

            const result = await db.query(query, values);
            return result.rows[0];
        } catch (error) {
            console.error('Error en crear:', error);
            throw error;
        }
    }

    static async actualizar(id, cotizacionData) {
        try {
            const {
                servicios_detalle,
                fecha,
                hora,
                estado,
                tipo_cliente,
                precio
            } = cotizacionData;

            const query = `
                UPDATE taller.cotizaciones 
                SET servicios_detalle = $1::jsonb,
                    fecha = $2,
                    hora = $3,
                    estado = $4,
                    tipo_cliente = $5,
                    precio = $6
                WHERE id_cotizacion = $7
                RETURNING *
            `;

            const values = [
                servicios_detalle,
                fecha,
                hora,
                estado,
                tipo_cliente,
                precio,
                id
            ];

            const result = await db.query(query, values);
            return result.rows[0];
        } catch (error) {
            console.error('Error en actualizar:', error);
            throw error;
        }
    }

    static async eliminar(id) {
        try {
            const query = 'DELETE FROM taller.cotizaciones WHERE id_cotizacion = $1 RETURNING *';
            const result = await db.query(query, [id]);
            return result.rows[0];
        } catch (error) {
            console.error('Error en eliminar:', error);
            throw error;
        }
    }
}

module.exports = Cotizacion; 