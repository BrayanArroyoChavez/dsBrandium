const { Router } = require('express');
const router = new Router();

var mysql      = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'kampsys'
});

connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
   
    console.log('connected as id ' + connection.threadId);
  });

router.get('/dashboard',async (req,res) =>{
  //SELECT DISTINCT(situacion_marca) FROM `marcas_renovacion`
    const marcas = await connection.query('SELECT * FROM `marcas_renovacion` where id < 7000', function (error, results, fields) {
        if (error) throw error;
        res.send({marcas: marcas});
      });
    res.render('dashboard.ejs');
 });

 module.exports = router