const tiempoRetrasoComidas = 80;

/**
 * Devuelve el nuevo score con las respectivas configuraciones del comodin correspondiente y el puntaje que le corresponde sumar
 * @param {*} puntaje
 * @param {*} comodin
 * @example puntajeComida(3, 0) => Mundo.score = Mundo.score + 3, Mundo.comidas[0].tiempoAccionado = 0, Mundo.retrasoComidas = tiempoRetrasoComidas
 */
function puntajeComida(puntaje, comodin) {
    comida1.play();
    update(Mundo, (Mundo.score = Mundo.score + puntaje));
    posicionInactivaComida(comodin);
    update(Mundo, (Mundo.comidas[comodin].tiempoAccionado = 0));
    update(Mundo, (Mundo.retrasoComidas = tiempoRetrasoComidas));
}

/**
 * Le ubica una posicion inactiva a la comida, es decir, la úbica por fuera del Canvas
 * @param {*} nComida
 * @example posicionInactivaComida(1) => Mundo.comidas[1].x = -1, Mundo.comidas[1].y = -1, Mundo.retrasoComidas = tiempoRetrasoComidas
 */
function posicionInactivaComida(nComida) {
    update(Mundo, (Mundo.comidas[nComida].x = -1));
    update(Mundo, (Mundo.comidas[nComida].y = -1));
    update(Mundo, (Mundo.retrasoComidas = tiempoRetrasoComidas));
}

/**
 * resta uno al retraso de las retrasoComidas
 * @example restaRetraso() => Mundo.retrasoComidas = 40 => Mundo.retrasoComidas = 39
 */
function restaRetrasoComidas() {
    update(Mundo, Mundo.retrasoComidas--);
}

/**
 * Selecciona una comida aleatoriamente para reaparecer en el Canva con ubicaciones y un tiempoActivo aleatorio
 * @example nuevasComidas() => Mundo.comidas[0].tiempoActivo = 56, Mundo.comidas[0].x = 5, Mundo.comidas[0].y = 7
 * @example nuevasComidas() => Mundo.comidas[3].tiempoActivo = 51, Mundo.comidas[3].x = 5, Mundo.comidas[3].y = 18
 */
function nuevasComidas() {
    const listaComidas = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 3, 0, 0, 0, 0, 1, 1, 1, 2, 2, 2, 0, 2, 0, 0, 0, 1, 1];
    const numeroComida = listaComidas[getRandom(0, length(listaComidas))];

    update(Mundo, (Mundo.comidas[numeroComida].tiempoActivo = getRandom(40, 60)));
    update(Mundo, (Mundo.comidas[numeroComida].x = getRandom(4, 24)));
    update(Mundo, (Mundo.comidas[numeroComida].y = getRandom(4, 24)));
}

/**
 * Le asigna nuevamente a Mundo.retrasoComidas el tiempo de Retraso
 * @example nuevoRetrasoComidas() => Mundo.retrasoComidas = tiempoRetrasoComidas
 */
function nuevoRetrasoComidas() {
    update(Mundo, (Mundo.retrasoComidas = tiempoRetrasoComidas));
}
