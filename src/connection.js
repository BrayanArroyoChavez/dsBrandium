const Sequelize = require('sequelize');

const marcas_renovacionModel = require('../models/marcas_renovacion');

const sequelize = new Sequelize('kampsys','root','',{
  host     : 'localhost',
  dialect  : 'mysql'
})

const marcas_renovacion = marcas_renovacionModel(sequelize,Sequelize);

sequelize.sync({ force:false })
  .then(() =>{
    console.log("Tablas sincronizadas")
})

module.exports = {
  marcas_renovacion,
  sequelize
}