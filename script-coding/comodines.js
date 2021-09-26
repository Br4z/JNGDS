//FUNCIONES DE LOS COMODINES EN GENERAL

/*
Propósito: Realizar un update de el tiempo activo de un comodín, restandole 1
Contrato: JSON -> number
Prototipo: restaTiempo(nComodin)
Ejemplos:
restaTiempo({x: 7, y: 14, tiempoActivo: 20, tiempoAccionado: 0}) -> 19
{x: 0, y: 1, tiempoActivo: 1, tiempoAccionado: 0} -> 0
*/
function restaTiempo(nComodin){
  update(Mundo, Mundo.comodines[nComodin].tiempoActivo--);
}

/*
Propósito: Realizar un update de las posiciones de un comodin, dejandolo por fuera del canvas, y por tanto, inactivo
Contrato: JSON -> {x: -1, y: -1,}, tiempoRetraso
Prototipo: posicionInactiva(nComodin)
Ejemplos:
posicionInactiva({x: 7, y: 14, tiempoActivo: 0, tiempoAccionado: 0}) -> {x: -1, y: -1, tiempoActivo: 0, tiempoAccionado: 0}
*/
function posicionInactiva(nComodin){
  update(Mundo, Mundo.comodines[nComodin].x = -1);
  update(Mundo, Mundo.comodines[nComodin].y = -1);
  //nuevosComodines();
  update(Mundo, Mundo.retrasoComodines = tiempoRetraso);
  }

/*
Propósito: Retornar una nueva posición y un nuevo valor de tiempoActivo a un comodín, ambos valores aleatorios
Contrato: null -> Mundo.comodines[numeroComodin] -> JSON
Prototipo: nuevosComodines()
Ejemplos:
nuevosComodines() -> Mundo.comodines[3] -> {x: 7, y: 14, tiempoActivo: 53, tiempoAccionado: 0}
nuevosComodines() -> Mundo.comodines[6] -> {x: 11, y: 21, tiempoActivo: 44, tiempoAccionado: 0}
*/
function nuevosComodines() {
  //Comodines Aqui
  //const numeroComodin = 5;
  const listaComodin = [0,1,2,3,4,5,6,7,4,5,6,7,4,5,6,7,0,1,2,3,0,1,2,3,4,5,6,7,4,5,6,7,4,5,6,7,0,1,2,3,0,1,2,3,8,4,5,6,7,4,5,6,7,4,5,6,7,0,1,2,3];
  const numeroComodin = listaComodin[getRandom(0,length(listaComodin))];
  // const numeroComodin = 5;
  update(
    Mundo,
    (Mundo.comodines[numeroComodin].tiempoActivo = getRandom(40, 60))
  );
  update(Mundo, (Mundo.comodines[numeroComodin].x = getRandom(2, 26)));
  update(Mundo, (Mundo.comodines[numeroComodin].y = getRandom(4, 25)));
}

/*
Propósito: Restar el retraso de los comodines
Contrato: null -> number
Prototipo: restaRetraso()
Ejemplos:
restaRetraso() -> Mundo.retrasoComodines--
*/
function restaRetraso(){
  update(Mundo, Mundo.retrasoComodines--);
}

/*
Propósito: Darle un nuevo valor al retraso de los comodines
Contrato: null -> number
Prototipo: nuevoRetraso()
Ejemplos:
nuevoRetraso() -> tiempoRetraso
*/

function nuevoRetraso(){
  update(Mundo, Mundo.retrasoComodines = tiempoRetraso);
}

const tiempoRetraso = 80;

//ACCIONES DE LOS COMODINES

/**
 * Realiza la acción del comodín de Velocidad
 * @example accionVelocidad() => update(Mundo, Mundo.snake = moveSnake(...)),
 * @example accionVelocidad(), Mundo.comodines[0].tiempoActivo = 0 => Mundo.comodines[0].tiempoActivo = 40
 * @example accionVelocidad(), Mundo.comodines[0].tiempoActivo = 40 => Mundo.comodines[0].tiempoActivo = 39
 */
