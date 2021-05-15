//Cambio xd
let {
  append,
  cons,
  first,
  isEmpty,
  isList,
  length,
  rest,
  map,
  forEach,
} = functionalLight;

// Actualiza los atributos del objeto y retorna una copia profunda
function update(data, attribute) {
  return Object.assign({}, data, attribute);
}

//////////////////////// Mundo inicial
let Mundo = {};
////////////////////////

// Constantes para las escalas
const columnas = 20;
const filas = 20;
const lado = 20;
const ancho_canvas = columnas * lado;
const alto_canvas = filas * lado;
let canvas;

// Variables de Control
let arriba;
let abajo;
let derecha;
let izquierda;

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
 * Dibuja la comida
 */
function drawFood(food) {
  fill("crimson");
  rect(food.x * lado, food.y * lado, lado, lado);
}

/**
 * Esto se llama antes de iniciar el juego
 */
function setup() {
  frameRate(7);
  createCanvas(ancho_canvas, alto_canvas);
  // windowRezired();
  background(15, 200, 50);
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
    ñero: {
      x: columnas / 18,
      y: 10,
      dir: true,
    }
  };
}

function drawÑero(ñero){
  fill("blue");
  rect(ñero.x * lado, ñero.y * lado, lado, lado);
}

function drawSnake(snake){
  fill("white"),
  forEach(snake, (s) => {
    rect(s.x * lado, s.y * lado, lado, lado);
  });
}
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

function ñeroMove(ñero) {
  if (ñero.dir==true && ñero.y!=18 && ñero.y!=1) {
    return { x: 18, y: ñero.y + 1, dir: true };
  } if (ñero.y == 18) {
    return { x: 18, y: ñero.y - 1, dir: false };
  } if (ñero.dir == false && ñero.y != 1) {
    return { x: 18, y: ñero.y - 1, dir: false };
  } if (ñero.y == 1 && ñero.dir==false && ñero.x!=2) {
    return { x: ñero.x-1, y: 1, dir: false };
  } if (ñero.x== 2) {
    return { x: ñero.x + 1, y: 1, dir: true };
  } if (ñero.dir==true && nero.x!=2) {
    return { x: ñero.x + 1, y: 1, dir: true };
  }
}

function ñeroUpdate(){
  
}
// Dibuja algo en el canvas. Aqui se pone todo lo que quieras pintar
function drawGame(Mundo) {
  background("#38A649");
  fill(240, 240, 240);
  drawFood(Mundo.food);
  fill("white");
  drawÑero(Mundo.ñero)
  drawSnake(Mundo.snake)
}

// Esto se ejecuta en cada tic del reloj. Con esto se pueden hacer animaciones
function onTic(Mundo) {
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
  } else {
    if (Mundo.snake[0].x == Mundo.food.x && Mundo.snake[0].y == Mundo.food.y) {
      Mundo.snake.push({ x: 5, y: 5 });
      ñeroMove(Mundo.ñero);
      return update(Mundo, {
        snake: moveSnake(Mundo.snake, Mundo.dir),
        food: {
          x: Math.floor(Math.random() * (20 - 0) + 0),
          y: Math.floor(Math.random() * (20 - 0) + 0),
        },
        score: Mundo.score + 1,
        ñero: ñeroMove(Mundo.ñero)
      });
    } else {
    
      return update(Mundo, {
        snake: moveSnake(Mundo.snake, Mundo.dir),
        cuadradoFinal: {
          x: Mundo.snake[Mundo.snake.length - 1].x,
          y: Mundo.snake[Mundo.snake.length - 1].y,
        },
        ñero: ñeroMove(Mundo.ñero),
      });
    }
    //return update(Mundo, { snake: moveSnake(Mundo.snake, Mundo.dir) });
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
      brek;
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
  return update(Mundo, { dir: keyDirection(Mundo.dir, keyCode)});
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
