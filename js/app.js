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
    var filas = $([col1.eq(pos),col2.eq(pos),col3.eq(pos),col4.eq(pos),col5.eq(pos),col6.eq(pos),col7.eq(pos)]);
  }else{
    pos= "";
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
//Puntuacion de las combinaciones
function marcador(valores){
  var puntaje = Number($("#score-text").text());
  switch (valores) {
    case 3:
      puntaje +=30;
      break;
      case 4:
      puntaje +=60;
      break;
      case 5:
      puntaje +=80;
      break;
      case 6:
      puntaje +=110;
      break;
      case 7:
      puntaje +=150;
  }
  $("#score-text").text(puntaje);
}

//Impresion de caramelos en pantalla
function llenado(){
  llenarTablero();
}
function llenarTablero(){
  var num = 6;
  var columnas = $("[class^='col-']");
  columnas.each(function(){
    var caramelos = $(this).children().length;
    var agregar=num-caramelos;
    for(i=0;i<agregar;i++){
      var tipoCaramelo = numerosAleatorios(1,5);
      if(i === 0 && caramelos<1){
        $(this).append('<img src="image/' + tipoCaramelo + '.png" class="element"></img>');
      }else{
        $(this).find('img:eq(0)').before('<img src="image/'+tipoCaramelo + '.png" class="element"></img>');
      }
    }
  });
  eventosCaramelos();
  validaciones();
}
function validaciones(){
  validacionColumnas();
  validacionFilas();
  if($("img.delete").length !== 0){
    eliminarCaramelos();
  }
}
//Eventos de movimientos
function eventosCaramelos(){
  $("img").draggable(
    { zIndex: 10,
      containment:".panel-tablero",
      droppable:"img",
      revert: true,
      revertDuration: 600,
      drag:movimientosCaramelos,
      grid:[100,100]
    });
    $("img").droppable(
      {drop:intercambio}
    );
    habilitarEventos();
}
function habilitarEventos(){
  $("img").draggable("enable");
  $("img").droppable("enable");
}
function deshabilitarEventos(){
  $("img").draggable("disable");
  $("img").droppable("disable");
}
function movimientosCaramelos(event,carameloCaptura){
  carameloCaptura.position.top = Math.min(100, carameloCaptura.position.top);
  carameloCaptura.position.bottom = Math.min(100, carameloCaptura.position.bottom);
  carameloCaptura.position.left = Math.min(100, carameloCaptura.position.left);
  carameloCaptura.position.right = Math.min(100, carameloCaptura.position.right);
}
function intercambio(event, carameloCaptura){
  var carameloCaptura = $(carameloCaptura.draggable);
  var tipoCaptura = carameloCaptura.attr("src");
  var carameloSoltar = $(this);
  var tipoSoltar = carameloSoltar.attr("src");
  carameloCaptura.attr("src",tipoCaptura);
  carameloSoltar.attr("src",tipoSoltar);
  setTimeout(function (){
    llenado();
    if($("img.delete").length === 0){
      carameloCaptura.attr("src",tipoCaptura);
      carameloSoltar.attr("src",tipoSoltar);
    }else{
      cargarAcciones();
    }
  },600);
}
function validarLlenado(validador){
  if(validador){
    llenado();
  }
}
//Tablero de puntucaiones
function cargarAcciones(){
  var momentoX = Number($("#movimientos-text").text());
  var resultado = momentoX += 1;
  $("#movimientos-text").text(result);
}
//ellimincion de elementos del Tablero
function eliminacionTablero(){
  deshabilitarEventos();
  $("img.delete").effect("pulsate",400);
  $("img.delete").animate(
    {opacity: "0"},
  {duration:300})
  .animate(
    {opacity:"0"},
  {duration: 400,
  complete: function(){
    borrarCaramelo().then(validarLlenado).catch(validarError);
  },queue:true});
}
function validarError(error){
  console.log(error);
}
function borrarCaramelo(){
  return new Promise(function(resolve,reject){
    if($("img.delete").remove()){
      resolve(true);
    }else{
      reject("Caramelo no eliminado");
    }
  });
}
function finJuego(){
  $('div.panel-tablero, div.time').effect('fold');
	$('h1.main-titulo').addClass('title-over')
		.text('Gracias por jugar!');
	$('div.score, div.moves, div.panel-score').width('100%');
}
//Cargue del DOM
function init(){
  tituloParpadeo(".main-titulo");

  $('.btn-reinicio').click(function () {
		if ($(this).text() === 'Reiniciar') {
			location.reload(true);
		}
    llenado();
		$(this).text('Reiniciar');
		$('#timer').startTimer({
			onComplete: finJuego
		})
	});
}
$(function(){
  init();
});