function accionVelocidad(){
  update(Mundo, Mundo.snake = moveSnake(Mundo.snake, Mundo.dir));
  update(Mundo, Mundo.comodines[0].tiempoActivo = 0)
  if (Mundo.comodines[0].tiempoAccionado == 0){
    update(Mundo, Mundo.score++);
    sonidoVelocidad1.play()
    posicionInactiva(0);
    update(Mundo, Mundo.comodines[0].tiempoAccionado = 40);
    //nuevosComodines();
    update(Mundo, Mundo.retrasoComodines = tiempoRetraso);
  } else {
    update(Mundo, Mundo.comodines[0].tiempoAccionado--)
  }

  if (Mundo.comodines[0].tiempoAccionado == 1){
    sonidoVelocidad2.play()
  }
}

/**
 * Realiza la acción del comodín de Invencibilidad
 * @returns {boolean}
 * @example accionInvencibilidad(), Mundo.comodines[1].tiempoActivo = 0 => Mundo.comodines[1].tiempoActivo = 40
 * @example accionInvencibilidad(), Mundo.comodines[1].tiempoActivo = 40 => Mundo.comodines[1].tiempoActivo = 39
 */
function accionInvencibilidad(){
  update(Mundo, Mundo.comodines[1].tiempoActivo = 0);
  if (Mundo.comodines[1].tiempoAccionado == 0){
    sonidoInvencibilidad2.play();
    posicionInactiva(1);
    update(Mundo, Mundo.comodines[1].tiempoAccionado = 60);
    update(Mundo, Mundo.retrasoComodines = tiempoRetraso);

  } else {
    update(Mundo, Mundo.comodines[1].tiempoAccionado--);

  }

  if (Mundo.comodines[1].tiempoAccionado > 1){
    return false;

  } else {
    sonidoInvencibilidad1.play();
    return true;
  }
}

/**
 * Realiza la acción del comodín de AumentoPuntos
 * @example accionAumentoPuntos() => update(Mundo, Mundo.scoreMas = 2)
 * @example accionAumentoPuntos(), Mundo.comodines[2].tiempoActivo = 0 => Mundo.comodines[2].tiempoActivo = 40
 * @example accionAumentoPuntos(), Mundo.comodines[2].tiempoActivo = 40 => Mundo.comodines[2].tiempoActivo = 39
 */
function accionAumentoPuntos(){
  update(Mundo, Mundo.comodines[2].tiempoActivo = 0);
  if (Mundo.comodines[2].tiempoAccionado == 0){
    sonidoPuntos1.play();
    posicionInactiva(2);
    update(Mundo, Mundo.comodines[2].tiempoAccionado = 60);
    update(Mundo, Mundo.retrasoComodines = tiempoRetraso);
    update(Mundo, Mundo.scoreMas = 2);

  } else if (Mundo.comodines[2].tiempoAccionado == 1){
    sonidoPuntos2.play();
    update(Mundo, Mundo.scoreMas = 1);
    update(Mundo, Mundo.comodines[2].tiempoAccionado--);

  } else {
    update(Mundo, Mundo.comodines[2].tiempoAccionado--);

  }
}

/**
 * Realiza la acción del comodín de vidaMas
 * @example accionVidaMas() => update(Mundo, Mundo.lives++)
 * @example accionVidaMas(), Mundo.comodines[3].tiempoActivo = 0 => Mundo.comodines[3].tiempoActivo = 40
 * @example accionVidaMas(), Mundo.comodines[3].tiempoActivo = 40 => Mundo.comodines[3].tiempoActivo = 39
 */
function accionVidaMas(){
  sonidoVidaMas.play();
  update(Mundo, Mundo.comodines[3].tiempoActivo = 0);
  posicionInactiva(3);
  update(Mundo, Mundo.comodines[3].tiempoAccionado = 0);
  update(Mundo, Mundo.retrasoComodines = tiempoRetraso);
  update(Mundo, Mundo.lives++);
}

