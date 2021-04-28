//Dependencias 
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser')
const app = express();

//Configuración
require('./connection')

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views',__dirname + '/views');

app.use(express.json());
app.use(express.urlencoded());

app.use(express.static(__dirname + '/public'));

//middleware
app.use(morgan('dev'));

//Rutas
app.use(require('./routes/dashboard'));

//Conexión
app.listen(app.get('port'), () =>{
    console.log('servidor en el puerto', app.get('port'))
})