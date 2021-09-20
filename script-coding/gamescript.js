/*INTRODUCCION*/

// Importar Funcional Light
let { append, cons, first, isEmpty, isList, length, rest, map, forEach } = functionalLight;

// Actualiza los atributos del objeto y retorna una copia profunda.
function update(data, attribute) {
  return Object.assign({}, data, attribute);
}

// Mundo inicial
let Mundo = {};

// Constantes para las escalas del canvas
const columnas = 28;
const filas = 26;
const lado = 20;
const ancho_canvas = columnas * lado;
const alto_canvas = filas * lado;
//let canvas; TODO DEBERIA BORRARSE?

// Medidas Actuales:
// ANCHO: 560  -------  // ALTO: 520

// Constantes de control.
let arriba;
let abajo;
let derecha;
let izquierda;

/* Constante de juego: */
//El puntaje del personaje:
let score;
//Contador de vidas:
let countLives = 3;
//Imagen de fondo del canvas:
let fondo;


/**COSAS DE COMODINES
 *
 */

// const comodinVelocidad = function(x,y){
//   this.x = x;
//   this.y = y;


//   this.nombreFuncion = function(){
//     return 0;
//   }
//   //ejemplo para llamarla al onTic
//   //Mundo.comodinVelocidad.nombreFuncion()
// }
/* INICIALIZARLA
const velocidad = new comodinVelocidad();
*/



const comodin = function(x,y, tiempoActivo){
  this.x = x;
  this.y = y;

  if (tiempoActivo == null){
    tiempoActivo == 0;
  }

  this.tiempoActivo = tiempoActivo;
  this.tiempoAccionado = 0;
  this.tiempoDesactivo = tiempoRandom(30, 50);
  //this.ordenAleatorio = tiempoRandom(1,8)
}
/*
x: int(getRandom(0,28)) ,  //28
y: int(getRandom(4,26)), //26
*/

const comodinVelocidad = new comodin(getRandom(2,26),getRandom(4,25),40);
const comodinInvencibilidad = new comodin(-1, -1);
const comodinRegeneracion = new comodin(-1, -1);
const comodinVidaMas = new comodin(-1, -1);
const comodinInversion = new comodin(-1, -1);
const comodinTombos = new comodin(-1, -1);
const comodinReduccionPuntos = new comodin(-1, -1);
const comodinGolpeAccionado = new comodin(-1, -1);
const comodinAleatorio = new comodin(-1, -1);


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
  };
  loop()
}
//JUEGO TERMINADO
function juegoTerminado(){
    window.vidasOficial = 0;
    textAlign(CENTER, CENTER);
    textSize(50);
    text(' Has perdido', width / 2, height / 2);//advertencia que se muestra en pantalla en caso de que la serpiente se choque.
    text(Mundo.score, width / 2, height / 1.5);
    textSize(12);
    noLoop()
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
//TODO Movimiento 2
function moveSnake2(snake, dir) {
  const head = first(snake);
  head.x = head.x-0.5;
  head.y = head.y-0.5;
  return cons(
    { x: head.x + dir.x, y: head.y + dir.y },
    snake.slice(0, length(snake) - 1)
  );
}

// TODO Dibujar la comida
function drawFood(food) {
  fill('crimson');
  rect(food.x * lado, food.y * lado, lado, lado);
}

// TODO Dibujar el Comodin #1
function drawComodin(comodin, color) {
  fill(color);
  rect(comodin.x * lado, comodin.y * lado, lado, lado);
}

/* SETUP  ==> SE LLAMA ANTES DE INICIALIZAR EL JUEGO*/

function setup() {
  frameRate(2);
  drawfondo();
  windowRezired();
  direcciones();

  //Actualizar el Mundo, colocando lo que va a tener una vez se inicie el Juego
  Mundo = {
    //Determinar la  posicion que aparecera el Snake
    snake: [
      { x: columnas / 2, y: filas / 2 },
      { x: columnas / 2 - 1, y: filas / 2 },
      { x: columnas / 2 - 2, y: filas / 2 },
    ],
    //Escenario
    escenario : escenario1,
    //Direccion por la que empieza el Snake
    dir: derecha,
    //Enermigos
    listaEnemigos,
    //Posicion de la Comida (Será Random)
    food: {
      x: int(getRandom(2,26)) ,  //28
      y: int(getRandom(4,25)), //26
    },
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
        pos:false,
      },
    ],
    retrasoComodines: 80,
    scoreMas: 1,
    activosMiniEnemigos: false,
  };
}


