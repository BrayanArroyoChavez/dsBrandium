const connection = require('./connection')

const db = {};

function getMarcas() {
    return dbQuery('SELECT * FROM `marcas_renovacion` where id < 7000');
}

function getSituacion() {
    return dbQuery('SELECT DISTINCT(situacion_marca) FROM `marcas_renovacion`');
}

function getClase() {
    return dbQuery('SELECT DISTINCT(situacion_marca) FROM `marcas_renovacion`');
}

function dbQuery(databaseQuery) {
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

module.exports = db;