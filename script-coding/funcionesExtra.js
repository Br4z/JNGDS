/*
Contrato: number , number => number
Propósito: Obtener un numero aleatorio entero que este dentro de un intervalo, tomando el numero minimo, pero no el numero maximo.
Prototipo: getRandom(min,max)
Ejemplos:
getRandom(3,55) => 43
getRandom(2,3) => 2
getRandom(0,5) => 3
*/
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

/*
Contrato: none => none (No recibe ni retorna nada)
Propósito: Dibujar la parte superior del Canvas, es decir el texto de Score y el texto de Vidas
Prototipo: drawUi()
Adicional: Para mayor información, dentro de la funcion esta detallado lo que se usa
*/
function drawUi() {
    //fill => Color de relleno del texto
    fill("#ffff");
    //stroke => Color del borde del texto
    stroke("#0E0D0D");
    //strokeWeight => Anchura del borde del texto
    strokeWeight(5);
    //textSize => Tamaño de la fuente
    textSize(55);
    //textFont => Fuente que se usara
    textFont(myFont);
    //textAlign => Alineacion del texto para el score
    textAlign(LEFT);
    //texto en el que se muestra conteo de la puntuacion
    text("SCORE: " + Mundo.score, 20, 50);
    //alineacion del texto que muestra lives
    textAlign(RIGHT);
    //texto en el que se muestra el contador de vidas
    text("LIVES: " + countLives, 540, 50);
    //Si quieres ver el tiempo puedes descomentar esta línea (No recomendado debido a que uso inicialmente para efectos practicos pero no se modifico y arreglo su aspecto visual)
    // text('Tiempo: ' + Mundo.timer, 350, 45); //temporizador
}

/*
Contrato: none => none (No recibe ni retorna nada)
Propósito: Dibujar el Fondo del canvas
Prototipo: dibujaFondo
Adicional : Dentro de la funcion encontraras mas informacion
*/
function drawfondo() {
    //Guardamos en una constante (Previamente inicializada) la imagen de fondo
    fondo = loadImage("/backgrounds/FondoS.jpg"); //añadimos la imagen
    //Creamos un canvas con un acnho y alto especificado anteriormente
    //ancho_canvas: 560
    //alto_canvas: 520
    createCanvas(ancho_canvas, alto_canvas);
    //Colocar como background del canvas el fondo al cual le hicimos load
    background(fondo);
}

/*
Contrato: none => none (No recibe ni retorna nada)
Propósito: Mejorar como se ve la pantalla en cuando a escalas (Esta implementación fue vista en internet, la cual era posible implementar en el juego)
Prototipo: windowRezired()
*/
function windowRezired() {
    let escala = windowWidth / width;
    if (escala >= 1) {
        return;
    }
    canvas.style("width", width * escala + "px");
    canvas.style("height", height * escala + "px");
}
