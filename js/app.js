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

$(function(){
  tituloParpadeo(".main-titulo");
});
