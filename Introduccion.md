# Snake
Bienvenido a esta pequeña introducción de nuestro código. A continuación encontraras:
1. Estructura del código
   - Funciones base (No modificables)
   - Funciones base (Modificables)
   - Funciones auxiliares

## Estructura del código
Nuestro código base se encuentra en este orden: script-coding -> map.js. Este código se encuentra realizado mediante el paradigma funcional, y por esta razón todas las funciones diseñadas para la creación de nuestro videojuego son realizadas a partir de funciones.

### Funciones base (No modificables)
Considerando estas funciones como aquellas que no deben de ser modificadas en ningún momento por cumplir tareas básicas pero base del código, tenemos:

**Function update():**
```javascript
function update(data, attribute) {
  return Object.assign({}, data, attribute);
}
```
Su función es retornar y actualizar los datos del mundo, poniendo como primer atributo nuestro mundo y de segundo atributo los elementos que deseamos cambiar y por que dato cambiarlo:
```javascript
//Un ejemplo de Update
return update(Mundo, {
        snake: moveSnake(Mundo.snake, Mundo.dir),
        food: numeroRandomComida(Mundo.snake),
        score: Mundo.score + 1,
      }
```

**Function moveSnake()**
```javascript
function moveSnake(snake, dir) {
  const head = first(snake);
  return cons(
    { x: head.x + dir.x, y: head.y + dir.y },
    snake.slice(0, length(snake) - 1)
  );
}
```
Su función es actualizar las posiciones de cada "parte" o "cuadrado" del Snake, realizando esta tarea en el siguiente orden:

1. Toma como cabeza el primer cuadrado de Snake
2. La cabeza de Snake se moverá +1 posición dependiendo de la dirección en la que se encuentre (Es decir, si se encuentra en la dirección "arriba" solamente sumara +1 a la propiedad "y").
3. La siguiente parte retorna el cuerpo completo del Snake que se tenía con excepción de la última parte, borrandolo con slice

**Mundo**
```javascript
let Mundo = {};
```
Su función es inicializar el mundo para usarlo después, es declarada como un *let* para así utilizarla globalmente en nuestro código.

### Funciones base (Modificables)
Considerando estas funciones como aquellas que también cumplen tareas básicas de nuestro juego pero que aun así podemos modificar para que estas realicen una determinada función dependiendo de que función modifiquemos, tenemos:

**Function setup()**
```javascript
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
  };
}
```
Dentro de esta función configuramos:
- El frameRate -Que es la velocidad a la que deseamos que se actualize nuestro código-.
- Background
- Declaramos nuestra variable "Mundo" con todos los valores que deseamos que tenga nuestro juego.
De la misma manera, es dentro de esta función donde modificamos todos los aspectos relacionados con la configuración de nuestro código.

**Function drawGame()**
```javascript
function drawGame(Mundo) {
  background("#38A649");
  fill(240, 240, 240);
  drawFood(Mundo.food);

  forEach(Mundo.snake, (s) => {
    rect(s.x * lado, s.y * lado, lado, lado);
  });
}
  ```

Dentro de esta función configuramos todos los aspectos gráficos del código, como lo son el background, o tambien incluyendo las funciones encargadas de dibujar los elementos gráficos del videojuego.

**Function onTic**
```javascript
function onTic(Mundo) {
  [...]
}
```
Esta función se actualizará constantemente a la velocidad que hallamos establecido en el frameRate. Dentro de esta se ejecutaran todas las funciones o acciones que se encuentren dentro de ellas constantemente mientras corre el código.

**Function onKeyEvent()**
```javascript
function onKeyEvent(Mundo, keyCode) {
  return update(Mundo, { dir: keyDirection(Mundo.dir, keyCode), moved: 0 });
}
```

Esta función ejecutará todas las acciones relaccionadas a la interacción del teclado.

**Function onMouseEvent()**
```javascript
function onMouseEvent(Mundo, event) {
  [...]
}
```

Esta función ejecutará todas las acciones relacionadas a la interacción del ratón, tanto por botónes como por movimiento o posición de este.

