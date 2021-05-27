//Inicio de la rama Comodines (Sebastián Idrobo)
let { append, cons, first, isEmpty, isList, length, rest, map, forEach } =
  functionalLight;

// Actualiza los atributos del objeto y retorna una copia profunda
function update(data, attribute) {
  return Object.assign({}, data, attribute);
}

//////////////////////// Mundo inicial
let Mundo = {};
////////////////////////

// Constantes para las escalas
const columnas = 28;
const filas = 26;
const lado = 20;
const ancho_canvas = columnas * lado;
const alto_canvas = filas * lado;
let canvas;

// Variables de Control
let arriba;
let abajo;
let derecha;
let izquierda;

//Imagen de Canvas
let fondo;

/**
 * Actualiza la serpiente. Creando una nuevo cabeza y removiendo la cola
 */
function moveSnake(snake, dir) {
  const head = first(snake);
  return cons(
    { x: head.x + dir.x, y: head.y + dir.y },
    snake.slice(0, length(snake) - 1)
  );
}

/**
 * Dibuja la comida#671796 
 */
function drawFood(food) {
  fill("crimson");
  rect(food.x * lado, food.y * lado, lado, lado);
}

function drawSnake(snake) {
  fill("white");
  forEach(snake, (s) => {
    rect(s.x * lado, s.y * lado, lado, lado);
  });
}

function drawComodin1(comodin1) {
  fill("blue");
  rect(comodin1.x * lado, comodin1.y * lado, lado, lado);
}

/**
 * Esto se llama antes de iniciar el juego
 */
function setup() {
  

  fondo = loadImage("/Backgrounds/blue.png");
  createCanvas(ancho_canvas, alto_canvas);
  // windowRezired();
  background(fondo);
  abajo = createVector(0, 1);
  arriba = createVector(0, -1);
  izquierda = createVector(-1, 0);
  derecha = createVector(1, 0);
  Mundo = {
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
    score: 0,
    comodines: {
      velocidad: {
        x: int(random(columnas)),
        y: int(random(columnas)),
      },
      invencibilidad: {
        x: int(random(columnas)),
        y: int(random(columnas)),
      },
      regeneracion: {
        x: int(random(columnas)),
        y: int(random(columnas)),
      },
      vidaMas: {
        x: int(random(columnas)),
        y: int(random(columnas)),
      },
      inversion: {
        x: int(random(columnas)),
        y: int(random(columnas)),
      },
      tombos: {
        x: int(random(columnas)),
        y: int(random(columnas)),
      },
      reduccionPuntos: {
        x: int(random(columnas)),
        y: int(random(columnas)),
      },
      golpeAccionado: {
        x: int(random(columnas)),
        y: int(random(columnas)),
      },
    },
    tiempos: {
      velocidad: {
        tiempoAccionado: 0,
        tiempoActivo: tiempoRandom(30,50),
        tiempoDesactivo: tiempoRandom(30,50),
      },
      invencibilidad: {
        tiempoAccionado: 0,
        tiempoActivo: tiempoRandom(30,50),
        tiempoDesactivo: tiempoRandom(30,50),
      },
      regeneracion: {
        tiempoActivo: tiempoRandom(30,50),
        tiempoDesactivo: tiempoRandom(30,50),
      },
      vidaMas : {
        tiempoActivo: tiempoRandom(30,50),
        tiempoDesactivo: tiempoRandom(30,50),
      },
      inversion: {
        tiempoAccionado: 0,
        tiempoActivo: tiempoRandom(30,50),
        tiempoDesactivo: tiempoRandom(30,50),
      },
      tombos: {
        tiempoAccionado: 0,
        tiempoActivo: tiempoRandom(30,50),
        tiempoDesactivo: tiempoRandom(30,50),
      },
      reduccionPuntos: {
        tiempoAccionado: 0,
        tiempoActivo: tiempoRandom(30,50),
        tiempoDesactivo: tiempoRandom(30,50),
      },
      golpeAccionado: {
        tiempoAccionado: 0,
        tiempoActivo: tiempoRandom(30,50),
        tiempoDesactivo: tiempoRandom(30,50),
      }
    }
  }
}

//Mundo.tiempo

function posicionarComida() {
  comida = createVector(int(random(columnas)), int(random(filas)));
}

