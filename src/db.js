//Se importa la conexión a la base de datos
const connection = require('./connection')

//Se hace uso de la constante db para almacenar las funciones y posteriormente exportarlas
const db = {};

//Función para extraer de la base de datos las marcas registradas
//condition valida si han aplicado filtros en la página
function getMarcas(condition) {
    if (condition == ""){
        return dbQuery(`SELECT * FROM marcas_renovacion`);
    }else{
        return dbQuery(`SELECT * FROM marcas_renovacion WHERE ${condition}`);
    }
}

//Función para extraer de la base de datos los distintos valores que tiene el campo que registra la situación de la marca
//El resultado se muestra como una de las opciones a elegir en los filtros del dashboard dentro de un dropdown
function getSituacion() {
    return dbQuery('SELECT DISTINCT(situacion_marca) FROM `marcas_renovacion`');
}

//Función para extraer de la base de datos los distintos valores que tiene el campo que registra la clase de la marca
//El resultado se muestra como una de las opciones a elegir en los filtros del dashboard dentro de un dropdown
//Pendiente de modificación para que muestre valores unicos
function getClase() {
    return dbQuery('SELECT DISTINCT(clase_marca) FROM `marcas_renovacion`');
}

//Función para extraer de la base de datos los distintos valores que tiene el campo que registra la clasificación de la marca
//El resultado se muestra como una de las opciones a elegir en los filtros del dashboard dentro de un dropdown
function getClasificacion() {
    return dbQuery('SELECT DISTINCT(clasificacion_niza) FROM `marcas_renovacion`');
}

//Función para ejecutar las consultas de las base de datos definidas en las funciones previas
function dbQuery(databaseQuery) {
    console.log(databaseQuery);
    return new Promise(data => {
        connection.query(databaseQuery, function (error, result) {
        if (error) throw error;
        try {
            data(result);
        } catch (error) {
            data({});
            throw error;
        }
        });
    });
}

//Exportación de las funciones definidas en el archivo db.js
db.getMarcas = getMarcas;
db.getSituacion = getSituacion;
db.getClase = getClase;
db.getClasificacion = getClasificacion;

module.exports = db;