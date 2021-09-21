


function dibujaCabeza(){
  image(
      Mundo.imagenActualCabeza,
      Mundo.snake[x].x * 20,
      Mundo.snake[x].y * 20,
      lado,
      lado,
      0,
      0,
      20,
      20
    );
}

function dibujaCola(){
  image(
      Mundo.imagenActualCola,
      Mundo.snake[x].x * 20,
      Mundo.snake[x].y * 20,
      lado,
      lado,
      0,
      0,
      20,
      20
    );
}
//--------------------------------------------
function cambiaCabeza(){
  if(Mundo.dir==abajo){
    update(Mundo,Mundo.imagenActualCabeza=cabeza_abajo_normal)
  }else if(Mundo.dir==arriba){
    update(Mundo,Mundo.imagenActualCabeza=cabeza_arriba_normal)
  }if(Mundo.dir==derecha){
    update(Mundo,Mundo.imagenActualCabeza=cabeza_derecha_normal)
  }if(Mundo.dir==izquierda){
    update(Mundo,Mundo.imagenActualCabeza=cabeza_izquierda_normal)
  }else{
    return null
  }
}

function cambiaCola(){
  if(Mundo.dir == arriba || Mundo.dir == abajo){
    update(Mundo,Mundo.imagenActualCola=cola_normal_opuesto)
  }else if(Mundo.dir == derecha || Mundo.dir == izquierda){
    update(Mundo, (Mundo.imagenActualCola = cola_normal));
  }
}