// LIBRERIA KEYPRESS
/*
  Las funciones e implementaciones vistas en este documento son utilizadas a traves de la libreria KeyPress. Decidimos utilizar esta libreria para implementar trucos en el juego a traves de secuencias en el teclado.
*/

//Variable de configuracion
const configTeclado = { prevent_repeat: true };
//True significa que debemos ir pulsando cada vez, por ejemplo es util para un juego de disparos

//Evento Listener
const eventoTeclado = new window.keypress.Listener(this, configTeclado);

//FUNCIONES
/*
Contrato: none=>function (No recibe ningun parametro pero retorna una funcion)
Propósito: Subir el Score mas diez puntos
Prototipo: SubeScore()
*/

function SubeScore() {
  update(Mundo, (Mundo.score = Mundo.score + 10));
}
/*
Contrato: none=>function (No recibe ningun parametro pero retorna una funcion)
Propósito: Llamar a la funcion juegoNuevo, debidamente documentada en terminarEmpezar.js
Prototipo: jugarDeNuevo()
*/
function jugarDeNuevo() {
  if (!isLooping()) {
    juegoNuevo();
  }
}

//Eventos si cumples la funcion
//Esta funcion recibe dos parametros : La secuencia a realizar (si es un sequence_combo) o la tecla a presionar (si es un simple_combo) y la funcion a retornar cuando realice la secuencia u oprima la tecla requerida
eventoTeclado.sequence_combo('up down down left right up up', SubeScore);
eventoTeclado.simple_combo('enter', jugarDeNuevo);