//----------------------------------------------
//LISTA DE MINIENEMIGOS
const enemigo1 = new enemigo(getRandom(2,26),getRandom(5,25));
const enemigo2 = new enemigo(getRandom(2,26),getRandom(5,25));
const enemigo3 = new enemigo(getRandom(2,26),getRandom(5,25));
listaEnemigos = [];
listaEnemigos = actualizaLista(listaEnemigos,enemigo1);
listaEnemigos = actualizaLista(listaEnemigos,enemigo2);
listaEnemigos = actualizaLista(listaEnemigos,enemigo3);

//--------------------------------------------
function compruebaTablero(){
  if ((Mundo.escenario == escenario1)) {
    forEach2(Mundo.escenario, (row, i) => {
      forEach2(row, (cell, j) => {
        coloreaTablero1(i, cell, j);
      });
    });
  } else if ((Mundo.escenario == escenario2)) {
    forEach2(Mundo.escenario, (row, i) => {
      forEach2(row, (cell, j) => {
        coloreaTablero2(i, cell, j);
      });
    });
  }else if ((Mundo.escenario == escenario3)) {
    forEach2(Mundo.escenario, (row, i) => {
      forEach2(row, (cell, j) => {
        coloreaTablero3(i, cell, j);
      });
    });}
    else if ((Mundo.escenario == escenario4)) {
    forEach2(Mundo.escenario, (row, i) => {
      forEach2(row, (cell, j) => {
        coloreaTablero4(i, cell, j);
      });
    });}else {
    return null;
  }
}
//--------------------------------------------
/* DRAWGAME : DIBUJAR EN EL CANVAS LO QUE QUIERAS HACER*/
function drawGame(Mundo) {
  //Definir el background del Canvas
  background(fondo);
  //Llamar a drawUi
  drawUi();
  compruebaTablero();

  //Enemigos
  // dibujaEnemigo(Mundo.listaEnemigos)
  //Fill => Color de relleno
  fill(240, 240, 240);
  //Stroke => color de los bordes
  stroke(10, 10, 10);
  //StrokeWeight => Define el ancho
  strokeWeight(4);
  //Dibuja la comida en una posicion random
  drawFood(Mundo.food);
  //Esta funcion dibuja al snake
  forEach(Mundo.snake, (s) => {
    rect(
        constrain(s.x,1,columnas-2) * lado,
        constrain(s.y,4,filas-2 )* lado,
      lado,
      lado
      );
  });

  //TODO REVISAR ESTE FILL
  fill('white');
  //Dibujar a thief
  drawThief(Mundo.Thief);
  //Dibujar Knife
  drawKnife(Mundo.knife);

  frameRate(7);

  //DIBUJA COMODINES
  if (Mundo.comodines[0].tiempoActivo > 0){
    drawComodin(Mundo.comodines[0], "yellow");
  }
  if (Mundo.comodines[1].tiempoActivo > 0){
    drawComodin(Mundo.comodines[1], "purple");
  }

  if (Mundo.comodines[2].tiempoActivo > 0){
    drawComodin(Mundo.comodines[2], "orange");
  }
  if (Mundo.comodines[3].tiempoActivo > 0){
    drawComodin(Mundo.comodines[3], "black");
  }
  if (Mundo.comodines[4].tiempoActivo > 0){
    drawComodin(Mundo.comodines[4], "white");
  }
  if (Mundo.comodines[5].tiempoActivo > 0){
    drawComodin(Mundo.comodines[5], "brown");
  }
  if (Mundo.comodines[6].tiempoActivo > 0){
    drawComodin(Mundo.comodines[6], "pink");
  }
  if (Mundo.comodines[7].tiempoActivo > 0){
    drawComodin(Mundo.comodines[7], "gray");
  }
  if (Mundo.comodines[8].tiempoActivo > 0){
    drawComodin(Mundo.comodines[8], "#eb34d8");
  }

}

