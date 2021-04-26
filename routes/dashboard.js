const { Router } = require('express');
const router = new Router();

const connection = require('../connection')

router.get('/dashboard',async (req,res) =>{
    const marcas = await connection.query('SELECT * FROM `marcas_renovacion` where id < 7000', function (error, results, fields) {
        if (error) throw error;
        res.render('dashboard.ejs', {marcas: results});
      });
 });

 module.exports = router