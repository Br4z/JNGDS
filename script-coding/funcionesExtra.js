//Get Random
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
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
  text('SCORE: ' + Mundo.score, 20, 45); //texto en el que se muestra conteo de la puntuacion
  textAlign(RIGHT); //alineacion del texto que muestra el score
  text('LIVES: ' + countLives, 540, 45); //texto en el que se muestra el contador de vidas
  textSize(30); //tamaño de la fuente
  text('Tiempo: ' + Mundo.timer, 350, 45); //temporizador
}

/* DRAW FONDO : DIBUJA EL FONDO DEL CANVAS */
function drawfondo() {
  fondo = loadImage('/backgrounds/FondoS.jpg'); //añadimos la imagen
  createCanvas(ancho_canvas, alto_canvas);
  background(fondo);
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
