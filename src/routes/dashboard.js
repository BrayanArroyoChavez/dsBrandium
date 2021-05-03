const { Router } = require('express');
const router = new Router();
const { Op, Sequelize } = require('sequelize');

const { marcas_renovacion } = require('../connection')
const fn = require('../public/js/dashboard.js')

router.get('/dashboard',async (req,res) =>{
  const page = parseInt(req.query.Page) || 1;
  const limit = parseInt(req.query.Size) || 50;
  
  let offset = (limit*page) - limit;
  const where = fn.getCondicion(req,Op);
  const filter = fn.getFiltro(req);
  
  if (where.length != 0){
    marcas = await marcas_renovacion.findAndCountAll({
      where: where
    }).then(result => {
      return result
    });
  }else{
    marcas = await marcas_renovacion.findAndCountAll({
    }).then(result => {
      return result
    });
  }
  
  situacion = await marcas_renovacion.findAll({
    attributes: [Sequelize.fn('DISTINCT', Sequelize.col('situacion_marca')), 'situacion_marca'] 
  });
  clase = await marcas_renovacion.findAll({
    attributes: [Sequelize.fn('DISTINCT', Sequelize.col('clase_marca')), 'clase_marca']
  });
  clasificacion = await marcas_renovacion.findAll({
    attributes: [Sequelize.fn('DISTINCT', Sequelize.col('clasificacion_niza')), 'clasificacion_niza']
  });
  res.render('dashboard.ejs', {marcas: marcas.rows, situacion: situacion, clase: clase, clasificacion: clasificacion, 
                              page: page, lastpage: Math.ceil(marcas.count/limit), size: limit, count: marcas.count, filter: filter });
 });

 module.exports = router