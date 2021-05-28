//Vamos a usar http://processingjs.org/
// o https://p5js.org/reference/

// Importamos las librerias
let { append, cons, first, isEmpty, isList, length, rest } = functionalLight;

// Actualiza los atributos del objeto y retorna una copia profunda
function update(data, attribute) {
  return Object.assign({}, data, attribute);
}

//////////////////////// Mundo inicial
let Mundo = {}
////////////////////////
/**
 * Ejemplo de animación usando los evento de reloj del procesador. Es la animación mas simple.
 * No requiere interacción con el usuario
 */
const WIDTH = 400;
const HEIGHT = 400;


/**
 * Esto se llama antes de iniciar el juego
 */
function setup() {
  frameRate(60);
  createCanvas(WIDTH, HEIGHT);
  background(15, 200, 50);
  Mundo = { x: 1, y: 100, ancho: 60, alto: 60, dirx: 2, diry: 2};
}

// Dibuja algo en el canvas. Aqui se pone todo lo que quieras pintar
function drawGame(Mundo){
  background(10, 200, 50);
  fill(240, 240, 240);
  rect(Mundo.x, Mundo.y, Mundo.ancho, Mundo.alto);
}


// Esto se ejecuta en cada tic del reloj. Con esto se pueden hacer animaciones
function onTic(Mundo){
  if( Mundo.x + Mundo.ancho >= WIDTH)
    return update(Mundo, { x: Mundo.x - Mundo.dirx, dirx: -Mundo.dirx});
  else {
    if( Mundo.x <= 0) {
      return update(Mundo, { x: Mundo.x - Mundo.dirx, dirx: -Mundo.dirx});
    }
  }

  if( Mundo.y + Mundo.alto >= HEIGHT)
    return update(Mundo, { y: Mundo.y - Mundo.diry, diry: -Mundo.diry});
  else {
    if( Mundo.y <= 0) {
      return update(Mundo, { y: Mundo.y - Mundo.diry, diry: -Mundo.diry});
    }
  }

  return update(Mundo, { x: Mundo.x + Mundo.dirx, y: Mundo.y + Mundo.diry});
}

//Implemente esta función si quiere que su programa reaccione a eventos del mouse
function onMouseEvent (Mundo, event) {
   return update(Mundo,{});
}


//Implemente esta función si quiere que su programa reaccione a eventos del teclado

function onKeyEvent (Mundo, keyCode) {
   return update(Mundo,{});
}
