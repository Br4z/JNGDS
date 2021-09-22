

//Juego nuevo
function juegoNuevo(){
  Mundo = {
    //Determinar la  posicion que aparecera el Snake
    snake: [
      { x: columnas / 2, y: filas / 2 },
      { x: columnas / 2 - 1, y: filas / 2 },
      { x: columnas / 2 - 2, y: filas / 2 },
    ],
    //Escenario
    escenario: escenario1,
    //Direccion por la que empieza el Snake
    dir: derecha,
    //Enermigos
    listaEnemigos,
    //Posicion de la Comida (Será Random)
    food: {
      x: int(getRandom(2, 26)), //28
      y: int(getRandom(4, 25)), //26
    },
    // cuadradoFinal: {
    //   x: 0,
    //   y: 0,
    // },
    //Puntacion Inicial
    score: 0,

    /* FUNCIONAMIENTO DE COMODIN
      nombreComodin: {
        x: PosX;
        y: PosY;
        tiempoAccionado: Tiempo que dibujar
        tiempoActivo: Tiempo que dura en el mapa
        TiempoDesactivo: Tiempo en el cual no esta en el mapa
      }
     */

    comodines: [
      comodinVelocidad,
      comodinInvencibilidad,
      comodinRegeneracion,
      comodinVidaMas,
      comodinInversion,
      comodinTombos,
      comodinReduccionPuntos,
      comodinGolpeAccionado,
      comodinAleatorio,
    ],

    //Numero de vidas inicial
    lives: 3,
    //El tiempo
    timer: int(millis() / 1000),
    //Jefe Thief
    Thief: {
      x: 26,
      y: 13,
      dirx: true,
      diry: true,
    },
    //Ataque de Thief
    knife: [
      {
        x: 18,
        y: 10,
        pos: false,
      },
    ],
    retrasoComodines: 80,
    scoreMas: 1,
    activosMiniEnemigos: false,
    imagenActualCabeza: cabeza_derecha_normal,
    imagenActualCola: cola_normal,
    retrasoCola: 3,
    contadorCola: 3,
    normalActivo: true,
    vendedorActivo: false,
    neroActivo: false,
    policiaActivo: false,
    politicoActivo: false,
  };
  loop()
}
//JUEGO TERMINADO
// function cuadradoFinal(){
//     // fill(240, 240, 240);
//     // //Stroke => color de los bordes
//     // stroke(10, 10, 10);
//     // //StrokeWeight => Define el ancho
//     // strokeWeight(4);
//     rect(
// 			Mundo.cuadradoFinal.x * lado,
// 			Mundo.cuadradoFinal.y * lado,
// 			lado,
// 			lado
// 		);
// }
function juegoTerminado(){
  // window.vidasOficial = 0;
  // textAlign(CENTER, CENTER);
  // textSize(50);
  // text(' Has perdido', width / 2, height / 2); //advertencia que se muestra en pantalla en caso de que la serpiente se choque.
  image(gameOverImage, 45, 100, 480, 350);
  // fill => color de relleno del texto
  fill('#0E0D0D');
  //stroke => color del borde del texto
  stroke('#D9D6CF');
  strokeWeight(0.1);
  textFont(myFontTwo);
  text(Mundo.score, 358, 355);
  // textSize(26);
  // text('Pulsa cualquier tecla para continuar', width / 2, height / 1.2);
  // textSize(12);
  noLoop();
}

  /*COSAS DEL SNAKE*/
  // TODO Movimiento de la serpiente
  // TODO Actualiza la serpiente. Creando una nuevo cabeza y removiendo la cola.
function moveSnake(snake, dir) {
  const head = first(snake);
  return cons(
    { x: head.x + dir.x, y: head.y + dir.y },
    snake.slice(0, length(snake) - 1)
  );
}