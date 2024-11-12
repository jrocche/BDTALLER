const db = require('../database/database'); // Asegúrate de tener la configuración de la base de datos

class Orden {
    static async obtenerTodas() {
        const result = await db.query(`
            SELECT o.*, e.nombre as responsable_nombre 
            FROM taller.ordenes_trabajo o
            LEFT JOIN taller.empleados e ON o.id_empleado = e.id_empleado
        `);
        return result.rows;
    }

    static ESTADOS = {
        PENDIENTE: 'pendiente',
        EN_PROGRESO: 'en_progreso',
        COMPLETADO: 'completado'
    };

    static async obtenerPorId(id) {
        const result = await db.query('SELECT * FROM taller.ordenes_trabajo WHERE id_orden = $1', [id]);
        return result.rows[0];
    }

    static async crear(ordenData) {
        try {
            const result = await db.query(
                `INSERT INTO taller.ordenes_trabajo 
                (fecha_inicio, fecha_fin, estado, costo_total, prioridad, 
                modelovehiculo, modo_pago, nombre_cliente, id_empleado, 
                responsable, servicio, servicios_detalle) 
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) 
                RETURNING *`,
                [
                    ordenData.fecha_inicio,
                    ordenData.fecha_fin,
                    ordenData.estado,
                    ordenData.costo_total,
                    ordenData.prioridad,
                    ordenData.modelovehiculo,
                    ordenData.modo_pago,
                    ordenData.nombre_cliente,
                    ordenData.id_empleado,
                    ordenData.responsable,
                    ordenData.servicio,
                    ordenData.servicios_detalle
                ]
            );
            return result.rows[0];
        } catch (error) {
            console.error('Error en la base de datos:', error);
            throw new Error(`Error al crear orden en la base de datos: ${error.message}`);
        }
    }

    static async actualizar(id, ordenData) {
        try {
            console.log('Datos a actualizar:', ordenData); // Para debugging

            const result = await db.query(
                `UPDATE taller.ordenes_trabajo 
                SET fecha_inicio = $1, 
                    fecha_fin = $2, 
                    estado = $3, 
                    costo_total = $4, 
                    prioridad = $5, 
                    modelovehiculo = $6, 
                    modo_pago = $7, 
                    nombre_cliente = $8, 
                    id_empleado = $9,
                    responsable = $10,
                    servicio = $11,
                    servicios_detalle = $12
                WHERE id_orden = $13 
                RETURNING *`,
                [
                    ordenData.fecha_inicio,
                    ordenData.fecha_fin,
                    ordenData.estado,
                    ordenData.costo_total,
                    ordenData.prioridad,
                    ordenData.modelovehiculo,
                    ordenData.modo_pago,
                    ordenData.nombre_cliente,
                    ordenData.id_empleado,
                    ordenData.responsable,
                    ordenData.servicio,
                    ordenData.servicios_detalle,
                    id
                ]
            );
            
            if (result.rows.length === 0) {
                throw new Error('Orden no encontrada');
            }
            
            return result.rows[0];
        } catch (error) {
            console.error('Error en la base de datos:', error);
            throw new Error(`Error al actualizar orden: ${error.message}`);
        }
    }

    static async eliminar(id) {
        const result = await db.query('DELETE FROM taller.ordenes_trabajo WHERE id_orden = $1', [id]);
        return result.rowCount > 0; // Devuelve true si se eliminó un registro
    }
}

module.exports = Orden;