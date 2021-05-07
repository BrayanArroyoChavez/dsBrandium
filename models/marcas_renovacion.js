//Modelo de la tabla de marcas_renovacion
//Se definen los campos de la tabla y el tipo de dato de cada uno
module.exports = (sequelize, type) => {
    return sequelize.define('marcas_renovacion',{
        id:{
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        no_solicitud: {
            unique: true,
            type: type.STRING
        },
        detalles_url: type.STRING,
        situacion_marca: type.STRING,
        clasificacion_niza: type.STRING,
        nombre_marca: type.STRING,
        no_registro: type.STRING,
        tipo_dpi: type.STRING,
        tipo_marca: type.STRING,
        clase_marca: type.STRING,
        producto_servicio: type.STRING,
        fecha_solicitud: type.DATEONLY,
        fecha_registro: type.DATEONLY,
        fecha_vencimiento: type.DATEONLY,
        nombre_solicitante: type.STRING,
        municipio_solicitante: type.STRING,
        direccion_solicitante: type.STRING,
        pais_solicitante: type.STRING,
        telefono_solicitante: type.STRING,
        correo_solicitante: type.STRING,
        cp_solicitante: type.STRING,
        nombre_representante: type.STRING,
        direccion_representante: type.STRING,
        ciudad_representante: type.STRING,
        telefono_representante: type.STRING,
        correo_representante: type.STRING,
        cp_representante: type.STRING,
        pais_representante: type.STRING,
        imagen_url: type.STRING,
        band_completo:{
            type: type.BOOLEAN,
            defaultValue: 0
        }
    })
}