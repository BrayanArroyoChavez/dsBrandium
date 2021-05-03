const connection = require('./connection')

const db = {};

function getMarcas(page,size,condicion) {
    if (condicion == ""){
        return dbQuery(`SELECT * FROM marcas_renovacion LIMIT ${page}, ${size}`);
    }else{
        return dbQuery(`SELECT * FROM marcas_renovacion WHERE ${condicion} LIMIT ${page}, ${size}`);
    }
}

function getCount(){
    return dbQuery('SELECT COUNT(*) as pages FROM `marcas_renovacion`');
}

function getSituacion() {
    return dbQuery('SELECT DISTINCT(situacion_marca) FROM `marcas_renovacion`');
}

//Pendiente de modificación para que muestre valores unicos
function getClase() {
    return dbQuery('SELECT DISTINCT(clase_marca) FROM `marcas_renovacion`');
}

function getClasificacion() {
    return dbQuery('SELECT DISTINCT(clasificacion_niza) FROM `marcas_renovacion`');
}

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

db.getMarcas = getMarcas;
db.getSituacion = getSituacion;
db.getClase = getClase;
db.getClasificacion = getClasificacion;
db.getCount = getCount;

module.exports = db;