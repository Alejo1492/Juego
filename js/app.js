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
