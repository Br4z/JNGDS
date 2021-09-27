
// Esta es la función que pinta todo. Se ejecuta 60 veces por segundo.
// No cambie esta función. Su código debe ir en drawGame
function draw() {
    drawGame(Mundo);
    Mundo = onTic(Mundo);
};

// Esta función se ejecuta cada vez que presionamos una tecla.
// No cambie esta función. Su código debe ir en onKeyEvent
function keyPressed() {
    Mundo = onKeyEvent(Mundo, keyCode);
}

// Esta función se ejecuta cada vez movemos el mouse.
// No cambie esta función. Su código debe ir en onMouseEvent
function mouseMoved() {
    Mundo = onMouseEvent(Mundo,
        { action: "move", mouseX: mouseX, mouseY: mouseY });
}

// Estas funciones controlan los eventos del mouse.
// No cambie estas funciones. Su código debe ir en OnMouseEvent
function mouseClicked() {
    Mundo = onMouseEvent(Mundo,
        { action: "click", mouseX: mouseX, mouseY: mouseY, mouseButton: mouseButton });
}
// Estas funciones controlan los eventos del mouse.
// No cambie estas funciones. Su código debe ir en OnMouseEvent
function mouseDragged() {
    Mundo = onMouseEvent(Mundo,
        { action: "drag", mouseX: mouseX, mouseY: mouseY, mouseButton: mouseButton });
}

// Estas funciones controlan los eventos del mouse.
// No cambie estas funciones. Su código debe ir en OnMouseEvent
function mousePressed() {
    Mundo = onMouseEvent(Mundo,
        { action: "press", mouseX: mouseX, mouseY: mouseY, mouseButton: mouseButton });
}
// Estas funciones controlan los eventos del mouse.
// No cambie estas funciones. Su código debe ir en OnMouseEvent
function mouseReleased() {
    Mundo = onMouseEvent(Mundo,
        { action: "release", mouseX: mouseX, mouseY: mouseY, mouseButton: mouseButton });
}
