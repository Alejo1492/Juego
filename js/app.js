//Fucncion para el cambio de color del titulo
function tituloParpadeo(elemento){
  blanco(elemento);
  function blanco(elemento){
    $(elemento).animate(
      {opacity:"1"},
      700,
      function(){
        $(elemento).css("color","white");
        amarillo(elemento);
      });}
  function amarillo(elemento){
    $(elemento).animate(
      {opacity:"1"},
      700,
      function(){
        $(elemento).css("color","yellow");
        blanco(elemento);
      });}
}
//Numeros aleatorios
function numerosAleatorios(numero1,numero2){
  numero1 = Math.ceil(numero1);
  numero2 = Math.floor(numero2);
  return Math.floor(Math.random()*(numero2 - numero1))+numero1;
}
//Filas y columnas del tablero
function obtenerPosicion(tipo, pos){
  var col1 = $(".col-1").children();
  var col2 = $(".col-2").children();
  var col3 = $(".col-3").children();
  var col4 = $(".col-4").children();
  var col5 = $(".col-5").children();
  var col6 = $(".col-6").children();
  var col7 = $(".col-7").children();

  var columnas = $([col1,col2,col3,col4,col5,col6,col7]);
  if(typeof pos === "number"){
    var filas = $([col1.eq(pos),col2.eq(pos),col3.eq(pos),col4.eq(pos),
      col5.eq(pos),col6.eq(pos),col7.eq(pos)]);
  }else{
    pos="";
  }
  if(tipo === "columna"){
    return columnas;
  }else if(tipo === "fila" && pos !== ""){
    return filas;
  }
}
//filas
function filas(pos){
  var fila = obtenerPosicion("fila",pos);
  return fila;
}
//columnas
function columnas(pos){
  var columna = obtenerPosicion("columna");
  return columna[pos];
}
$(function(){
  tituloParpadeo(".main-titulo");
});
//Emparejamiento de caramelos Columnas
function validacionColumnas(){
  for(var ii=0;ii<7;ii++){
    var contador = 0;
    var posicion = [];
    var posicion2 = [];
    var columna = columnas(ii);
    var comparacion = columna.eq(0);
    var x = false;
    for(var i=1;i<columna.length;i++){
      var imgComparacion = comparacion.attr("src");
      var caramelo = columna.eq(i).attr("src");
      if(imgComparacion != caramelo){
        if(posicion.length >= 3){
          x = true;
        }else{
          posicion = [];
        }
        contador = 0;
      }else{
        if(contador == 0){
          if(!x){
            posicion.push(i-1);
          }else{
            posicion2.push(i-1);
          }
        }
        if(!x){
          posicion.push(i);
        }else{
          posicion2.push(i);
        }
        contador +=1;
      }
      comparacion = columna.eq(1);
    }
    if(posicion2.length > 2){
      posicion = $.merge(posicion,posicion2);
    }
    if(posicion.length <=2){
      posicion=[];
    }
    puntajeConteo = posicion.lenght;
    if(puntajeConteo >=3){
      combinarColumna(posicion,columna);
      marcador(puntajeConteo);
    }
  }
}
function combinarColumna(posicion,columna){
  for(var i=0;i<posicion.length;i++){
    columna.eq(posicion[i].addClass("delete"));
  }
}
//Emparejamiento de caramelos Filas
function validacionFilas(){
  for (var i=0;i<6;i++){
    var contador = 0;
    var posicion = [];
    var posicion2 = [];
    var fila = filas(i);
    var comparacion = fila[0];
    var x = false;
    for(var ii = 1; ii<fila.lenght;ii++){
      var imgComparacion = comparacion.attr("src");
      var caramelo = fila[i].attr("src");

      if(imgComparacion != caramelo){
        if(posicion.length>=3){
          x=true;
        }else{
          posicion=[];
        }
        contador=0;
      }else{
        if(contador == 0){
          if(!x){
            posicion.push(i-1);
          }else{
            posicion2.push(i-1);
          }
        }
        if(!x){
          posicion.push(i);
        }else{
          posicion2.push(i);
        }
        contador +=1;
      }
      comparacion = fila[i];
    }
    if(posicion2.length>2){
      posicion = $.merge(posicion,posicion2);
    }
    if(posicion.length<=2){
      posicion=[];
    }
    puntajeConteo = posicion.length;
    if(puntajeConteo >=3){
      borrarFilas(posicion,fila);
      marcador(puntajeConteo);
    }
  }
}
function borrarFilas(posicion,fila){
  for(var i=0;i<posicion.length;i++){
    fila[posicion[i]].addClass("delete");
  }
}
function validaciones(){
  validacionColumnas();
  validacionFilas();
  //if($("img.delete").length !== 0){
    //eliminarCaramelos();
  //}
}
