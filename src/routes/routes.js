//Creación de rutas
const { Router } = require('express');
const router = new Router();

//Se importa la libreria Sequelize y Op que contiene los operadores que se pueden emplear en las consultas a las base de datos
const { Op, Sequelize } = require('sequelize');

//Se importa el modelo de la tabla de marcas_renovacion
const { marcas_renovacion } = require('../connection')

const f = require('../public/js/fecha')

//Se importan las funciones contenidas en el archivo dashboard.js 
const fn = require('../public/js/dashboard.js')

//Ruta principal
router.get('/',async (req,res) =>{
  marcas = await marcas_renovacion.findAndCountAll({
  }).then(result => {
    return result
  });

  fsEnd = await marcas_renovacion.findAll({
    attributes: [[Sequelize.fn('max', Sequelize.col('fecha_solicitud')), 'fsEnd']],
    raw: true
  }).then(result => {
    return result[0].fsEnd
  });

  fsStart = await marcas_renovacion.findAll({
    attributes: [[Sequelize.fn('min', Sequelize.col('fecha_solicitud')), 'fsStart']],
    raw: true,
    where: {
      fecha_registro: {[Op.gt]:0000-00-00}
    }
  }).then(result => {
    return result[0].fsStart
  });

  frEnd = await marcas_renovacion.findAll({
    attributes: [[Sequelize.fn('max', Sequelize.col('fecha_registro')), 'frEnd']],
    raw: true
  }).then(result => {
    return result[0].frEnd
  });

  frStart = await marcas_renovacion.findAll({
    attributes: [[Sequelize.fn('min', Sequelize.col('fecha_registro')), 'frStart']],
    raw: true,
    where: {
      fecha_registro: {[Op.gt]:0000-00-00}
    }
  }).then(result => {
    return result[0].frStart
  });

  res.render('index.ejs', {marcas: marcas.count, frStart: f.DateFormatmarca(frStart), frEnd: f.DateFormatmarca(frEnd), fsStart: f.DateFormatmarca(fsStart), fsEnd: f.DateFormatmarca(fsEnd)});
});

//Ruta para mostrar el dashboard
router.get('/dashboard',async (req,res) =>{
  //Se derminan las condiciones de filtrado en caso de que se hayan aplicado
  const where = fn.getCondicion(req,Op);
  //Se determian las opciones de filtrado seleccionadas para marcarlas como seleccionadas en la página
  const filter = fn.getFiltro(req);
  
  console.log(where)
  //Dado que la función getCondicion devuelve un arreglo se valida si es diferente de 0 para determinar si hay condiciones de filtrado
  if (where.length != 0){ 
    //Función para extraer de la base de datos las marcas registradas con las condiciones determinadas
    marcas = await marcas_renovacion.findAndCountAll({
      where: where
    }).then(result => {
      return result
    });
  }else{
    //Función para extraer de la base de datos las marcas registradas
    marcas = await marcas_renovacion.findAndCountAll({
      where:{
        band_completo : 1
      }
    }).then(result => {
      return result
    });
  }
  //Función para extraer de la base de datos los distintos valores que tiene el campo que registra la situación de la marca
  //El resultado se muestra como una de las opciones a elegir en los filtros del dashboard dentro de un dropdown
  situacion = await marcas_renovacion.findAll({
    attributes: [Sequelize.fn('DISTINCT', Sequelize.col('situacion_marca')), 'situacion_marca'],
    where: where
  });

  //Función para extraer de la base de datos los distintos valores que tiene el campo que registra la clase de la marca
  //El resultado se muestra como una de las opciones a elegir en los filtros del dashboard dentro de un dropdown
  //Pendiente de modificación para que muestre valores unicos
  clase = await marcas_renovacion.findAll({
    attributes: [Sequelize.fn('DISTINCT', Sequelize.col('clase_marca')), 'clase_marca'],
    where: where
  });

  //Función para extraer de la base de datos los distintos valores que tiene el campo que registra la clasificación de la marca
  //El resultado se muestra como una de las opciones a elegir en los filtros del dashboard dentro de un dropdown
  clasificacion = await marcas_renovacion.findAll({
    attributes: [Sequelize.fn('DISTINCT', Sequelize.col('clasificacion_niza')), 'clasificacion_niza'],
    where: where
  });

  //Se renderiza en la página el archivo dashboard.ejs en la ruta /dashboard y se le envian las variables determinadas en el arreglo
  res.render('dashboard.ejs', {marcas: marcas.rows, situacion: situacion, clase: clase, clasificacion: clasificacion, filter: filter , 
    fsStart: req.query.fsStart , fsEnd: req.query.fsEnd, frStart: req.query.frStart, frEnd: req.query.frEnd});
 });

 //Se exporta las rutas definidas
 module.exports = router