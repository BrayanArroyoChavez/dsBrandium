//Se importa la función para cambiar el formato de fecha solicitado por mysql
const f = require('./fecha')

//Se hace uso de la constante fn para almacenar las funciones y posteriormente exportarlas
const fn = {};

//Función para establecer las condiciones de filtrado
function getCondicion(req, Op){
    where = [];
    where.push({band_completo : 1});
    if (req.query.fsStart != 'null' && req.query.fsStart && req.query.fsEnd != 'null' && req.query.fsEnd){
      where.push({fecha_solicitud : {[Op.between] : [f.DateFormatmysql(req.query.fsStart), f.DateFormatmysql(req.query.fsEnd)]}});
    }else{
     if( req.query.fsStart != 'null' && req.query.fsStart){
      where.push({fecha_solicitud : {[Op.gte] : f.DateFormatmysql(req.query.fsStart)}});
     }else{
       if(req.query.fsEnd != 'null' && req.query.fsEnd){
        where.push({fecha_solicitud : {[Op.lte] : f.DateFormatmysql(req.query.fsEnd)}});
       }
     }
    }
    if (req.query.frStart != 'null' && req.query.frStart && req.query.frEnd != 'null' && req.query.frEnd){
      where.push({fecha_registro : {[Op.between] : [f.DateFormatmysql(req.query.frStart), f.DateFormatmysql(req.query.frEnd)]}});
    }else{
      if( req.query.frStart != 'null' && req.query.frStart){
       where.push({fecha_registro : {[Op.gte] : f.DateFormatmysql(req.query.frStart)}});
      }else{
        if(req.query.frEnd != 'null' && req.query.frEnd){
          where.push({fecha_registro : {[Op.lte] : f.DateFormatmysql(req.query.frEnd)}});
         }
      }
     }
    if (req.query.situacion){
      where.push({situacion_marca : req.query.situacion});
    }
    if (req.query.clasificacion){
      where.push({clasificacion_niza : req.query.clasificacion});
    }
    if (req.query.dpi){
      where.push({tipo_dpi : req.query.dpi});
    }
    if (req.query.tipo_marca){
      where.push({tipo_marca : req.query.tipo_marca});
    }
    if (req.query.clase){
      where.push({clase_marca : req.query.clase});
    }
    if (req.query.marca){
      where.push({nombre_marca : {[Op.substring] : req.query.marca}});
    }
    if (req.query.n_solicitante){
      where.push({nombre_solicitante : {[Op.substring] : req.query.n_solicitante}});
    }
    if (req.query.n_representante){
      where.push({nombre_representante : {[Op.substring] : req.query.n_representante}});
    }
    if (req.query.m_solicitante){
      where.push({municipio_solicitante : {[Op.substring] : req.query.m_solicitante}});
    }
    if (req.query.m_representante){
      where.push({ciudad_representante : {[Op.substring] : req.query.m_representante}});
    }
    if (req.query.telefono_solicitante != undefined){
      where.push({telefono_solicitante : {[Op.not]:""}});
    }
    if (req.query.telefono_representante != undefined){
      where.push({telefono_representante : {[Op.not]:""}});
    }
    if (req.query.correo_solicitante != undefined){
      where.push({correo_solicitante : {[Op.not]:""}});
    }
    if (req.query.correo_representante != undefined){
      where.push({correo_representante   : {[Op.not]:""}});
    }
    if(req.query.contacto != undefined){
      where.push({
        [Op.or] : [
          {[Op.or] : [{ telefono_solicitante: {[Op.not]:""} },{ telefono_representante: {[Op.not]:""} }]},   
          {[Op.or] : [{ correo_solicitante: {[Op.not]:""} },{ correo_representante: {[Op.not]:""} }]}
      ]});
    }  
    return where;
}

//Función para determinar los filtros que se aplicaron
function getFiltro(req){
  filter = {};
  if (req.query.situacion){
    filter.situacion = req.query.situacion;
  }
  if (req.query.clasificacion){
    filter.clasificacion = req.query.clasificacion;
  }
  if (req.query.dpi){
    filter.dpi = req.query.dpi;
  }
  if (req.query.tipo_marca){
    filter.tipo_marca = req.query.tipo_marca;
  }
  if (req.query.clase){
    filter.clase = req.query.clase;
  }
  if (req.query.telefono_solicitante != undefined){
    filter.telefono_solicitante = req.query.telefono_solicitante;
  }
  if (req.query.telefono_representante != undefined){
    filter.telefono_representante = req.query.telefono_representante;
  }
  if (req.query.correo_solicitante != undefined){
    filter.correo_solicitante = req.query.correo_solicitante;
  }
  if (req.query.correo_representante != undefined){
    filter.correo_representante = req.query.correo_representante;
  }
  if (req.query.contacto != undefined){
    filter.contacto = req.query.contacto;
  }
  return filter;
}

//Se exportan las funciones
fn.getCondicion = getCondicion
fn.getFiltro = getFiltro

module.exports = fn;