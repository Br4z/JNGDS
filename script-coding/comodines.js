//FUNCIONES DE LOS COMODINES EN GENERAL
function restaTiempo(nComodin){
    update(Mundo, Mundo.comodines[nComodin].tiempoActivo--);
}

  function posicionInactiva(nComodin){
    update(Mundo, Mundo.comodines[nComodin].x = -1);
    update(Mundo, Mundo.comodines[nComodin].y = -1);

    //nuevosComodines();
    update(Mundo, Mundo.retrasoComodines = tiempoRetraso);
  }

  function nuevosComodines() {
    //Comodines Aqui
    //const numeroComodin = 4;
    const listaComodin = [0,1,2,3,4,5,6,7,4,5,6,7,4,5,6,7,0,1,2,3,0,1,2,3,4,5,6,7,4,5,6,7,4,5,6,7,0,1,2,3,0,1,2,3,8,4,5,6,7,4,5,6,7,4,5,6,7,0,1,2,3];
    const numeroComodin = listaComodin[getRandom(0,length(listaComodin))];
    // const numeroComodin = 5;
    update(
      Mundo,
      (Mundo.comodines[numeroComodin].tiempoActivo = getRandom(30, 50))
    );
    update(Mundo, (Mundo.comodines[numeroComodin].x = getRandom(2, 26)));
    update(Mundo, (Mundo.comodines[numeroComodin].y = getRandom(4, 25)));
  }

  function restaRetraso(){
    update(Mundo, Mundo.retrasoComodines--);
  }

  function nuevoRetraso(){
    update(Mundo, Mundo.retrasoComodines = tiempoRetraso);
  }

  const tiempoRetraso = 40;

  //ACCIONES DE LOS COMODINES
  function accionVelocidad(){
    update(Mundo, Mundo.snake = moveSnake(Mundo.snake, Mundo.dir));
    update(Mundo, Mundo.comodines[0].tiempoActivo = 0)
    if (Mundo.comodines[0].tiempoAccionado == 0){
      posicionInactiva(0);
      update(Mundo, Mundo.comodines[0].tiempoAccionado = 40);
      //nuevosComodines();
      update(Mundo, Mundo.retrasoComodines = tiempoRetraso);
    } else {
      update(Mundo, Mundo.comodines[0].tiempoAccionado--)
    }
  }

  function accionInvencibilidad(){
    update(Mundo, Mundo.comodines[1].tiempoActivo = 0);
    if (Mundo.comodines[1].tiempoAccionado == 0){
      posicionInactiva(1);
      update(Mundo, Mundo.comodines[1].tiempoAccionado = 40);
      //nuevosComodines();
      update(Mundo, Mundo.retrasoComodines = tiempoRetraso);

    } else {
      update(Mundo, Mundo.comodines[1].tiempoAccionado--);

    }

    if (Mundo.comodines[1].tiempoAccionado > 2){
      return false;

    } else {
      return true;
    }
  }

  function accionAumentoPuntos(){
    update(Mundo, Mundo.comodines[2].tiempoActivo = 0);
    console.log(Mundo.comodines[2].tiempoAccionado);
    if (Mundo.comodines[2].tiempoAccionado == 0){
      posicionInactiva(2);
      update(Mundo, Mundo.comodines[2].tiempoAccionado = 40);
      update(Mundo, Mundo.retrasoComodines = tiempoRetraso);
      update(Mundo, Mundo.scoreMas = 2);

    } else if (Mundo.comodines[2].tiempoAccionado == 1){
      console.log("Hola");
      update(Mundo, Mundo.scoreMas = 1);
      update(Mundo, Mundo.comodines[2].tiempoAccionado--);

    } else {
      update(Mundo, Mundo.comodines[2].tiempoAccionado--);

    }
  }

  function accionVidaMas(){
    update(Mundo, Mundo.comodines[3].tiempoActivo = 0);
    posicionInactiva(3);
    update(Mundo, Mundo.comodines[3].tiempoAccionado = 0);
    update(Mundo, Mundo.retrasoComodines = tiempoRetraso);
    update(Mundo, Mundo.lives++);
  }

  function accionInversion(){
    update(Mundo, Mundo.comodines[4].tiempoActivo = 0)
    posicionInactiva(4);
    update(Mundo, Mundo.comodines[4].tiempoAccionado = 0);
    update(Mundo, Mundo.retrasoComodines = tiempoRetraso);

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

  function accionTombos(){
    update(Mundo, Mundo.comodines[5].tiempoActivo = 0)
    if (Mundo.comodines[5].tiempoAccionado == 0){
      posicionInactiva(5);
      update(Mundo, Mundo.comodines[5].tiempoAccionado = 40);
      //nuevosComodines();
      update(Mundo, Mundo.retrasoComodines = tiempoRetraso);
    } else {
      // console.log("Hola");
      dibujaEnemigo(Mundo.listaEnemigos)
      console.log(Mundo.activosMiniEnemigos)
      mueveEnemigo(Mundo.listaEnemigos)
      compMiniEnemigos(Mundo.listaEnemigos)
      update(Mundo, Mundo.comodines[5].tiempoAccionado--)
    }
  }

  function accionReduccionPuntos(){
    update(Mundo, Mundo.comodines[6].tiempoActivo = 0);
    console.log(Mundo.comodines[6].tiempoAccionado);
    if (Mundo.comodines[6].tiempoAccionado == 0){
      posicionInactiva(6);
      update(Mundo, Mundo.comodines[6].tiempoAccionado = 40);
      update(Mundo, Mundo.retrasoComodines = tiempoRetraso);
      update(Mundo, Mundo.scoreMas = 0.5);

    } else if (Mundo.comodines[6].tiempoAccionado == 1){
      console.log("Hola");
      update(Mundo, Mundo.scoreMas = 1);
      update(Mundo, Mundo.comodines[6].tiempoAccionado--);

    } else {
      update(Mundo, Mundo.comodines[6].tiempoAccionado--);

    }
  }

  function accionGolpeAccionado() {
    update(Mundo, (Mundo.comodines[7].tiempoActivo = 0));
    if (Mundo.comodines[7].tiempoAccionado == 0) {
      window.vidasOficial = Mundo.lives;
      posicionInactiva(7);
      update(Mundo, (Mundo.comodines[7].tiempoAccionado = 40));
      //nuevosComodines();
      update(Mundo, (Mundo.retrasoComodines = tiempoRetraso));
    } else {
      update(Mundo, Mundo.comodines[7].tiempoAccionado--);
    }

    if (Mundo.comodines[7].tiempoAccionado > 2) {
      update(Mundo, (Mundo.lives = 0));
    } else {
      update(Mundo, (Mundo.lives = window.vidasOficial));
    }
  }

   //:D
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

