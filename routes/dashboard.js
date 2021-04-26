const { Router } = require('express');
const router = new Router();

const db = require('../db')

router.get('/dashboard',async (req,res) =>{
  marcas = await db.getMarcas();
  situacion = await db.getSituacion();
  clase = await db.getClase();
  clasificacion = await db.getClasificacion();
  res.render('dashboard.ejs', {marcas: marcas, situacion: situacion, clase: clase, clasificacion:clasificacion});
 });

 module.exports = router