const { Router } = require('express');
const router = new Router();
const { Op, Sequelize } = require('sequelize');

const { marcas_renovacion } = require('../connection')
const fn = require('../public/js/dashboard.js')

router.all('/dashboard',async (req,res) =>{
  let size = req.query.page || 1;
  let page = req.query.limit || 50;
  
  const where = fn.getCondicion(req,Op);

  console.log(where)
  
  if (where != null){
    marcas = await marcas_renovacion.findAll({
      where: where
    });
  }else{
    marcas = await marcas_renovacion.findAll();
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
  res.render('dashboard.ejs', {marcas: marcas, situacion: situacion, clase: clase, clasificacion: clasificacion, 
                              page: req.params.page, size: size });
 });

 module.exports = router