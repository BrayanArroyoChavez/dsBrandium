const { fileLoader } = require("ejs");

const f = {};

//Función para cambiar el formato de fecha de dd/mm/yyyy a yyyy-mm-dd
function DateFormatmysql(string) {
    console.log(string)
    var date = string.split('/');
    finalDate = date[2] + '-' + date[1] + '-' + date[0];
    console.log(finalDate)
    return finalDate
  }

//Función para cambiar el formato de fecha de yyyy-mm-dd a dd/mm/yyyy 
function DateFormatmarca(string) {
  console.log(string)
  var date = string.split('-');
  finalDate = date[2] + '/' + date[1] + '/' + date[0];
  console.log(finalDate)
  return finalDate
}

//Se exportan las funciones
f.DateFormatmysql = DateFormatmysql
f.DateFormatmarca = DateFormatmarca

module.exports = f;