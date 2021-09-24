//Variable de configuracion
const configTeclado = { prevent_repeat : true };
//True significa que debemos ir pulsando cada vez, por ejemplo es util para un juego de disparos

//Evento Listener
const eventoTeclado = new window.keypress.Listener(this,configTeclado);

//Funciones
function SubeScore() {
  update(Mundo,Mundo.score=Mundo.score+10);
}
function jugarDeNuevo() {
  if (!isLooping()) {
    juegoNuevo();
  }
}
//Eventos si cumples la funcion
eventoTeclado.sequence_combo('up down down left right up up', SubeScore);
eventoTeclado.simple_combo('enter', jugarDeNuevo);