function windowRezired() {
  let escala = windowWidth / width;
  if (escala >= 1) {
    return;
  }
  canvas.style("width", width * escala + "px");
  canvas.style("height", height * escala + "px");
}

// Dibuja algo en el canvas. Aqui se pone todo lo que quieras pintar
var rate;
function drawGame(Mundo) {
  background(fondo);
  fill(240, 240, 240);
  drawFood(Mundo.food);

  if (Mundo.tiempos.velocidad.tiempoActivo > 0) {
    drawComodin1(Mundo.comodines.velocidad);
  }

  drawSnake(Mundo.snake);

  forEach(Mundo.snake, (s) => {
    rect(s.x * lado, s.y * lado, lado, lado);
  });

  frameRate(rate);
  
  if (Mundo.tiempos.velocidad.tiempoActivo == 0) {
    rate = 8;
  } else {
    rate = 5;

    //Mundo.tiempo.tiempoVelocidadAccionado = Mundo.tiempo.tiempoVelocidadAccionado - 1;
  }
}

// Esto se ejecuta en cada tic del reloj. Con esto se pueden hacer animaciones
function onTic(Mundo) {

  // Si Snake se choca con la pared o con ella misma
  if (
    Mundo.snake[0].x > columnas - 1 ||
    Mundo.snake[0].y > filas - 1 ||
    Mundo.snake[0].x < 0 ||
    Mundo.snake[0].y < 0 ||
    choqueSnake(rest(Mundo.snake), Mundo.snake[0]) == true
  ) {
    textAlign(CENTER, CENTER);
    textSize(50);
    text(" Has perdido", width / 2, height / 2);
    text(Mundo.score, width / 2, height / 1.5);
    rect(
      Mundo.cuadradoFinal.x * lado,
      Mundo.cuadradoFinal.y * lado,
      lado,
      lado
    );
    return update(Mundo, {});

    // Si Snake come la comida
  } else if (
    Mundo.snake[0].x == Mundo.food.x &&
    Mundo.snake[0].y == Mundo.food.y
  ) {
    console.log(Mundo.comodines)
    Mundo.snake.push({ x: 5, y: 5 });
    return update(Mundo, {
      snake: moveSnake(Mundo.snake, Mundo.dir),
      food: numeroRandomComida(Mundo.snake),
      score: Mundo.score + 1,
    });

  // Si Snake come un comodín
  } else if (
    (Mundo.snake[0].x == Mundo.comodines.velocidad.x &&
      Mundo.snake[0].y == Mundo.comodines.velocidad.y) ||
    (Mundo.snake[0].x == Mundo.comodines.invencibilidad.x &&
      Mundo.snake[0].y == Mundo.comodines.invencibilidad.y) ||
    (Mundo.snake[0].x == Mundo.comodines.regeneracion.x &&
      Mundo.snake[0].y == Mundo.comodines.regeneracion.y) ||
    (Mundo.snake[0].x == Mundo.comodines.vidaMas.x &&
      Mundo.snake[0].y == Mundo.comodines.vidaMas.y) ||
    (Mundo.snake[0].x == Mundo.comodines.inversion.x &&
      Mundo.snake[0].y == Mundo.comodines.inversion.y) ||
    (Mundo.snake[0].x == Mundo.comodines.tombos.x &&
      Mundo.snake[0].y == Mundo.comodines.tombos.y) ||
    (Mundo.snake[0].x == Mundo.comodines.reduccionPuntos.x &&
      Mundo.snake[0].y == Mundo.comodines.reduccionPuntos.y) ||
    (Mundo.snake[0].x == Mundo.comodines.golpeAccionado.x &&
      Mundo.snake[0].y == Mundo.comodines.golpeAccionado.y)
  ) {
    
    //Si Snake come el comodín de velocidad
    if (comerItem(Mundo.snake,Mundo.comodines.velocidad) == true) {
        
        return update (Mundo, {
          snake: moveSnake(Mundo.snake, Mundo.dir),
          cuadradoFinal: {
            x: Mundo.snake[Mundo.snake.length - 1].x,
            y: Mundo.snake[Mundo.snake.length - 1].y,
          },
          comodin: {
            velocidad: numeroRandomComida(Mundo.snake),
          },
          tiempos: {
            velocidad: retornarTiempos(tiempoRandom(30,50),0,90),
          }
        })

      } else if (comerItem(Mundo.snake,Mundo.comodines.invencibilidad) == true) {

        return update (Mundo, {
          snake: moveSnake(Mundo.snake, Mundo.dir),
          cuadradoFinal: {
            x: Mundo.snake[Mundo.snake.length - 1].x,
            y: Mundo.snake[Mundo.snake.length - 1].y,
          },
          comodin: {
            velocidad: numeroRandomComida(Mundo.snake),
          },
          tiempos: {
            velocidad: retornarTiempos(0,0,0),
          }
        })

      } else if (comerItem(Mundo.snake,Mundo.comodines.regeneracion) == true) {

        return update (Mundo, {
          snake: moveSnake(Mundo.snake, Mundo.dir),
          cuadradoFinal: {
            x: Mundo.snake[Mundo.snake.length - 1].x,
            y: Mundo.snake[Mundo.snake.length - 1].y,
          },
          comodin: {
            velocidad: numeroRandomComida(Mundo.snake),
          },
          tiempos: {
            velocidad: retornarTiempos(0,0,0),
          }
        })

      } else if (comerItem(Mundo.snake, Mundo.comodines.vidaMas) == true){

        return update (Mundo, {
          snake: moveSnake(Mundo.snake, Mundo.dir),
          cuadradoFinal: {
            x: Mundo.snake[Mundo.snake.length - 1].x,
            y: Mundo.snake[Mundo.snake.length - 1].y,
          },
          comodin: {
            velocidad: numeroRandomComida(Mundo.snake),
          },
          tiempos: {
            velocidad: retornarTiempos(0,0,0),
          }
        })

      } else if (comerItem(Mundo.snake, Mundo.comodines.inversion) == true) {

        return update (Mundo, {
          snake: moveSnake(Mundo.snake, Mundo.dir),
          cuadradoFinal: {
            x: Mundo.snake[Mundo.snake.length - 1].x,
            y: Mundo.snake[Mundo.snake.length - 1].y,
          },
          comodin: {
            velocidad: numeroRandomComida(Mundo.snake),
          },
          tiempos: {
            velocidad: retornarTiempos(0,0,0),
          }
        })

      } else if (comerItem(Mundo.snake, Mundo.comodines.tombos) == true) {

        return update (Mundo, {
          snake: moveSnake(Mundo.snake, Mundo.dir),
          cuadradoFinal: {
            x: Mundo.snake[Mundo.snake.length - 1].x,
            y: Mundo.snake[Mundo.snake.length - 1].y,
          },
          comodin: {
            velocidad: numeroRandomComida(Mundo.snake),
          },
          tiempos: {
            velocidad: retornarTiempos(0,0,0),
          }
        })

      } else if (comerItem(Mundo.snake, Mundo.comodines.reduccionPuntos) == true) {

        return update (Mundo, {
          snake: moveSnake(Mundo.snake, Mundo.dir),
          cuadradoFinal: {
            x: Mundo.snake[Mundo.snake.length - 1].x,
            y: Mundo.snake[Mundo.snake.length - 1].y,
          },
          comodin: {
            velocidad: numeroRandomComida(Mundo.snake),
          },
          tiempos: {
            velocidad: retornarTiempos(0,0,0),
          }
        })

      } else if (comerItem(Mundo.snake, Mundo.comodines.golpeAccionado) == true) {
        
        return update (Mundo, {
          snake: moveSnake(Mundo.snake, Mundo.dir),
          cuadradoFinal: {
            x: Mundo.snake[Mundo.snake.length - 1].x,
            y: Mundo.snake[Mundo.snake.length - 1].y,
          },
          comodin: {
            velocidad: numeroRandomComida(Mundo.snake),
          },
          tiempos: {
            velocidad: retornarTiempos(0,0,0),
          }
        })

      }

  // Si el tiempo Accionado de un comodín se encuentra diferente de 0
  } else if (Mundo.tiempos.velocidad.tiempoAccionado != 0 ||
    Mundo.tiempos.invencibilidad.tiempoAccionado != 0 ||
    Mundo.tiempos.inversion.tiempoAccionado != 0 ||
    Mundo.tiempos.tombos.tiempoAccionado != 0 ||
    Mundo.tiempos.reduccionPuntos.tiempoAccionado != 0 ||
    Mundo.tiempos.golpeAccionado != 0){

      //Tiempo accionado de Velocidad
      if (Mundo.tiempos.velocidad.tiempoAccionado > 0) {

        return update(Mundo, {
          snake: moveSnake(Mundo.snake, Mundo.dir),
          cuadradoFinal: {
            x: Mundo.snake[Mundo.snake.length - 1].x,
            y: Mundo.snake[Mundo.snake.length - 1].y,
          },
          tiempos: {
            velocidad: {
              tiempoAccionado: Mundo.tiempos.velocidad.tiempoAccionado - 1,
              tiempoActivo: 0,
              tiempoDesactivo: tiempoRandom(30,60) + Mundo.tiempos.invencibilidad.tiempoDesactivo + Mundo.tiempos.regeneracion.tiempoDesactivo + Mundo.tiempos.vidaMas.tiempoDesactivo + Mundo.tiempos.inversion.tiempoDesactivo + Mundo.tiempos.tombos.tiempoDesactivo + Mundo.tiempos.reduccionPuntos.tiempoDesactivo + Mundo.tiempos.golpeAccionado.tiempoDesactivo,
            }
          }
        });

      //Tiempo accionado de invencibilidad
      } else if (Mundo.tiempos.invencibilidad.tiempoAccionado > 0) {

        return update(Mundo, {
          snake: moveSnake(Mundo.snake, Mundo.dir),
          cuadradoFinal: {
            x: Mundo.snake[Mundo.snake.length - 1].x,
            y: Mundo.snake[Mundo.snake.length - 1].y,
          },
          tiempos: {
            invencibilidad: {
              tiempoAccionado: Mundo.tiempos.invencibilidad.tiempoAccionado - 1,
              tiempoActivo: 0,
              tiempoDesactivo: tiempoRandom(30,60) + Mundo.tiempos.velocidad.tiempoDesactivo + Mundo.tiempos.regeneracion.tiempoDesactivo + Mundo.tiempos.vidaMas.tiempoDesactivo + Mundo.tiempos.inversion.tiempoDesactivo + Mundo.tiempos.tombos.tiempoDesactivo + Mundo.tiempos.reduccionPuntos.tiempoDesactivo + Mundo.tiempos.golpeAccionado.tiempoDesactivo,
            }
          }
        });

      //Tiempo accionado de inversion
      } else if (Mundo.tiempos.inversion.tiempoAccionado > 0) {

        return update(Mundo, {
          snake: moveSnake(Mundo.snake, Mundo.dir),
          cuadradoFinal: {
            x: Mundo.snake[Mundo.snake.length - 1].x,
            y: Mundo.snake[Mundo.snake.length - 1].y,
          },
          tiempos: {
            inversion: {
              tiempoAccionado: Mundo.tiempos.inversion.tiempoAccionado - 1,
              tiempoActivo: 0,
              tiempoDesactivo: tiempoRandom(30,60) + Mundo.tiempos.invencibilidad.tiempoDesactivo + Mundo.tiempos.regeneracion.tiempoDesactivo + Mundo.tiempos.vidaMas.tiempoDesactivo + Mundo.tiempos.velocidad.tiempoDesactivo + Mundo.tiempos.tombos.tiempoDesactivo + Mundo.tiempos.reduccionPuntos.tiempoDesactivo + Mundo.tiempos.golpeAccionado.tiempoDesactivo,
            }
          }
        });

      //Tiempo accionado de tombos
      } else if (Mundo.tiempos.tombos.tiempoAccionado > 0) {

        return update(Mundo, {
          snake: moveSnake(Mundo.snake, Mundo.dir),
          cuadradoFinal: {
            x: Mundo.snake[Mundo.snake.length - 1].x,
            y: Mundo.snake[Mundo.snake.length - 1].y,
          },
          tiempos: {
            tombos: {
              tiempoAccionado: Mundo.tiempos.tombos.tiempoAccionado - 1,
              tiempoActivo: 0,
              tiempoDesactivo: tiempoRandom(30,60) + Mundo.tiempos.invencibilidad.tiempoDesactivo + Mundo.tiempos.regeneracion.tiempoDesactivo + Mundo.tiempos.vidaMas.tiempoDesactivo + Mundo.tiempos.velocidad.tiempoDesactivo + Mundo.tiempos.velocidad.tiempoDesactivo + Mundo.tiempos.reduccionPuntos.tiempoDesactivo + Mundo.tiempos.golpeAccionado.tiempoDesactivo,
            }
          }
        });

      //Tiempo accionado de reduccionPuntos
      } else if (Mundo.tiempos.reduccionPuntos.tiempoAccionado > 0) {

        return update(Mundo, {
          snake: moveSnake(Mundo.snake, Mundo.dir),
          cuadradoFinal: {
            x: Mundo.snake[Mundo.snake.length - 1].x,
            y: Mundo.snake[Mundo.snake.length - 1].y,
          },
          tiempos: {
            reduccionPuntos: {
              tiempoAccionado: Mundo.tiempos.reduccionPuntos.tiempoAccionado - 1,
              tiempoActivo: 0,
              tiempoDesactivo: tiempoRandom(30,60) + Mundo.tiempos.invencibilidad.tiempoDesactivo + Mundo.tiempos.regeneracion.tiempoDesactivo + Mundo.tiempos.vidaMas.tiempoDesactivo + Mundo.tiempos.velocidad.tiempoDesactivo + Mundo.tiempos.tombos.tiempoDesactivo + Mundo.tiempos.velocidad.tiempoDesactivo + Mundo.tiempos.golpeAccionado.tiempoDesactivo,
            }
          }
        });

      //Tiempo accionado de golpeAccionado
      } else if (Mundo.tiempos.golpeAccionado.tiempoAccionado > 0) {

        return update(Mundo, {
          snake: moveSnake(Mundo.snake, Mundo.dir),
          cuadradoFinal: {
            x: Mundo.snake[Mundo.snake.length - 1].x,
            y: Mundo.snake[Mundo.snake.length - 1].y,
          },
          tiempos: {
            inversion: {
              tiempoAccionado: Mundo.tiempos.golpeAccionado.tiempoAccionado - 1,
              tiempoActivo: 0,
              tiempoDesactivo: tiempoRandom(30,60) + Mundo.tiempos.invencibilidad.tiempoDesactivo + Mundo.tiempos.regeneracion.tiempoDesactivo + Mundo.tiempos.vidaMas.tiempoDesactivo + Mundo.tiempos.velocidad.tiempoDesactivo + Mundo.tiempos.tombos.tiempoDesactivo + Mundo.tiempos.reduccionPuntos.tiempoDesactivo + Mundo.tiempos.velocidad.tiempoDesactivo,
            }
          }
        });

      }
    

  //Snake normal
  } else {

    return update(Mundo, {
      snake: moveSnake(Mundo.snake, Mundo.dir),
      cuadradoFinal: {
        x: Mundo.snake[Mundo.snake.length - 1].x,
        y: Mundo.snake[Mundo.snake.length - 1].y,
      },
    });

  }
}

