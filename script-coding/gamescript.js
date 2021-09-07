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


/*COSAS DEL SNAKE*/

// TODO Movimiento de la serpiente
function moveSnake(snake, dir) {
  const head = first(snake);
  return cons(
    { x: head.x + dir.x, y: head.y + dir.y },
    snake.slice(0, length(snake) - 1)
  );
}

// TODO Actualiza la serpiente. Creando una nuevo cabeza y removiendo la cola.

function moveSnake(snake, dir) {
  const head = first(snake);
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
function drawComodin1(comodin1) {
  fill('yellow');
  rect(comodin1.x * lado, comodin1.y * lado, lado, lado);
}

/* SETUP  ==> SE LLAMA ANTES DE INICIALIZAR EL JUEGO*/

function setup() {
  frameRate(7);
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
    //Direccion por la que empieza el Snake
    dir: derecha,
    //Posicion de la Comida (Será Random)
    food: {
      x: int(random(columnas)),
      y: int(random(filas)),
    },
    //TODO SE PODRA BORRAR? PARA QUE SIRVE?
    cuadradoFinal: {
      x: 0,
      y: 0,
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

    /* COMODINES POSITIVOS */
    // Comodin de Velocidad
    velocidad: {
      x: int(random(columnas)),
      y: int(random(columnas)),
      tiempoAccionado: 0,
      tiempoActivo: tiempoRandom(30, 50),
      tiempoDesactivo: tiempoRandom(30, 50),
    },
    //Comodin de invencibilidad
    invencibilidad: {
      x: int(random(columnas)),
      y: int(random(columnas)),
      tiempoAccionado: 0,
      tiempoActivo: tiempoRandom(30, 50),
      tiempoDesactivo: tiempoRandom(30, 50),
    },
    //Comodin de regeneracion
    regeneracion: {
      x: int(random(columnas)),
      y: int(random(columnas)),
      tiempoActivo: tiempoRandom(30, 50),
      tiempoDesactivo: tiempoRandom(30, 50),
    },
    //Comodin para tener una vida más
    vidaMas: {
      x: int(random(columnas)),
      y: int(random(columnas)),
      tiempoActivo: tiempoRandom(30, 50),
      tiempoDesactivo: tiempoRandom(30, 50),
    },

    /* COMODINES MALOS */
    //Comodin para Inversion ( Invertir las teclas )
    inversion: {
      x: int(random(columnas)),
      y: int(random(columnas)),
      tiempoAccionado: 0,
      tiempoActivo: tiempoRandom(30, 50),
      tiempoDesactivo: tiempoRandom(30, 50),
    },
    //Comodin de Tombos (Crear varias snakes que ataquen al snake)
    tombos: {
      x: int(random(columnas)),
      y: int(random(columnas)),
      tiempoAccionado: 0,
      tiempoActivo: tiempoRandom(30, 50),
      tiempoDesactivo: tiempoRandom(30, 50),
    },
    //Comodin para reducir los Puntos
    reduccionPuntos: {
      x: int(random(columnas)),
      y: int(random(columnas)),
      tiempoAccionado: 0,
      tiempoActivo: tiempoRandom(30, 50),
      tiempoDesactivo: tiempoRandom(30, 50),
    },
    //Comodin que aparece con el jefe y te mata instantaneamente
    golpeAccionado: {
      x: int(random(columnas)),
      y: int(random(columnas)),
      tiempoAccionado: 0,
      tiempoActivo: tiempoRandom(30, 50),
      tiempoDesactivo: tiempoRandom(30, 50),
    },

    //Numero de vidas inicial
    lives: 3,
    //El tiempo
    timer: int(millis() / 1000),
    //Jefe Ñero
    ñero: {
      x: 26,
      y: 13,
      dirx: true,
      diry: true,
    },
    //Ataque de Ñero
    knife: [
      {
        x: 18,
        y: 10,
      },
    ],
  };
}

/* TABLERO O ESCENARIO */
//Funciones Importantes
// function dibujaCuadricula() {
//   for (y = 0; y < escenario.length; y++) {
//     for (x = 0; x < escenario[y].length; x++) {
//       if (escenario[y][x] == 0) {
//         strokeWeight(0.1);
//         stroke('#03fc7b');
//         fill(51);
//         rect(x * lado, y * lado, lado, lado);
//       if (escenario[y][x] == 1) {
//         strokeWeight(0.1);
//         stroke('#03fc7b');
//         fill(51);
//         rect(x * lado, y * lado, lado, lado);
//       }
//       if (escenario[y][x] == 2) {
//         strokeWeight(0.1);
//         stroke('#03fc7b');
//         fill(51);
//         rect(x * lado, y * lado, lado, lado);
//       }
//     }
//   }
// }
// }

/* DRAWGAME : DIBUJAR EN EL CANVAS LO QUE QUIERAS HACER*/

//TODO Es mejor borrar esta vaina del rate ome.
var rate;

function drawGame(Mundo) {
  //Definir el background del Canvas
  background(fondo);
  //Llamar a drawUi
  drawUi();
  //Dibujar la Cuadricula
  // dibujaCuadricula();

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
    rect(s.x * lado, s.y * lado, lado, lado);
  });

  //TODO REVISAR ESTE FILL
  fill('white');
  //Dibujar a Ñero
  drawÑero(Mundo.ñero);
  //Dibujar Knife
  drawKnife(Mundo.knife);
  //Dibujar Comodin #!
  drawComodin1(Mundo.velocidad);

  frameRate(rate);

  if (Mundo.velocidad.tiempoAccionado == 0) {
    rate = 5;
  } else {
    rate = 8;
    //Mundo.tiempo.tiempoVelocidadAccionado = Mundo.tiempo.tiempoVelocidadAccionado - 1;
  }
}

