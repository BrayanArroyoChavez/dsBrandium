//Se importa sequelize el cual se utiliza para la conexión a la base de datos y a su vez para la creación de modelos 
const Sequelize = require('sequelize');

//Se importa el modelo de la tabla marcas_renovacion de la base de datos
const marcas_renovacionModel = require('../models/marcas_renovacion');

//Conexión a la base de datos
/**
 * Sequelize(Nombre de la base de datos, usuario, contraseña, {
    host     : host de la base de datos,
    dialect  : sistema gestor de la base de datos
})
 */
const sequelize = new Sequelize('kampsys','root','',{
  host     : 'localhost',
  dialect  : 'mysql'
})

//Creación del modelo de la tabla marcas_renovacion
const marcas_renovacion = marcas_renovacionModel(sequelize,Sequelize);

//Crea las tablas de la base de datos en caso de que no exitan
sequelize.sync({ force:false })
  .then(() =>{
    console.log("Tablas sincronizadas")
})

//Exportación del modelo la tabla marcas_renovacion y la conexión a la base de datos
module.exports = {
  marcas_renovacion,
  sequelize
}