/* TODO DIRECCIONES DEL SNAKE */
function direcciones() {
  abajo = createVector(0, 1);
  arriba = createVector(0, -1);
  izquierda = createVector(-1, 0);
  derecha = createVector(1, 0);
}


/* POSICIONAR LA COMIDA DE FORMA ALEATORIA */
function posicionarComida() {
  comida = createVector(int(random(columnas)), int(random(filas)));
}

//------------------------------------
function cambioTablero() {
  if (Mundo.score == 10) {
    update(Mundo, (Mundo.escenario = escenario2));
  }if(Mundo.score == 15){
    update(Mundo,(Mundo.escenario = escenario3));
  }if (Mundo.score == 20) {
    update(Mundo, (Mundo.escenario = escenario4));
  }
}
//------------------------------------



/* ONTIC */
//OnTic: Esto se ejecuta en cada tic del reloj. Con esto se pueden hacer animaciones. La velocidad de ejecución del onTic depende del frameRate.
function onTic(Mundo) {

  //Tablero
  cambioTablero();

  //Enemigo
  // mueveEnemigo(Mundo.listaEnemigos);

  //Cada condicional representa una respectiva situación, por lo que actualiza el Mundo de una cierta manera.
  //console.log(Mundo.snake[0]);
  let invencibilidad = true;
  let golpeAccionado = false;
  // console.log(Mundo.snake[0].y,"jswjsj",Mundo.snake[0].x)
  if (Mundo.comodines[4].tiempoAccionado > 0){
    abajo = createVector(0, -1);
    arriba = createVector(0, 1);
    izquierda = createVector(1, 0);
    derecha = createVector(-1, 0);

  } else {
    abajo = createVector(0, 1);
    arriba = createVector(0, -1);
    izquierda = createVector(-1, 0);
    derecha = createVector(1, 0);
  }

  if (Mundo.comodines[4].tiempoAccionado > 0){
    abajo = createVector(0, -1);
    arriba = createVector(0, 1);
    izquierda = createVector(1, 0);
    derecha = createVector(-1, 0);

  } else {
    abajo = createVector(0, 1);
    arriba = createVector(0, -1);
    izquierda = createVector(-1, 0);
    derecha = createVector(1, 0);
  }


  if (Mundo.retrasoComodines > 0){
    restaRetraso();

  } else if (Mundo.retrasoComodines == 0){
    nuevosComodines();
    nuevoRetraso();

  }

  countLives = Mundo.lives;
  drawUi();
  if (comerItem(Mundo.snake, Mundo.comodines[0]) || Mundo.comodines[0].tiempoAccionado > 0){ //Bueno (yellow)
    accionVelocidad();

  } else if (comerItem(Mundo.snake, Mundo.comodines[1]) || Mundo.comodines[1].tiempoAccionado > 0){ //Bueno (purple)
    invencibilidad = accionInvencibilidad();

  } else if (comerItem(Mundo.snake, Mundo.comodines[2]) || Mundo.comodines[2].tiempoAccionado > 0){ //Bueno (orange)

  } else if (comerItem(Mundo.snake, Mundo.comodines[3]) || Mundo.comodines[3].tiempoAccionado > 0){ //bueno (black)
    accionVidaMas();

  } else if (comerItem(Mundo.snake, Mundo.comodines[4]) || Mundo.comodines[4].tiempoAccionado > 0){ // (white)
    accionInversion();
  } else if (comerItem(Mundo.snake, Mundo.comodines[5]) || Mundo.comodines[5].tiempoAccionado > 0){ // (browm)
    accionTombos();
  } else if (comerItem(Mundo.snake, Mundo.comodines[6]) || Mundo.comodines[6].tiempoAccionado > 0){ // (pink)
    accionReduccionPuntos();
  } else if (comerItem(Mundo.snake, Mundo.comodines[7]) || Mundo.comodines[7].tiempoAccionado > 0){ //(gray)
    golpeAccionado = accionGolpeAccionado();
  } else if ((comerItem(Mundo.snake, Mundo.comodines[8]) || Mundo.comodines[8].tiempoAccionado > 0)){ //(Hexadecimal xd)
    accionAleatorio();
  }

  //[4,5,7,0,1,2,3,0,1,2,3,4,5,7,4,5,7,4,5,7,4,5,7]

  if (Mundo.comodines[0].tiempoActivo > 0){
    restaTiempo(0);

    if (Mundo.comodines[0].tiempoActivo == 1){
      posicionInactiva(0);

    }
  }

  if (Mundo.comodines[1].tiempoActivo > 0){
    restaTiempo(1);

    if (Mundo.comodines[1].tiempoActivo == 1){
      //console.log("Hola");
      posicionInactiva(1);

    }
  }

  if (Mundo.comodines[2].tiempoActivo > 0){
    restaTiempo(2);

    if (Mundo.comodines[2].tiempoActivo == 1){
      //console.log("Hola");
      posicionInactiva(2);

    }
  }

  if (Mundo.comodines[3].tiempoActivo > 0){
    restaTiempo(3);

    if (Mundo.comodines[3].tiempoActivo == 1){
      //console.log("Hola");
      posicionInactiva(3);

    }
  }

  if (Mundo.comodines[4].tiempoActivo > 0){
    restaTiempo(4);

    if (Mundo.comodines[4].tiempoActivo == 1){
      //console.log("Hola");
      posicionInactiva(4);

    }
  }

  if (Mundo.comodines[5].tiempoActivo > 0){
    restaTiempo(5);

    if (Mundo.comodines[5].tiempoActivo == 1){
      //console.log("Hola");
      posicionInactiva(5);

    }
  }

  if (Mundo.comodines[6].tiempoActivo > 0){
    restaTiempo(6);

    if (Mundo.comodines[6].tiempoActivo == 1){
      console.log("Hola");
      posicionInactiva(6);

    }
  }

  if (Mundo.comodines[7].tiempoActivo > 0){
    restaTiempo(7);

    if (Mundo.comodines[7].tiempoActivo == 1){
      //console.log("Hola");
      posicionInactiva(7);

    }
  }

  if (Mundo.comodines[8].tiempoActivo > 0){
    restaTiempo(8);

    if (Mundo.comodines[8].tiempoActivo == 1){
      //console.log("Hola");
      posicionInactiva(8);

    }
  }


  if (   //Cordinas el movimiento de la serpiente.
    // (Mundo.snake[0].x > columnas - 1 ||
    //   Mundo.snake[0].y > filas - 1 ||
    //   Mundo.snake[0].x < 0 ||
    //   Mundo.snake[0].y < 0 ||
    // escenario[Mundo.snake[0].y][Mundo.snake[0].x] == 1 ||
    ((Mundo.escenario[Mundo.snake[0].y][Mundo.snake[0].x] == 2) && (Mundo.lives >= 1)) /*|| (compMiniEnemigos(Mundo.listaEnemigos))==0 */||
    (((choqueSnake(rest(Mundo.snake), Mundo.snake[0]) == true) && invencibilidad == true) &&
  Mundo.lives >= 1)
    //margenes(Mundo.snake[0].x,Mundo.sanke[0].y)==true
    // escenario[Mundo.snake[0].y][0] == 2 ||
  ) {
    countLives = Mundo.lives - 1;
    return update(Mundo, {
      snake: [
        { x: columnas / 2, y: filas / 2 },
        { x: columnas / 2 - 1, y: filas / 2 },
        { x: columnas / 2 - 2, y: filas / 2 },
      ],
      dir: derecha,
      food: {
        x: int(getRandom(2,26)) ,  //28
        y: int(getRandom(4,25)),
      },
      score: Mundo.score,
      lives: Mundo.lives - 1,
      tipe: 'juego',
      timer: int(millis() / 1000),
      Thief: {
        x: 26,
        y: 13,
        dirx: true,
        diry: true,
      },
      knife: [{
        x: 18,
        y: 10,
        pos: false,
      },],
    });
  } else if ( // Comprobar si la serpiente esta tiesa.
    ((Mundo.escenario[Mundo.snake[0].y][Mundo.snake[0].x] == 2) && (Mundo.lives < 1)) ||
    ((choqueSnake(rest(Mundo.snake), Mundo.snake[0]) == true && Mundo.lives < 1) && invencibilidad == true)
  ) {

    juegoTerminado();
    // return update(Mundo, {});
  } else {
    // Saber si la serpiente come
    if (comerItem(Mundo.snake, Mundo.food)) {
      Mundo.snake.push({ x: 5, y: 5 });
      return update(Mundo, {
        snake: moveSnake(Mundo.snake, Mundo.dir),
        food: {
            x: int(getRandom(2,26)) ,  //28
            y: int(getRandom(4,25)), //26
        },
        score: Mundo.score + Mundo.scoreMas,
        timer: int(millis() / 1000),
        Thief: ThiefMove(Mundo.Thief),
        knife: duplicarKnife(Mundo.knife,Mundo.Thief),
      });
      //Comprueba si el tiempoActivo de velocidad es diferente de cero para restarle
      //Movimiento normal del Snake junto al del Thief.
    } else if (hitHead(Mundo.snake, Mundo.knife)) {
      countLives = Mundo.lives - 1;
      return update(Mundo, {
        snake: [
          { x: columnas / 2, y: filas / 2 },
          { x: columnas / 2 - 1, y: filas / 2 },
          { x: columnas / 2 - 2, y: filas / 2 },
        ],
        dir: derecha,
        food: {
          x: int(getRandom(2, 26)), //28
          y: int(getRandom(4, 25)),
        },
        cuadradoFinal: {
          x: 0,
          y: 0,
        },
        score: Mundo.score,
        lives: Mundo.lives - 1,
        tipe: "juego",
        timer: int(millis() / 1000),
        Thief: {
          x: 26,
          y: 13,
          dirx: true,
          diry: true,
        },
        knife: [
          {
            x: 18,
            y: 10,
            pos: false,
          },
        ],
      });
    } else {
      return update(Mundo, {
        snake: moveSnake(Mundo.snake, Mundo.dir),
        Thief: ThiefMove(Mundo.Thief),
        timer: int(millis() / 1000),
        knife: moveKnife(Mundo.knife),
      });
    }
    // return update(Mundo, { snake: moveSnake(Mundo.snake, Mundo.dir) });
  }
}



