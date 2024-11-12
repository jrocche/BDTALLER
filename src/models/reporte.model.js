const db = require('../database/database');
const Cotizacion = require('./cotizacion.model'); // Importar el modelo de cotizaciones


const obtenerCotizacionesPorEstado = async () => {
    const { fechaInicio, fechaFin } = obtenerFechas();// obtener las fechas de tu estado
    try {
        const response = await fetch(`${URL}reportes/cotizaciones-por-estado?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
            throw new Error('Error al obtener cotizaciones por estado');
        }

        const dataEstado = await response.json();
        setCotizacionesPorEstado(dataEstado);
    } catch (error) {
        console.error("Error:", error);
        toast.error("Error al cargar los reportes: " + error.message);
    }
};

class Reporte {
    static async obtenerIngresosProyectados(fechaInicio, fechaFin) {
        // Obtener todas las cotizaciones en el rango de fechas
        const cotizaciones = await Cotizacion.obtenerTodas();
        const ingresosProyectados = cotizaciones
            .filter(cotizacion => 
                new Date(cotizacion.fecha) >= new Date(fechaInicio) && 
                new Date(cotizacion.fecha) <= new Date(fechaFin)
            )
            .reduce((total, cotizacion) => total + parseFloat(cotizacion.precio), 0);
        return ingresosProyectados;
    }

    static async obtenerServiciosMasSolicitados(fechaInicio, fechaFin) {
        // Obtener todas las cotizaciones en el rango de fechas
        const cotizaciones = await Cotizacion.obtenerTodas();
        const serviciosFrecuencia = {};

        cotizaciones.forEach(cotizacion => {
            if (new Date(cotizacion.fecha) >= new Date(fechaInicio) && new Date(cotizacion.fecha) <= new Date(fechaFin)) {
                const idServicio = cotizacion.id_servicio;
                const nombreServicio = cotizacion.nombre_servicio;
                const precio = parseFloat(cotizacion.precio);

                if (!serviciosFrecuencia[idServicio]) {
                    serviciosFrecuencia[idServicio] = {
                        nombre: nombreServicio,
                        frecuencia: 0,
                        precio_promedio: 0,
                        total_precio: 0
                    };
                }
                serviciosFrecuencia[idServicio].frecuencia += 1;
                serviciosFrecuencia[idServicio].total_precio += precio;
                serviciosFrecuencia[idServicio].precio_promedio = serviciosFrecuencia[idServicio].total_precio / serviciosFrecuencia[idServicio].frecuencia;
            }
        });

        return Object.keys(serviciosFrecuencia).map(id => ({
            id_servicio: id,
            nombre: serviciosFrecuencia[id].nombre,
            frecuencia: serviciosFrecuencia[id].frecuencia,
            precio_promedio: serviciosFrecuencia[id].precio_promedio
        })).sort((a, b) => b.frecuencia - a.frecuencia);
    }


    
    static async obtenerCotizacionesPorEstado(fechaInicio, fechaFin) {
        const cotizaciones = await Cotizacion.obtenerTodas();
        const estados = { pendiente: 0, aprobada: 0 };

        cotizaciones.forEach(cotizacion => {
            if (new Date(cotizacion.fecha) >= new Date(fechaInicio) && new Date(cotizacion.fecha) <= new Date(fechaFin)) {
                if (cotizacion.estado === 'Pendiente') {
                    estados.pendiente += 1;
                } else if (cotizacion.estado === 'Aprobada') {
                    estados.aprobada += 1;
                }
            }
        });

        const total = estados.pendiente + estados.aprobada;
        const tasaConversion = total > 0 ? (estados.aprobada / total) * 100 : 0;

        return {
            estados,
            tasaConversion: tasaConversion.toFixed(2) + '%'
        };
    }
}

module.exports = Reporte;