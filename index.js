const express = require('express');
const morgan = require('morgan');
const app = express();

//Configuración
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views',__dirname + '/views');

app.use(express.static(__dirname + '/public'));

//middleware
app.use(morgan('dev'));

//Rutas
app.use(require('./routes/dashboard'));

//Conexión
app.listen(app.get('port'), () =>{
    console.log('servidor en el puerto', app.get('port'))
})