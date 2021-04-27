const { Router } = require('express');
const router = new Router();

const db = require('../db')
const fn = require('../public/js/dashboard.js')

router.all('/dashboard/:page/:size',async (req,res) =>{
  let size = req.params.size;
  let page = (req.params.page * size) - size;

  let condicion = fn.getCondicion(req);
  
  marcas = await db.getMarcas(page, size, condicion);
  situacion = await db.getSituacion();
  clase = await db.getClase();
  clasificacion = await db.getClasificacion();
  res.render('dashboard.ejs', {marcas: marcas, situacion: situacion, clase: clase, clasificacion: clasificacion, page: req.params.page, size:size});
 });

 module.exports = router