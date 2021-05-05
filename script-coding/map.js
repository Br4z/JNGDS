let {  append,cons,first,isEmpty,isList,length,rest,map,forEach,} = functionalLight;

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
  rect(food.x * lado , food.y * lado, lado , lado);
}

/**
 * Esto se llama antes de iniciar el juego
 */
function setup() {
  frameRate(7);
  createCanvas(ancho_canvas, alto_canvas);
  // windowRezired();
  background(15, 200, 50);
  abajo = createVector(0,1)
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
  };
}

function posicionarComida(){
  comida = createVector(int(random(columnas)),int(random(filas)))
}


function windowRezired(){
  let escala = windowWidth / width;
  if (escala >= 1){
    return
  }
  canvas.style("width",width*escala+"px")
  canvas.style("height",height*escala+"px")
}

// Dibuja algo en el canvas. Aqui se pone todo lo que quieras pintar
function drawGame(Mundo) {
  background('#38A649');
  fill(240, 240, 240);
  drawFood(Mundo.food);

  forEach(Mundo.snake, (s) => {
    rect(s.x * lado, s.y * lado, lado, lado);
  });
}

// Esto se ejecuta en cada tic del reloj. Con esto se pueden hacer animaciones
function onTic(Mundo) {
  if (
    Mundo.snake[0].x > columnas -1 ||
    Mundo.snake[0].y > filas -1 ||
    Mundo.snake[0].x < 0 ||
    Mundo.snake[0].y < 0
  ) {
    textAlign(CENTER, CENTER)
    textSize(50)
    text(" Has perdido", width/2, height/2);
    rect(Mundo.cuadradoFinal.x * lado, Mundo.cuadradoFinal.y * lado, lado, lado);
    return update(Mundo, {});
  } else {
    if (Mundo.snake[0].x == Mundo.food.x && Mundo.snake[0].y == Mundo.food.y) {
        Mundo.snake.push({ x: 5, y: 5 });
        return update(Mundo, {
          snake: moveSnake(Mundo.snake, Mundo.dir),
          food: {
            x: Math.floor(Math.random() * (20 - 0) + 0),
            y: Math.floor(Math.random() * (20 - 0) + 0),
          },
        });

    } else {
      return update(Mundo, { snake: moveSnake(Mundo.snake, Mundo.dir), cuadradoFinal: {x: Mundo.snake[Mundo.snake.length - 1].x, y: Mundo.snake[Mundo.snake.length - 1].y}});
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
function keyPressed(){
  switch (keyCode) {
		case UP_ARROW:
      if (Mundo.dir == abajo) {
        break }
			if (Mundo.dir = arriba);
			break;
		case RIGHT_ARROW:
      if (Mundo.dir == izquierda) {
				break;
			}
			if (Mundo.dir = derecha);
			brek;
		case DOWN_ARROW:
      if (Mundo.dir == arriba) {
				break;
			}
			if (Mundo.dir = abajo);
			brek;
		case LEFT_ARROW:
      if (Mundo.dir == derecha) {
				break;
			}
			if (Mundo.dir = izquierda);
			break;
	}
}

function onKeyEvent(Mundo, keyCode) {
    return update(Mundo, { dir: keyDirection(Mundo.dir, keyCode), moved: 0 });

}

