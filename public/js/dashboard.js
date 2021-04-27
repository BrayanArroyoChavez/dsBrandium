const fn = {};

//Función para cambiar la cantidad de registros que se muestran por página
function changeAction(val){
    $("#size").attr("action",val);
    $("#size").submit();
}

//Función para establecer las condiciones de filtrado
function getCondicion(req){
    condicion = "";
    if (req.body.sMarca != 1 && req.body.sMarca != undefined){
        console.log("Situación de la marca: " + req.body.sMarca);
        if (condicion == ""){
          condicion += "situacion_marca = '" + req.body.sMarca + "'";
        }else{
          condicion += " AND situacion_marca = '" + req.body.sMarca + "'";
        }
    }
    if (req.body.ncnMarca != 1 && req.body.ncnMarca != undefined){
        console.log("Número de clasificación: " + req.body.ncnMarca);
        if (condicion == ""){
          condicion += "clasificacion_niza = " + req.body.ncnMarca;
        }else{
          condicion += " AND clasificacion_niza = " + req.body.ncnMarca;
        }
    }
    if (req.body.ncMarca != 1 && req.body.ncMarca != undefined){
        console.log("Número de marca: " + req.body.ncMarca);
        if (condicion == ""){
          condicion += "clase_marca = " + req.body.ncMarca;
        }else{
          condicion += " AND clase_marca = " + req.body.ncMarca;
        }
    }
    if(req.body.telefono && req.body.telefono){
        if (condicion == ""){
          condicion += "((telefono_solicitante != '' OR telefono_representante != '') OR (correo_solicitante != '' OR correo_representante != ''))";
        }else{
          condicion += " AND ((telefono_solicitante != '' OR telefono_representante != '') OR (correo_solicitante != '' OR correo_representante != ''))";
        }
    }else{
        if (req.body.telefono){
          console.log("Teléfono: " + req.body.telefono);
          if (condicion == ""){
            condicion += "(telefono_solicitante != '' OR telefono_representante != '')";
          }else{
            condicion += " AND (telefono_solicitante != '' OR telefono_representante != '')";
          }
        }
        if (req.body.correo){
          console.log("Correo:" + req.body.correo);
          if (condicion == ""){
            condicion += "(correo_solicitante != '' AND correo_representante != '')";
          }else{
            condicion += " AND (correo_solicitante != '' OR correo_representante != '')";
          }
        }
    }

    return condicion;
}

fn.getCondicion = getCondicion

module.exports = fn;