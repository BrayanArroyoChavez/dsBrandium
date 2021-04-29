const { Router } = require('express');
const router = new Router();
const { Op, Sequelize } = require('sequelize');

const { marcas_renovacion } = require('../connection')
const fn = require('../public/js/dashboard.js')

router.all('/dashboard',async (req,res) =>{
  let size = parseInt(req.query.page) || 1;
  let limit = parseInt(req.query.Size) || 50;
  
  let offset = (limit*size) - limit;
  const where = fn.getCondicion(req,Op);

  console.log(where.length)
  
  if (where.length != 0){
    marcas = await marcas_renovacion.findAndCountAll({
      where: where,
      offset: offset,
      limit: limit
    }).then(result => {
      return result
    });
  }else{
    marcas = await marcas_renovacion.findAndCountAll({
      offset: offset,
      limit: limit
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
                              page: limit, size: size });
 });

 module.exports = router