/**
 * Realiza la acción del comodín de Inversion
 * @returns {variable}
 * @example accionInversion() => update(Mundo, Mundo.dir = direccionInversion(Mundo.snake));
 * @example accionInversion() => update(Mundo, Mundo.snake = reversedSnake);
 * @example accionInversion(), Mundo.comodines[4].tiempoActivo = 0 => Mundo.comodines[4].tiempoActivo = 40
 * @example accionInversion(), Mundo.comodines[4].tiempoActivo = 40 => Mundo.comodines[4].tiempoActivo = 39
 */
function accionInversion(){
  sonidoInvertir.play();
  update(Mundo, Mundo.comodines[4].tiempoActivo = 0)
  posicionInactiva(4);
  update(Mundo, Mundo.comodines[4].tiempoAccionado = 0);
  update(Mundo, Mundo.retrasoComodines = tiempoRetraso);

  /**
 * Invierte la dirección que tomara el Snake en su cola
 * @param {lista} snake
 * @returns {variable}
 * @example direccionInversion([{x:3, y:0}, {x:2, y:0}, {x:1, y:0}, {x:0, y:0}]) => snake[1].x + 1 == snake[0].x => derecha
 */
  function direccionInversion(snake){
    if(snake[1].x - 1 == snake[0].x){
      return izquierda;

    } else if (snake[1].x + 1 == snake[0].x){
      return derecha;

    } else if (snake[1].y + 1 == snake[0].y){
      return abajo;

    } else if (snake[1].y - 1 == snake[0].y){
      return arriba;

    }
  }

  const reversedSnake = Mundo.snake.reverse();
  update(Mundo, Mundo.dir = direccionInversion(Mundo.snake));
  update(Mundo, Mundo.snake = reversedSnake);

}

/**
 * Realiza la acción del comodín de tombos
 * @example accionVidaMas() => dibujarEnemigo(...), mueveEnemigo(...), compMiniEnemigos(...)
 * @example accionVidaMas(), Mundo.comodines[5].tiempoActivo = 0 => Mundo.comodines[5].tiempoActivo = 40
 * @example accionVidaMas(), Mundo.comodines[5].tiempoActivo = 40 => Mundo.comodines[5].tiempoActivo = 39
 */
function accionTombos(){
  update(Mundo, Mundo.comodines[5].tiempoActivo = 0)
  if (Mundo.comodines[5].tiempoAccionado == 0){
    update(Mundo, Mundo.score = Mundo.score + 3);
    sonidoTombos1.play();
    posicionInactiva(5);
    update(Mundo, Mundo.comodines[5].tiempoAccionado = 60);
    update(Mundo, Mundo.retrasoComodines = tiempoRetraso);
  } else {
    // console.log("Hola");
    dibujaEnemigo(Mundo.listaEnemigos)
    console.log(Mundo.activosMiniEnemigos)
    mueveEnemigo(Mundo.listaEnemigos)
    compMiniEnemigos(Mundo.listaEnemigos)
    update(Mundo, Mundo.comodines[5].tiempoAccionado--)
  }

  if (Mundo.comodines[0].tiempoActivo == 1){
    sonidoVelocidad2.play();
  }
}

/**
 * Realiza la acción del comodín de reduccionPuntos
 * @example accionReduccionPuntos() => update(Mundo, Mundo.scoreMas = -1)
 * @example accionReduccionPuntos(), Mundo.comodines[6].tiempoActivo = 0 => Mundo.comodines[6].tiempoActivo = 40
 * @example accionReduccionPuntos(), Mundo.comodines[6].tiempoActivo = 40 => Mundo.comodines[6].tiempoActivo = 39
 */