/*DRAW UI : Dibujar lo que esta en la parte superior, el texto*/
function drawUi() {
  //fill => color de relleno del texto
  fill(255, 255, 255);
  //stroke => color del borde del texto
  stroke(50, 150, 50);
  //strokeWeight => anchura del borde del texto
  strokeWeight(4);
  //textSize => tamaño de la fuente
  textSize(30);
  //textAlign => alineacion del texto
  textAlign(LEFT);
  text('SCORE: ' + Mundo.score, 20, 45);//texto en el que se muestra conteo de la puntuacion
  textAlign(RIGHT);//alineacion del texto que muestra el score
  text('LIVES: ' + countLives, 540, 45);//texto en el que se muestra el contador de vidas
  textSize(30);//tamaño de la fuente
  text('Tiempo: ' + Mundo.timer, 350, 45);//temporizador
}

/* DRAW FONDO : DIBUJA EL FONDO DEL CANVAS */
function drawfondo() {
  fondo = loadImage('/backgrounds/FondoS.jpg');//añadimos la imagen
  createCanvas(ancho_canvas, alto_canvas);
  background(fondo);
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

/* WINDOWREZIRED: MEJORAR COMO SE VE EN LA PANTALLA EN CUANTO A ESCALAS */
function windowRezired() {
  let escala = windowWidth / width;
  if (escala >= 1) {
    return;
  }
  canvas.style('width', width * escala + 'px');
  canvas.style('height', height * escala + 'px');
}


//Dibuja el arma que utiliza el enemigo 'ñero' en este caso un cuchillo(knife)
function drawKnife(knife) {
  fill('green');
  triangle(
    knife.x * lado + 10,
    knife.y * lado,
    knife.x * lado,
    knife.y * lado + 10,
    knife.x * lado + 10,
    knife.y * lado + 20
  );
}

//Funcion para dibujar a uno de los enemigos, en este caso 'el ñero'
function drawÑero(ñero) {
  fill('blue');
  rect(ñero.x * lado, ñero.y * lado, lado, lado);
}



/*TODO Funcion del movimiento del ñero*/
function ñeroMove(ñero) {
  // Esto se ejecuta en cada tic del reloj. Con esto se pueden hacer animaciones
  //
  if (
    (ñero.dirx == true && ñero.y != 24 && ñero.diry == true) ||
    (ñero.x == 26 && ñero.diry == false)
  ) {
    return { x: ñero.x, y: ñero.y + 1, dirx: true, diry: true };
  }
  if (ñero.y == 24) {
    return { x: ñero.x, y: ñero.y - 1, dirx: false, diry: true };
  }
  if (ñero.dirx == false && ñero.y != 1) {
    return { x: ñero.x, y: ñero.y - 1, dirx: false, diry: true };
  }
  if (ñero.y == 1 && ñero.dirx == false && ñero.x != 1 && ñero.diry == true) {
    return { x: ñero.x - 1, y: 1, dirx: false, diry: true };
  }
  if (ñero.x == 1) {
    return { x: ñero.x + 1, y: 1, dir: true, diry: false };
  }
  if (ñero.diry == false && ñero.x != 1) {
    return { x: ñero.x + 1, y: 1, dir: true, diry: false };
  }
}

//TODO Funcion que se encarga del movimiento de el cuchillo
function moveKnife(knife) {
  return { x: knife.x - 1, y: knife.y };
}

//Actualiza los atributos del ñero conforme el juego va avanzando
function ñeroUpdate() {}


/* ONTIC */
//OnTic: Esto se ejecuta en cada tic del reloj. Con esto se pueden hacer animaciones. La velocidad de ejecución del onTic depende del frameRate.
function onTic(Mundo) {
  //Cada condicional representa una respectiva situación, por lo que actualiza el Mundo de una cierta manera.

  if (   //Cordinas el movimiento de la serpiente.
    (Mundo.snake[0].x > columnas - 1 ||
      Mundo.snake[0].y > filas - 1 ||
      Mundo.snake[0].x < 0 ||
      Mundo.snake[0].y < 0 ||
      choqueSnake(rest(Mundo.snake), Mundo.snake[0]) == true) &&
    Mundo.lives >= 1
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
        x: int(random(columnas)),
        y: int(random(filas)),
      },
      cuadradoFinal: {
        x: 0,
        y: 0,
      },
      score: Mundo.score,
      velocidad: {
        x: int(random(columnas)),
        y: int(random(columnas)),
        tiempoAccionado: 0,
        tiempoActivo: tiempoRandom(30, 50),
        tiempoDesactivo: tiempoRandom(30, 50),
      },
      invencibilidad: {
        x: int(random(columnas)),
        y: int(random(columnas)),
        tiempoAccionado: 0,
        tiempoActivo: tiempoRandom(30, 50),
        tiempoDesactivo: tiempoRandom(30, 50),
      },
      regeneracion: {
        x: int(random(columnas)),
        y: int(random(columnas)),
        tiempoActivo: tiempoRandom(30, 50),
        tiempoDesactivo: tiempoRandom(30, 50),
      },
      vidaMas: {
        x: int(random(columnas)),
        y: int(random(columnas)),
        tiempoActivo: tiempoRandom(30, 50),
        tiempoDesactivo: tiempoRandom(30, 50),
      },
      inversion: {
        x: int(random(columnas)),
        y: int(random(columnas)),
        tiempoAccionado: 0,
        tiempoActivo: tiempoRandom(30, 50),
        tiempoDesactivo: tiempoRandom(30, 50),
      },
      tombos: {
        x: int(random(columnas)),
        y: int(random(columnas)),
        tiempoAccionado: 0,
        tiempoActivo: tiempoRandom(30, 50),
        tiempoDesactivo: tiempoRandom(30, 50),
      },
      reduccionPuntos: {
        x: int(random(columnas)),
        y: int(random(columnas)),
        tiempoAccionado: 0,
        tiempoActivo: tiempoRandom(30, 50),
        tiempoDesactivo: tiempoRandom(30, 50),
      },
      golpeAccionado: {
        x: int(random(columnas)),
        y: int(random(columnas)),
        tiempoAccionado: 0,
        tiempoActivo: tiempoRandom(30, 50),
        tiempoDesactivo: tiempoRandom(30, 50),
      },
      lives: Mundo.lives - 1,
      tipe: 'juego',
      timer: millis(),
      ñero: {
        x: 26,
        y: 13,
        dirx: true,
        diry: true,
      },
      knife: {
        x: 18,
        y: 10,
      },
    });
  } else if ( // Comprobar si la serpiente esta tiesa.
    Mundo.snake[0].x > columnas - 1 ||
    Mundo.snake[0].y > filas - 1 ||
    Mundo.snake[0].x < 0 ||
    Mundo.snake[0].y < 0 ||
    (choqueSnake(rest(Mundo.snake), Mundo.snake[0]) == true && Mundo.lives < 1)
  ) {
    textAlign(CENTER, CENTER);
    textSize(50);
    text(' Has perdido', width / 2, height / 2);//advertencia que se muestra en pantalla en caso de que la serpiente se choque.
    text(Mundo.score, width / 2, height / 1.5);
    textSize(12);
    rect(
      Mundo.cuadradoFinal.x * lado,
      Mundo.cuadradoFinal.y * lado,
      lado,
      lado
    );
    return update(Mundo, {});
  } else {
    if (Mundo.snake[0].x == Mundo.food.x && Mundo.snake[0].y == Mundo.food.y) { // Saber si la serpiente se periquea.
      Mundo.snake.push({ x: 5, y: 5 });
      return update(Mundo, {
        snake: moveSnake(Mundo.snake, Mundo.dir),
        food: {
          x: Math.floor(Math.random() * (20 - 0) + 0),
          y: Math.floor(Math.random() * (20 - 0) + 0),
        },
        score: Mundo.score + 1,
        timer: int(millis() / 1000),
        ñero: ñeroMove(Mundo.ñero),
        knife: moveKnife(Mundo.knife),
      });
    } else if (
      comerItem(Mundo.snake, Mundo.velocidad) == true ||
      comerItem(Mundo.snake, Mundo.invencibilidad) == true ||
      comerItem(Mundo.snake, Mundo.regeneracion) == true ||
      comerItem(Mundo.snake, Mundo.vidaMas) == true ||
      comerItem(Mundo.snake, Mundo.inversion) == true ||
      comerItem(Mundo.snake, Mundo.tombos) == true ||
      comerItem(Mundo.snake, Mundo.reduccionPuntos) == true ||
      comerItem(Mundo.snake, Mundo.golpeAccionado) == true
    ) {
      if (comerItem(Mundo.snake, Mundo.velocidad) == true) { //Si Snake come el comodín de velocidad
        return update(Mundo, {
          snake: moveSnake(Mundo.snake, Mundo.dir),
          cuadradoFinal: {
            x: Mundo.snake[Mundo.snake.length - 1].x,
            y: Mundo.snake[Mundo.snake.length - 1].y,
          },
          velocidad: retornarComodin(
            true,
            tiempoRandom(30, 50),
            0,
            90,
            Mundo,
            Mundo.velocidad
          ),
          timer: int(millis() / 1000),
        });
      } else if (comerItem(Mundo.snake, Mundo.invencibilidad) == true) { //Si Snake come el comodín de invencibilidad
        return update(Mundo, {
          snake: moveSnake(Mundo.snake, Mundo.dir),
          cuadradoFinal: {
            x: Mundo.snake[Mundo.snake.length - 1].x,
            y: Mundo.snake[Mundo.snake.length - 1].y,
          },
          invencibilidad: retornarComodin(
            true,
            tiempoRandom(0, 0),
            0,
            0,
            Mundo,
            Mundo.invencibilidad
          ),
        });
        ///OT
      } else if (comerItem(Mundo.snake, Mundo.regeneracion) == true) { //Si Snake come el comodín de regeneración
        return update(Mundo, {
          snake: moveSnake(Mundo.snake, Mundo.dir),
          cuadradoFinal: {
            x: Mundo.snake[Mundo.snake.length - 1].x,
            y: Mundo.snake[Mundo.snake.length - 1].y,
          },
          invencibilidad: retornarComodin(
            true,
            tiempoRandom(0, 0),
            0,
            0,
            Mundo,
            Mundo.regeneracion
          ),
        });
      } else if (comerItem(Mundo.snake, Mundo.vidaMas) == true) { //Si Snake come el item vidaMas
        return update(Mundo, {
          snake: moveSnake(Mundo.snake, Mundo.dir),
          cuadradoFinal: {
            x: Mundo.snake[Mundo.snake.length - 1].x,
            y: Mundo.snake[Mundo.snake.length - 1].y,
          },
          invencibilidad: retornarComodin(
            true,
            tiempoRandom(0, 0),
            0,
            0,
            Mundo,
            Mundo.vidaMas
          ),
        });
      } else if (comerItem(Mundo.snake, Mundo.inversion) == true) { //Si Snake come el comodín inversion
        return update(Mundo, {
          snake: moveSnake(Mundo.snake, Mundo.dir),
          cuadradoFinal: {
            x: Mundo.snake[Mundo.snake.length - 1].x,
            y: Mundo.snake[Mundo.snake.length - 1].y,
          },
          invencibilidad: retornarComodin(
            true,
            tiempoRandom(0, 0),
            0,
            0,
            Mundo,
            Mundo.inversion
          ),
        });
      } else if (comerItem(Mundo.snake, Mundo.tombos) == true) { //Si Snake come el comodín tombos
        return update(Mundo, {
          snake: moveSnake(Mundo.snake, Mundo.dir),
          cuadradoFinal: {
            x: Mundo.snake[Mundo.snake.length - 1].x,
            y: Mundo.snake[Mundo.snake.length - 1].y,
          },
          invencibilidad: retornarComodin(
            true,
            tiempoRandom(0, 0),
            0,
            0,
            Mundo,
            Mundo.tombos
          ),
        });
      } else if (comerItem(Mundo.snake, Mundo.reduccionPuntos) == true) { //Si Snake come el comodín reduccionPuntos
        return update(Mundo, {
          snake: moveSnake(Mundo.snake, Mundo.dir),
          cuadradoFinal: {
            x: Mundo.snake[Mundo.snake.length - 1].x,
            y: Mundo.snake[Mundo.snake.length - 1].y,
          },
          invencibilidad: retornarComodin(
            true,
            tiempoRandom(0, 0),
            0,
            0,
            Mundo,
            Mundo.reduccionPuntos
          ),
        });
      } else if (comerItem(Mundo.snake, Mundo.golpeAccionado) == true) { //Si Snake come el comodín golpeAccionado
        return update(Mundo, {
          snake: moveSnake(Mundo.snake, Mundo.dir),
          cuadradoFinal: {
            x: Mundo.snake[Mundo.snake.length - 1].x,
            y: Mundo.snake[Mundo.snake.length - 1].y,
          },
          invencibilidad: retornarComodin(
            true,
            tiempoRandom(0, 0),
            0,
            0,
            Mundo,
            Mundo.golpeAccionado
          ),
        });
      }

      // Si el tiempo Accionado de un comodín se encuentra diferente de 0
    } else if ( //TODO se puede comprimir en un const.
      Mundo.velocidad.tiempoAccionado != 0 ||
      Mundo.invencibilidad.tiempoAccionado != 0 ||
      Mundo.inversion.tiempoAccionado != 0 ||
      Mundo.tombos.tiempoAccionado != 0 ||
      Mundo.reduccionPuntos.tiempoAccionado != 0 ||
      Mundo.golpeAccionado.tiempoAccionado != 0
    ) {

      //Activa el tiempo accionado del comodín Velocidad
      if (Mundo.velocidad.tiempoAccionado > 0) {
        console.log(Mundo);
        return update(Mundo, {
          snake: moveSnake(Mundo.snake, Mundo.dir),
          cuadradoFinal: {
            x: Mundo.snake[Mundo.snake.length - 1].x,
            y: Mundo.snake[Mundo.snake.length - 1].y,
          },
          velocidad: retornarComodin(
            false,
            Mundo.velocidad.tiempoAccionado - 1,
            0,
            Mundo.velocidad.tiempoDesactivo,
            Mundo,
            Mundo.velocidad
          ),
          timer: int(millis() / 1000),
        });

        //Activa el tiempo accionado del comodín invencibilidad
      } else if (Mundo.invencibilidad.tiempoAccionado > 0) {
        return update(Mundo, {
          snake: moveSnake(Mundo.snake, Mundo.dir),
          cuadradoFinal: {
            x: Mundo.snake[Mundo.snake.length - 1].x,
            y: Mundo.snake[Mundo.snake.length - 1].y,
          },
          invencibilidad: retornarComodin(
            false,
            tiempoAccionado - 1,
            0,
            tiempoRandom(70 - 90)
          ),
        });

        //Activa el tiempo accionado del comodín inversion
      } else if (Mundo.inversion.tiempoAccionado > 0) {
        return update(Mundo, {
          snake: moveSnake(Mundo.snake, Mundo.dir),
          cuadradoFinal: {
            x: Mundo.snake[Mundo.snake.length - 1].x,
            y: Mundo.snake[Mundo.snake.length - 1].y,
          },
          inversion: retornarComodin(
            false,
            tiempoAccionado - 1,
            0,
            tiempoRandom(70 - 90)
          ),
        });

        //Activa el tiempo accionado del comodín tombos
      } else if (Mundo.tombos.tiempoAccionado > 0) {
        return update(Mundo, {
          snake: moveSnake(Mundo.snake, Mundo.dir),
          cuadradoFinal: {
            x: Mundo.snake[Mundo.snake.length - 1].x,
            y: Mundo.snake[Mundo.snake.length - 1].y,
          },
          tombos: retornarComodin(
            false,
            tiempoAccionado - 1,
            0,
            tiempoRandom(70 - 90)
          ),
        });

        //Activa el tiempo accionado del comodín reduccionPuntos
      } else if (Mundo.reduccionPuntos.tiempoAccionado > 0) {
        return update(Mundo, {
          snake: moveSnake(Mundo.snake, Mundo.dir),
          cuadradoFinal: {
            x: Mundo.snake[Mundo.snake.length - 1].x,
            y: Mundo.snake[Mundo.snake.length - 1].y,
          },
          reduccionPuntos: retornarComodin(
            false,
            tiempoAccionado - 1,
            0,
            tiempoRandom(70 - 90)
          ),
        });

        //Activa el tiempo accionado del comodín golpeAccionado
      } else if (Mundo.golpeAccionado.tiempoAccionado > 0) {
        return update(Mundo, {
          snake: moveSnake(Mundo.snake, Mundo.dir),
          cuadradoFinal: {
            x: Mundo.snake[Mundo.snake.length - 1].x,
            y: Mundo.snake[Mundo.snake.length - 1].y,
          },
          golpeAccionado: retornarComodin(
            false,
            tiempoAccionado - 1,
            0,
            tiempoRandom(70 - 90)
          ),
        });
      }

      //TODO El tiempoActivo debe de afectar a todos los comodines, es decir, restarselos a los comodínes -Solo se encuentra implementado el del comodín velocidad-

      //Comprueba si el tiempoActivo de velocidad es diferente de cero para restarle 1 por cada Tic.
    } else if (Mundo.velocidad.tiempoActivo != 0) {
      return update(Mundo, {
        snake: moveSnake(Mundo.snake, Mundo.dir),
        cuadradoFinal: {
          x: Mundo.snake[Mundo.snake.length - 1].x,
          y: Mundo.snake[Mundo.snake.length - 1].y,
        },
        velocidad: retornarComodin(
          false,
          Mundo.velocidad.tiempoAccionado,
          Mundo.velocidad.tiempoActivo - 1,
          Mundo.velocidad.tiempoDesactivo,
          Mundo,
          Mundo.velocidad
        ),
        timer: int(millis() / 1000),
      });

      //Movimiento normal del Snake junto al del ñero.
    } else {
      return update(Mundo, {
        snake: moveSnake(Mundo.snake, Mundo.dir),
        cuadradoFinal: {
          x: Mundo.snake[Mundo.snake.length - 1].x,
          y: Mundo.snake[Mundo.snake.length - 1].y,
        },
        ñero: ñeroMove(Mundo.ñero),
        timer: int(millis() / 1000),
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
  if (snake[0].x == item.x && snake[0].y == item.y) {
    return true;
  } else {
    return false;
  }
}

/*
Propósito: Retornar en una sola variable los parámetros introducidos por el usuario en un JSON
Contrato: number,number,number -> JSON
Prototipo: retortarTiempos(tiempoAccionado, tiempoActivo, tiempoDesactivo)
Ejemplos:
function retornarComodin(true, 0, 0, 0, [Mundo], [comodin]) -> [
        x: 5,
        y: 3,
        tiempoAccionado: 0,
        tiempoActivo: 0,
        tiempoDesactivo: 0,
        ]


*/

function retornarComodin(
  condicionPosiciones,
  tiempoAccionado,
  tiempoActivo,
  tiempoDesactivo,
  Mundo,
  comodin
) {

  //TODO ¿Corrijo ese "== true"? Porque creo que es inútil...
  if (condicionPosiciones == true) {
    let item1 = numeroRandomComida(Mundo.snake);
    let item2 = {
      tiempoAccionado: tiempoAccionado,
      tiempoActivo: tiempoActivo,
      tiempoDesactivo: tiempoDesactivo,
    };

    return update(item1, item2);
  } else if (condicionPosiciones == false) {
    item = {
      x: comodin.x,
      y: comodin.y,
      tiempoAccionado: tiempoAccionado,
      tiempoActivo: tiempoActivo,
      tiempoDesactivo: tiempoDesactivo,
    };

    return item;
  }
}