//Implemente esta función si quiere que su programa reaccione a eventos del mouse
function onMouseEvent(Mundo, event) {
  return update(Mundo, {});
}


// Actualiza el mundo cada vez que se oprime una tecla. Retorna el nuevo estado del mundo.

function keyPressed() {
  if(!isLooping()){
    juegoNuevo()
  }
  switch (keyCode) {
    case UP_ARROW:
      if (Mundo.dir == abajo) {
        break;
      }
      if ((Mundo.dir = arriba));
      break;
    case RIGHT_ARROW:
      if (Mundo.dir == izquierda) {
        break;
      }
      if ((Mundo.dir = derecha));
      break;
    case DOWN_ARROW:
      if (Mundo.dir == arriba) {
        break;
      }
      if ((Mundo.dir = abajo));
      break;
    case LEFT_ARROW:
      if (Mundo.dir == derecha) {
        break;
      }
      if ((Mundo.dir = izquierda));
      break;
  }
}
///TODO Registra las teclas precionadas
function onKeyEvent(Mundo, keyCode) {
  return update(Mundo, { dir: keyDirection(Mundo.dir, keyCode) });
}

/*
Propósito: Retornar si la cabeza del Snake tiene la misma posición de uno de las posiciones de su cuerpo
Contrato: listaDeItems, JSON -> boolean
Prototipo: choqueSnake(snake, cabezaSnake)
Ejemplos:
choqueSnake([{x:3, y:3},{x:3, y:4}], {x:3, y:2}) -> false
choqueSnake([{x:3, y:3},{x:3, y:4}], {x:3, y:3}) -> true
*/