function accionReduccionPuntos(){
  update(Mundo, Mundo.comodines[6].tiempoActivo = 0);
  console.log(Mundo.comodines[6].tiempoAccionado);
  if (Mundo.comodines[6].tiempoAccionado == 0){
    update(Mundo, Mundo.score = Mundo.score + 3);
    sonidoPuntos2.play();
    posicionInactiva(6);
    update(Mundo, Mundo.comodines[6].tiempoAccionado = 60);
    update(Mundo, Mundo.retrasoComodines = tiempoRetraso);
    update(Mundo, Mundo.scoreMas = -1);

  } else if (Mundo.comodines[6].tiempoAccionado == 1){
    sonidoPuntos1.play();
    console.log("Hola");
    update(Mundo, Mundo.scoreMas = 1);
    update(Mundo, Mundo.comodines[6].tiempoAccionado--);

  } else {
    update(Mundo, Mundo.comodines[6].tiempoAccionado--);

  }
}

/**
 * Realiza la acción del comodín de golpeAccionado
 * @example accionGolpeAccionado() => Mundo.comodines[7].tiempoAccionado > 2 => update(Mundo, (Mundo.lives = 0))
 * @example accionGolpeAccionado() => Mundo.comodines[7].tiempoAccionado < 2 => update(Mundo, (Mundo.lives = window.vidasOficial))
 * @example accionGolpeAccionado(), Mundo.comodines[7].tiempoActivo = 0 => Mundo.comodines[7].tiempoActivo = 40
 * @example accionGolpeAccionado(), Mundo.comodines[7].tiempoActivo = 40 => Mundo.comodines[7].tiempoActivo = 39
 */
function accionGolpeAccionado() {
  update(Mundo, (Mundo.comodines[7].tiempoActivo = 0));
  if (Mundo.comodines[7].tiempoAccionado == 0) {
    update(Mundo, Mundo.score = Mundo.score + 4);
    sonidoGolpeAccionado1.play();
    window.vidasOficial = Mundo.lives;
    posicionInactiva(7);
    update(Mundo, (Mundo.comodines[7].tiempoAccionado = 60));
    update(Mundo, (Mundo.retrasoComodines = tiempoRetraso));
  } else {
    update(Mundo, Mundo.comodines[7].tiempoAccionado--);
  }

  if (Mundo.comodines[7].tiempoAccionado > 0) {
    update(Mundo, (Mundo.lives = 0));
  } else {
    sonidoGolpeAccionado2.play();
    update(Mundo, (Mundo.lives = window.vidasOficial));
  }
}

/**
 * Realiza la accion del comodín Aleatorio
 * @example accionAleatorio(), ProbabilidadComodines == 0 => Mundo.score > 20 => update(Mundo,Mundo.score = Mundo.score-20)
 * @example accionAleatorio(), ProbabilidadComodines == 1 => update(Mundo,Mundo.score = Mundo.score+20)
 * @example accionAleatorio(), Mundo.comodines[8].tiempoActivo = 0 => Mundo.comodines[8].tiempoActivo = 40
 * @example accionAleatorio(), Mundo.comodines[8].tiempoActivo = 40 => Mundo.comodines[8].tiempoActivo = 39
 */
function accionAleatorio(){
  update(Mundo, Mundo.comodines[8].tiempoActivo = 0);
  posicionInactiva(8);
  update(Mundo, Mundo.comodines[8].tiempoAccionado = 0);
  update(Mundo, Mundo.retrasoComodines = tiempoRetraso);
  const listaAleatoriaPuntos = [1,0,0,1,1,1,0,1,1,1,0,1,1,1,0,1,1,0,1,0,1,0,1,0,0,1];
  const ProbabilidadComodines = listaAleatoriaPuntos[getRandom(0,length(listaAleatoriaPuntos))]
  switch (ProbabilidadComodines) {
    case 0:
      if(Mundo.score>20){
        update(Mundo,Mundo.score = Mundo.score-20);
      }else{
        update(Mundo,Mundo.score = 0);
      }
      break;
    case 1:
        update(Mundo,Mundo.score = Mundo.score+20);
      break;
    default:
      return null;
      break;
  }
}

