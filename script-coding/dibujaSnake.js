


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
  if (Mundo.normalActivo == true) {
    if (Mundo.dir == abajo) {
      update(Mundo, (Mundo.imagenActualCabeza = cabeza_abajo_normal));
    } else if (Mundo.dir == arriba) {
      update(Mundo, (Mundo.imagenActualCabeza = cabeza_arriba_normal));
    }
    if (Mundo.dir == derecha) {
      update(Mundo, (Mundo.imagenActualCabeza = cabeza_derecha_normal));
    }
    if (Mundo.dir == izquierda) {
      update(Mundo, (Mundo.imagenActualCabeza = cabeza_izquierda_normal));
    } else {
      return null;
    }
  } else if (Mundo.vendedorActivo == true) {
    if (Mundo.dir == abajo) {
      update(Mundo, (Mundo.imagenActualCabeza = cabeza_abajo_vendedor));
    } else if (Mundo.dir == arriba) {
      update(Mundo, (Mundo.imagenActualCabeza = cabeza_arriba_vendedor));
    }
    if (Mundo.dir == derecha) {
      update(Mundo, (Mundo.imagenActualCabeza = cabeza_derecha_vendedor));
    }
    if (Mundo.dir == izquierda) {
      update(Mundo, (Mundo.imagenActualCabeza = cabeza_izquierda_vendedor));
    } else {
      return null;
    }
  } else if (Mundo.neroActivo == true) {
    if (Mundo.dir == abajo) {
      update(Mundo, (Mundo.imagenActualCabeza = cabeza_abajo_nero));
    } else if (Mundo.dir == arriba) {
      update(Mundo, (Mundo.imagenActualCabeza = cabeza_arriba_nero));
    }
    if (Mundo.dir == derecha) {
      update(Mundo, (Mundo.imagenActualCabeza = cabeza_derecha_nero));
    }
    if (Mundo.dir == izquierda) {
      update(Mundo, (Mundo.imagenActualCabeza = cabeza_izquierda_nero));
    } else {
      return null;
    }
  } else if (Mundo.politicoActivo == true) {
    if (Mundo.dir == abajo) {
      update(Mundo, (Mundo.imagenActualCabeza = cabeza_abajo_politico));
    } else if (Mundo.dir == arriba) {
      update(Mundo, (Mundo.imagenActualCabeza = cabeza_arriba_politico));
    }
    if (Mundo.dir == derecha) {
      update(Mundo, (Mundo.imagenActualCabeza = cabeza_derecha_politico));
    }
    if (Mundo.dir == izquierda) {
      update(Mundo, (Mundo.imagenActualCabeza = cabeza_izquierda_politico));
    } else {
      return null;
    }
  } else if (Mundo.policiaActivo == true) {
    if (Mundo.dir == abajo) {
      update(Mundo, (Mundo.imagenActualCabeza = cabeza_abajo_policia));
    } else if (Mundo.dir == arriba) {
      update(Mundo, (Mundo.imagenActualCabeza = cabeza_arriba_policia));
    }
    if (Mundo.dir == derecha) {
      update(Mundo, (Mundo.imagenActualCabeza = cabeza_derecha_policia));
    }
    if (Mundo.dir == izquierda) {
      update(Mundo, (Mundo.imagenActualCabeza = cabeza_izquierda_policia));
    } else {
      return null;
    }
  }
}

function cambiaCola(){
  if (Mundo.normalActivo == true) {
    update(Mundo, (Mundo.imagenActualCola = cola_normal));
  } else if (Mundo.vendedorActivo == true) {
    update(Mundo, (Mundo.imagenActualCola = cola_vendedor));
  } else if (Mundo.neroActivo == true) {
    update(Mundo, (Mundo.imagenActualCola = cola_nero));
  } else if (Mundo.politicoActivo == true) {
    update(Mundo, (Mundo.imagenActualCola = cola_politico));
  }else if(Mundo.policiaActivo==true){
    update(Mundo, (Mundo.imagenActualCola = cola_policia));
  }
}