function choqueSnake(snake, cabezaSnake) {
  if (isEmpty(snake) == true) {
    return false;
  } else if (
    first(snake).x == cabezaSnake.x &&
    first(snake).y == cabezaSnake.y
  ) {
    return true;
  } else {
    return choqueSnake(rest(snake), cabezaSnake);
  }
}

/*
Propósito: Retornar un conjunto de coordenadas agrupadas en el JSON 'comida´, y si las coordenadas coinciden con una de las partes del snake retorna un 0
Contrato: listaDeItems, num, num -> JSON || num
Prototipo: coordenadasComida(snake, coordenadaX, coordenadaY)
Ejemplos:
coordenadasComida([{x: 5, y: 4},{x: 5, y: 3},{x: 5, y: 2}, {x: 5, y: 1}], 0, 0) -> coordenadasComida([{x: 5, y: 4},{x: 5, y: 3},{x: 5, y: 2}, {x: 5, y: 1}], 6, 7) -> {x: 6, x: 7}
coordenadasComida([{x: 5, y: 4},{x: 5, y: 3},{x: 5, y: 2}, {x: 5, y: 1}], 0, 0) -> coordenadasComida([{x: 5, y: 4},{x: 5, y: 3},{x: 5, y: 2}, {x: 5, y: 1}], 5, 1) -> 0
*/

