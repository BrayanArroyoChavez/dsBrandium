//Dependencias 
const express = require('express');
const morgan = require('morgan');
const app = express();

//Conexión a la base de datos
require('./connection')

//Configuración
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views',__dirname + '/views');

app.use(express.json());
app.use(express.urlencoded());

app.use(express.static(__dirname + '/public'));

//middleware
app.use(morgan('dev'));

//Rutas
app.use(require('./routes/routes'));

//Conexión al servidor
app.listen(app.get('port'), () =>{
    console.log('servidor en el puerto', app.get('port'))
})