//Implemente esta función si quiere que su programa reaccione a eventos del mouse
function onMouseEvent(Mundo, event) {
  return update(Mundo, {});
}

/**
 * Actualiza el mundo cada vez que se oprime una tecla. Retorna el nuevo stado del mundo
 */
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

function onKeyEvent(Mundo, keyCode) {
  return update(Mundo, { dir: keyDirection(Mundo.dir, keyCode), moved: 0 });
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

function tiempoRandom(inicial,final) {
  return Math.floor(Math.random() * (final - inicial) + inicial);
}

/*
Propósito: Retornar si las posiciones 'x' y 'y' coinciden con la cabeza de Snake
Contrato: listaDeItems, JSON -> boolean
Prototipo: comerItem(snake,item)
Ejemplos:

*/

function comerItem(snake,item) {
  if (snake[0].x == item.x && snake[0].y == item.y) {
    return (true);
  } else {
    return (false);
  }
}

/*
Propósito: Retornar en una sola variable los parámetros introducidos por el usuario en un JSON
Contrato: number,number,number -> JSON
Prototipo: retortarTiempos(tiempoAccionado, tiempoActivo, tiempoDesactivo)
Ejemplos:

*/

function retornarTiempos(tiempoAccionado, tiempoActivo, tiempoDesactivo) {
  let comida = {
    tiempoAccionado: tiempoAccionado,
    tiempoActivo: tiempoActivo,
    tiempoDesactivo: tiempoDesactivo,
  }

  return (comida);
}

/*
Propósito: 
Contrato: 
Prototipo: 
Ejemplos:

*/