function coordenadasComida(snake, coordenadaX, coordenadaY) {
  if (coordenadaX == 0 && coordenadaY == 0) {
    coordenadaX = Math.floor(Math.random() * (20 - 0) + 0);
    coordenadaY = Math.floor(Math.random() * (20 - 0) + 0);
  }
  let comida = { x: coordenadaX, y: coordenadaY };

  if (isEmpty(snake) == true) {
    return comida;
  } else if (first(snake).x == coordenadaX && first(snake).y == coordenadaY) {
    return 0;
  } else {
    return coordenadasComida(rest(snake), coordenadaX, coordenadaY);
  }
}

/*
Propósito: Retornar un JSON aleatorio
Contrato: listaDeItems -> JSON
Prototipo: numeroRandomComida(snake)
Ejemplos:
coordenadasComida({[{x: 5, y: 4},{x: 5, y: 3},{x: 5, y: 2}, {x: 5, y: 1}]}) -> {x:7, y:5}
coordenadasComida({[{x: 5, y: 4},{x: 5, y: 3},{x: 5, y: 2}, {x: 5, y: 1}]}) -> {x:17, y:2}
*/

function numeroRandomComida(snake) {
  const num = coordenadasComida(snake, 0, 0);
  if (num == 0) {
    return numeroRandomComida(snake);
  } else {
    return num;
  }
}

/*
Propósito: Retornar un número aleatorio entre los parámetros ingresados por el usurario
Contrato: number,number -> number
Prototipo: tiempoRandom(inicial,final)
Ejemplos:
tiempoRandom(30,50) -> 43
tiempoRandom(30,50) -> 41
tiempoRandom(60,120) -> 118
*/

