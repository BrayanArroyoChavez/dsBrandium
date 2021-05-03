const Sequelize = require('sequelize');

const marcas_renovacionModel = require('../models/marcas_renovacion');

const sequelize = new Sequelize('b5ieyox0oo6iha0jf6t8','u0u3tbtirq65ttqn','gVp3XMYOqwj6a6kvOpN5',{
  host     : 'b5ieyox0oo6iha0jf6t8-mysql.services.clever-cloud.com',
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