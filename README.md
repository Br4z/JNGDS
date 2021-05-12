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
```
function update(data, attribute) {
  return Object.assign({}, data, attribute);
}
```
Su función es retornar y actualizar los datos del mundo, poniendo como primer atributo nuestro mundo y de segundo atributo los elementos que deseamos cambiar y por que dato cambiarlo:
```
//Un ejemplo de Update
return update(Mundo, {
        snake: moveSnake(Mundo.snake, Mundo.dir),
        food: numeroRandomComida(Mundo.snake),
        score: Mundo.score + 1,
      }
```

**Function moveSnake()**
```
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