function tiempoRandom(inicial, final) {
  return Math.floor(Math.random() * (final - inicial) + inicial);
}

/*
Propósito: Retornar si las posiciones 'x' y 'y' coinciden con la cabeza de Snake
Contrato: listaDeItems, JSON -> boolean
Prototipo: comerItem(snake,item)
Ejemplos:
comerItem(([5,5], [5,4], [5,3], [5,2]), [5,2]) -> true
comerItem(([5,5], [5,4], [5,3], [5,2]), [0,1]) -> false
*/

function comerItem(snake, item) {
  if (snake[0].x == item.x && snake[0].y == item.y || snake[1].x == item.x && snake[1].y == item.y) {
    return true;
  } else {
    return false;
  }
}

//FUNCIONES DE LOS COMODINES EN GENERAL
function restaTiempo(nComodin){
  update(Mundo, Mundo.comodines[nComodin].tiempoActivo--);

}

function posicionInactiva(nComodin){
  update(Mundo, Mundo.comodines[nComodin].x = -1);
  update(Mundo, Mundo.comodines[nComodin].y = -1);

  //nuevosComodines();
  update(Mundo, Mundo.retrasoComodines = tiempoRetraso);
}

function nuevosComodines(){
  const numeroComodin = 8;
  //const listaComodin = [0,1,2,3,4,5,6,7,4,5,6,7,4,5,6,7,0,1,2,3,0,1,2,3,4,5,6,7,4,5,6,7,4,5,6,7,0,1,2,3,0,1,2,3,8,4,5,6,7,4,5,6,7,4,5,6,7,0,1,2,3];
  //const numeroComodin = listaComodin[getRandom(0,length(listaComodin))];
  //const numeroComodin[getRandom(0,)]
  update(Mundo, Mundo.comodines[numeroComodin].tiempoActivo = getRandom(30,50));
  update(Mundo, Mundo.comodines[numeroComodin].x = getRandom(2,26));
  update(Mundo, Mundo.comodines[numeroComodin].y = getRandom(4,25));
}

function restaRetraso(){
  update(Mundo, Mundo.retrasoComodines--);
}

function nuevoRetraso(){
  update(Mundo, Mundo.retrasoComodines = tiempoRetraso);
}

const tiempoRetraso = 40;

//ACCIONES DE LOS COMODINES
function accionVelocidad(){
  update(Mundo, Mundo.snake = moveSnake(Mundo.snake, Mundo.dir));
  update(Mundo, Mundo.comodines[0].tiempoActivo = 0)
  if (Mundo.comodines[0].tiempoAccionado == 0){
    posicionInactiva(0);
    update(Mundo, Mundo.comodines[0].tiempoAccionado = 40);
    //nuevosComodines();
    update(Mundo, Mundo.retrasoComodines = tiempoRetraso);
  } else {
    update(Mundo, Mundo.comodines[0].tiempoAccionado--)
  }
}

function accionInvencibilidad(){
  update(Mundo, Mundo.comodines[1].tiempoActivo = 0)
  if (Mundo.comodines[1].tiempoAccionado == 0){
    posicionInactiva(1);
    update(Mundo, Mundo.comodines[1].tiempoAccionado = 40);
    //nuevosComodines();
    update(Mundo, Mundo.retrasoComodines = tiempoRetraso);

  } else {
    update(Mundo, Mundo.comodines[1].tiempoAccionado--);

  }

  if (Mundo.comodines[1].tiempoAccionado > 2){
    return false;

  } else {
    return true;
  }
}

function accionVidaMas(){
  update(Mundo, Mundo.comodines[3].tiempoActivo = 0);
  posicionInactiva(3);
  update(Mundo, Mundo.comodines[3].tiempoAccionado = 0);
  update(Mundo, Mundo.retrasoComodines = tiempoRetraso);
  update(Mundo, Mundo.lives++);
}

