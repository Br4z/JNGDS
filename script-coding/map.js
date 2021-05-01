let {  append,cons,first,isEmpty,isList,length,rest,map,forEach,} = functionalLight;

// Actualiza los atributos del objeto y retorna una copia profunda
function update(data, attribute) {
  return Object.assign({}, data, attribute);
}

//////////////////////// Mundo inicial
let Mundo = {};
////////////////////////
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

const dx = 20;
const dy = 20;

/**
 * Dibuja la comida
 */
function drawFood(food) {
  fill(200, 20, 10);
  ellipse(food.x * dx + 10, food.y * dy + 10, dx, dy);
}

/**
 * Esto se llama antes de iniciar el juego
 */
function setup() {
  frameRate(5);
  createCanvas(400, 400);
  background(15, 200, 50);
  Mundo = {
    snake: [
      { x: 3, y: 1 },
      { x: 2, y: 1 },
      { x: 1, y: 1 },
    ],
    dir: { x: 1, y: 0 },
    food: {
      x: Math.floor(Math.random() * (20 - 0) + 0),
      y: Math.floor(Math.random() * (20 - 0) + 0),
    },
  };
}

// Dibuja algo en el canvas. Aqui se pone todo lo que quieras pintar
function drawGame(Mundo) {
  background(10, 200, 50);
  fill(240, 240, 240);
  drawFood(Mundo.food);

  forEach(Mundo.snake, (s) => {
    rect(s.x * dx, s.y * dy, dx, dy);
  });
}

// Esto se ejecuta en cada tic del reloj. Con esto se pueden hacer animaciones
function onTic(Mundo) {
  console.log(xInSnake(Mundo));
  if (
    Mundo.snake[0].x > 19 ||
    Mundo.snake[0].y > 19 ||
    Mundo.snake[0].x < 0 ||
    Mundo.snake[0].y < 0
  ) {
    text("Has perdido", 20, 20);
    return update(Mundo, {});
  } else {
    if (Mundo.snake[0].x == Mundo.food.x && Mundo.snake[0].y == Mundo.food.y) {
      if (Mundo.dir == {y: -1, x:0}) {
        Mundo.snake.push({ x:xInSnake() , y: yInSnake() + 1 });
      } else if (Mundo.dir == { y: 1, x: 0 }) {
        Mundo.snake.push({x:xInSnake(), y: yInSnake() + 1});
      } else if (Mundo.dir == { y: 0, x: -1 }) {
        Mundo.snake.push({x:xInSnake() + 1, y: yInSnake()});
      } else if (Mundo.dir == { y: 0, x: 1}) {
        Mundo.snake.push({x:xInSnake() - 1, y: yInSnake()});
      }
        Mundo.snake.push({ x: 5, y: 5 });
        return update(Mundo, {
          snake: moveSnake(Mundo.snake, Mundo.dir),
          food: {
            x: Math.floor(Math.random() * (20 - 0) + 0),
            y: Math.floor(Math.random() * (20 - 0) + 0),
          },
        });
      
    } else {
      return update(Mundo, { snake: moveSnake(Mundo.snake, Mundo.dir) });
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
function keyDirection(dir, keyCode) {
  switch (keyCode) {
    case UP_ARROW:
      if (dir.y == 1) return dir;
      else return { y: -1, x: 0 };
      break;
    case DOWN_ARROW:
      if (dir.y == -1) return dir;
      else return { y: 1, x: 0 };
      break;
    case LEFT_ARROW:
      if (dir.x == 1) return dir;
      else return { y: 0, x: -1 };
      break;
    case RIGHT_ARROW:
      if (dir.x == -1) return dir;
      else return { y: 0, x: 1 };
      break;
    default:
      
      return dir;
  }
}

function onKeyEvent(Mundo, keyCode) {
    return update(Mundo, { dir: keyDirection(Mundo.dir, keyCode), moved: 0 });
  
}

/**
 * Nos retorna la posición x del último JSON de la lista Snake
 */
function xInSnake(Mundo){
  return Mundo.snake[Mundo.snake.length - 1].x
}

/**
 * Nos retorna la posición y del último JSON de la lista Snake
 */
function yInSnake(Mundo) {
  return Mundo.snake[Mundo.snake.length - 1].y;
}

