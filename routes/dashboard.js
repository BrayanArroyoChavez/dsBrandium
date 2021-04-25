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
    const marcas = await connection.query('SELECT * FROM `marcas_renovacion`', function (error, results, fields) {
        if (error) throw error;
        res.render('dashboard.ejs', {marcas: results});
      });
 });

 module.exports = router