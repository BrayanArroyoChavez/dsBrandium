//Se hace uso de la constante fn para almacenar las funciones y posteriormente exportarlas
const fn = {};

//Función para establecer las condiciones de filtrado
function getCondicion(req, Op){
    where = [];
    if (req.query.Situacion != 'null' && req.query.Situacion){
      where.push({situacion_marca : req.query.Situacion});
    }
    if (req.query.Clasificacion != 'null' && req.query.Clasificacion){
      where.push({clasificacion_niza : req.query.Clasificacion});
    }
    if (req.query.Clase != 'null' && req.query.Clase){
      where.push({clase_marca : req.query.Clase});
    }
    if (req.query.Marca != 'null' && req.query.Marca){
      where.push({nombre_marca : req.query.Marca});
    }
    if (req.query.n_solicitante != 'null' && req.query.n_solicitante){
      where.push({nombre_solicitante : {[Op.substring] : req.query.n_solicitante}});
    }
    if (req.query.n_representante != 'null' && req.query.n_representante){
      where.push({nombre_representante : {[Op.substring] : req.query.n_representante}});
    }
    if (req.query.m_solicitante != 'null' && req.query.m_solicitante){
      where.push({municipio_solicitante : {[Op.substring] : req.query.m_solicitante}});
    }
    if (req.query.m_representante != 'null' && req.query.m_representante){
      where.push({ciudad_representante : {[Op.substring] : req.query.m_representante}});
    }
  
    if(req.query.telefono != undefined && req.query.correo != undefined){
      console.log(req.query.telefono)
      where.push({
        [Op.or] : [
          {[Op.or] : [{ telefono_solicitante: {[Op.not]:""} },{ telefono_representante: {[Op.not]:""} }]},   
          {[Op.or] : [{ correo_solicitante: {[Op.not]:""} },{ correo_representante: {[Op.not]:""} }]}
      ]})
    }else{
      if (req.query.Telefono != undefined){
        where.push({
          [Op.or] : [
            { telefono_solicitante: {[Op.not]:""} },
            { telefono_representante: {[Op.not]:""} }
        ]})
        //where.telefono_solicitante =  {[Op.not]:""};
        //where.telefono_representante =  {[Op.not]:""};
      }
      if (req.query.Correo != undefined){
        where.push({
          [Op.or] : [
            { correo_solicitante: {[Op.not]:""} },
            { correo_representante: {[Op.not]:""} }
        ]})
        //where.correo_solicitante =  {[Op.not]:""};
        //where.correo_representante =  {[Sequelize.Op.not]:""};
      }
    }  
    return where;
}

//Función para determinar los filtros que se aplicaron
function getFiltro(req){
  filter = {};
  if (req.query.Situacion != 'null' && req.query.Situacion){
    filter.situacion = req.query.Situacion;
  }
  if (req.query.Clasificacion != 'null' && req.query.Clasificacion){
    filter.clasificacion = req.query.Clasificacion;
  }
  if (req.query.Clase != 'null' && req.query.Clase){
    filter.clase = req.query.Clase;
  }
  if (req.query.Telefono != undefined){
    filter.telefono = req.query.Telefono;
  }
  if (req.query.Correo != undefined){
    filter.correo = req.query.Correo;
  }
  return filter;
}

//Se exportan las funciones
fn.getCondicion = getCondicion
fn.getFiltro = getFiltro

module.exports = fn;