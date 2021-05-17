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
const columnas = 48;
const filas = 28.05;
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
	fill('crimson');
	rect(food.x * lado, food.y * lado, lado, lado);
}

/**
 * Esto se llama antes de iniciar el juego
 */
function setup() {
	frameRate(7);
	fondo = loadImage('/Backgrounds/fond.jpg');
	createCanvas(ancho_canvas, alto_canvas);
	windowRezired();
	background(fondo);

	MundoMenu = {
	};
}

function windowRezired() {
	let escala = windowWidth / width;
	if (escala >= 1) {
		return;
	}
	canvas.style('width', width * escala + 'px');
	canvas.style('height', height * escala + 'px');
}

// Dibuja algo en el canvas. Aqui se pone todo lo que quieras pintar
function drawGame(Mundo) {
	background(fondo);
	title=createDiv("");
	title.position(0,0);
	title.id("tilte");
	title.class("txt-Neon");
	title.style("color","White");
	textSize(32);
	text('word', 10, 30);
	fill(0, 102, 153);



}

// Traer las fuentes
let fontRegular, fontItalic, fontBold;
// function preload() {
//   fontRegular = loadFont('assets/Regular.otf');
//   fontItalic = loadFont('assets/Italic.ttf');
//   fontBold = loadFont('assets/Bold.ttf');
// }

// Esto se ejecuta en cada tic del reloj. Con esto se pueden hacer animaciones
function onTic(Mundo) {

}

//Implemente esta función si quiere que su programa reaccione a eventos del mouse
function onMouseEvent(Mundo, event) {
	return update(Mundo, {});
}

/**
 * Actualiza el mundo cada vez que se oprime una tecla. Retorna el nuevo stado del mundo
 */
function keyPressed() {

}

function onKeyEvent(Mundo, keyCode) {

}

/*
Propósito: Retornar si la cabeza del Snake tiene la misma posición de uno de las posiciones de su cuerpo
Contrato: listaDeItems, JSON -> boolean
Prototipo: choqueSnake(snake, cabezaSnake)
Ejemplos:
choqueSnake([{x:3, y:3},{x:3, y:4}], {x:3, y:2}) -> false
choqueSnake([{x:3, y:3},{x:3, y:4}], {x:3, y:3}) -> true
*/


