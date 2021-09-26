/*
Contrato: none => Mundo (No recibe nada, pero al llamarla me retorna un Mundo)
Propósito: Esta funcion va de la mano de juegoTerinado, pues se llama despues de esta función, y lo que hace es retornarme un Mundo con todo lo que tenía incialmente para así reiniciar el juego. Y finalmente me hace un loop(). Pues juego temrinado me hace un noLoop(). Así me permite vovler a iniciar el juego
Prototipo: juegoNuevo(){}
*/
function juegoNuevo() {
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

    comidas: [pegante, moradito, chontaduro, cocaCola],

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
    thiefActivo: false,
    //Ataque de Thief
    knife: [
      {
        x: 18,
        y: 10,
        pos: false,
      },
    ],
    start: true,
    retrasoComodines: 80,
    retrasoComidas: 50,
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
  loop();
}
//----------------------------------------------

/**
  SISTEMA DE CANCIONES:
  *Escenario1 => 0 => theLastOfUs
  *Escenario2 => 1 => within
  *Escenario3 => 2 => azure
  *Escenario4 => 3 => himno
  *Escenario5 => 4 => spider
*/

/*
Contrato: none=>function (No recibe nada como parametro pero me retorna una funcion)
Propósito: Parar la música dependiendo del escenario actual en que se encuentre, el sistema de canciones se encuentra arriba
Prototipo: paraMusica(){}
*/
function paraMusica() {
  if (Mundo.escenario == escenario1) {
    theLastOfUs.stop();
  } else if (Mundo.escenario == escenario2) {
    within.stop();
  } else if (Mundo.escenario == escenario3) {
    azur.stop();
  } else if (Mundo.escenario == escenario4) {
    himno.stop();
  } else if (Mundo.escenario == escenario5) {
    spider.stop();
  }
}

/*
Contrato: None => Funciton (No recibe nada como parametro pero me retorna funciones)
Propósito: Terminar el Juego cuando se llame en el gamescript. Esta funcion hace lo siguiente:
=> Llamar a la funcon paraMusica()
=>Empezar la musica llamada caminos
=> Colocar la imagen de game over
Prototipo:
Ejemplos:
*/
function juegoTerminado() {
  paraMusica();
  caminos.play();
  image(gameOverImage, 45, 100, 480, 350);
  // fill => color de relleno del texto
  fill('#723C70');
  //stroke => color del borde del texto
  stroke('#D9D6CF');
  //strokeWeight => Anchura del borde del texto
  strokeWeight(0.1);
  //textFont => Fuente que se usara
  textFont(myFontTwo);
  //Colocar el score en diferente posicion dependiedno si es un numero de dos digitos o de tres digitos, teniendo en cuenta que el score siempre sera un numero entero. Esto se hace debido a mejoras visuales.
  if (Mundo.score < 100) {
    text(Mundo.score, 390, 355);
  }
  if (Mundo.score >= 100) {
    text(Mundo.score, 410, 355);
  }
  //Hacer un noLoop() de todo el juego para que no me corra y es como si el juego haya terminado
  noLoop();
}

/*COSAS DEL SNAKE*/
/*
Contrato: snake,dir => function() ( Recibe una snake y la direccion de esta para retornarme una funcion de cons() )
Propósito: Actualiza la serpiente. Creando una nuevo cabeza y removiendo la cola.
  Me guarda en una constante la cabeza del snake y me hace un
Prototipo: moveSnake(snake,dir)
*/
function moveSnake(snake, dir) {
  const head = first(snake);
  return cons(
    { x: head.x + dir.x, y: head.y + dir.y },
    snake.slice(0, length(snake) - 1)
  );
}