function accionInversion(){
  update(Mundo, Mundo.comodines[4].tiempoActivo = 0)
  if (Mundo.comodines[4].tiempoAccionado == 0){
    posicionInactiva(4);
    update(Mundo, Mundo.comodines[4].tiempoAccionado = 40);
    //nuevosComodines();
    update(Mundo, Mundo.retrasoComodines = tiempoRetraso);

  } else {
    update(Mundo, Mundo.comodines[4].tiempoAccionado--);
  }
}

function accionTombos(){
  update(Mundo, Mundo.comodines[5].tiempoActivo = 0)
  if (Mundo.comodines[5].tiempoAccionado == 0){
    posicionInactiva(5);
    update(Mundo, Mundo.comodines[5].tiempoAccionado = 40);
    //nuevosComodines();
    update(Mundo, Mundo.retrasoComodines = tiempoRetraso);
  } else {
    // console.log("Hola");
    dibujaEnemigo(Mundo.listaEnemigos)
    console.log(Mundo.activosMiniEnemigos)
    mueveEnemigo(Mundo.listaEnemigos)
    compMiniEnemigos(Mundo.listaEnemigos)
    update(Mundo, Mundo.comodines[5].tiempoAccionado--)
  }
}

function accionReduccionPuntos(){
  update(Mundo, Mundo.comodines[6].tiempoActivo = 0);
  console.log(Mundo.comodines[6].tiempoAccionado);
  if (Mundo.comodines[6].tiempoAccionado == 0){
    posicionInactiva(6);
    update(Mundo, Mundo.comodines[6].tiempoAccionado = 40);
    update(Mundo, Mundo.retrasoComodines = tiempoRetraso);
    update(Mundo, Mundo.scoreMas = 0.5);

  } else if (Mundo.comodines[6].tiempoAccionado == 1){
    console.log("Hola");
    update(Mundo, Mundo.scoreMas = 1);
    update(Mundo, Mundo.comodines[6].tiempoAccionado--);

  } else {
    update(Mundo, Mundo.comodines[6].tiempoAccionado--);

  }
}

function accionGolpeAccionado() {
  update(Mundo, (Mundo.comodines[7].tiempoActivo = 0));
  if (Mundo.comodines[7].tiempoAccionado == 0) {
    window.vidasOficial = Mundo.lives;
    posicionInactiva(7);
    update(Mundo, (Mundo.comodines[7].tiempoAccionado = 40));
    //nuevosComodines();
    update(Mundo, (Mundo.retrasoComodines = tiempoRetraso));
  } else {
    update(Mundo, Mundo.comodines[7].tiempoAccionado--);
  }

  if (Mundo.comodines[7].tiempoAccionado > 2) {
    update(Mundo, (Mundo.lives = 0));
  } else {
    update(Mundo, (Mundo.lives = window.vidasOficial));
  }
}

 //:D
function accionAleatorio(){
  update(Mundo, Mundo.comodines[8].tiempoActivo = 0);
  posicionInactiva(8);
  update(Mundo, Mundo.comodines[8].tiempoAccionado = 0);
  update(Mundo, Mundo.retrasoComodines = tiempoRetraso);
  const listaAleatoriaPuntos = [1,0,0,1,1,1,0,1,1,1,0,1,1,1,0,1,1,0,1,0,1,0,1,0,0,1];
  const ProbabilidadComodines = listaAleatoriaPuntos[getRandom(0,length(listaAleatoriaPuntos))]
  switch (ProbabilidadComodines) {
    case 0:
      if(Mundo.score>20){
        update(Mundo,Mundo.score = Mundo.score-20);
      }else{
        update(Mundo,Mundo.score = 0);
      }
      break;
    case 1:
        update(Mundo,Mundo.score = Mundo.score+20);
      break;
    default:
      return null;
      break;
  }
}

