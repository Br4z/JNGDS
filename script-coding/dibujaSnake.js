/*
Contrato: none=>function (No recibe ningun parametro pero retorna una funcion)
Propósito: dibujar la cabeza del Snake a traves de la funcion propia de P5.JS image()
Prototipo: dibujaCabeza()
*/

function dibujaCabeza() {
  image(
    //Imagen a Dibujar
    Mundo.imagenActualCabeza,
    //Posicion actual del snake con indice[x]. Se multiplica por veinte (tamaño de lados) para que se adequea al tablero
    Mundo.snake[x].x * 20,
    Mundo.snake[x].y * 20,
    //Tamaño de lado
    lado,
    //Tamaño de lado
    lado,
    //Posicion x donde empezara a cortar la imagen definida
    0,
    //Posicion y donde empezara a cortar la imagen definida
    0,
    //Ancho de la Imagen
    20,
    //Alto de la Imagen
    20
  );
}

/*
Contrato: none=>function (No recibe ningun parametro pero retorna una funcion)
Propósito: dibujar la cola del Snake a traves de la funcion propia de P5.JS image()
Prototipo: dibujaCola()
*/
function dibujaCola() {
  image(
    //Imagen a Dibujar
    Mundo.imagenActualCola,
    //Posicion actual del snake con indice[x]. Se multiplica por veinte (tamaño de lados) para que se adequea al tablero
    Mundo.snake[x].x * 20,
    Mundo.snake[x].y * 20,
    //Tamaño de lado
    lado,
    //Tamaño de lado
    lado,
    //Posicion x donde empezara a cortar la imagen definida
    0,
    //Posicion y donde empezara a cortar la imagen definida
    0,
    //Ancho de la Imagen
    20,
    //Alto de la Imagen
    20
  );
}
//--------------------------------------------
/*
Contrato: none => function (No recibe ningun parametro pero retorna una funcion)
Propósito: Cambiar la imagen de la Cabeza y la imagen de la cola dependiendo del personaje que este activo actualmente. En la funcion los nombres estan bien relacionados entonces seria facil entenderlo.
Hay que tener en cuenta que la cabeza cambia en funcion de la direccion, entonces una vez verifica cual es la skin de snake activo, me verifica la direccion de la snake, y dependiendo de la direccion me cambia la orientacion de la cabeza. La cola no cambia de direccion pues siempre es la misma.
Prototipo: cambiaCabezaCola()
*/
function cambiaCabezaCola() {
  if (Mundo.normalActivo == true) {
    if (Mundo.dir == abajo) {
      update(Mundo, (Mundo.imagenActualCabeza = cabeza_abajo_normal));
      update(Mundo, (Mundo.imagenActualCola = cola_normal));
    } else if (Mundo.dir == arriba) {
      update(Mundo, (Mundo.imagenActualCabeza = cabeza_arriba_normal));
      update(Mundo, (Mundo.imagenActualCola = cola_normal));
    }
    if (Mundo.dir == derecha) {
      update(Mundo, (Mundo.imagenActualCabeza = cabeza_derecha_normal));
      update(Mundo, (Mundo.imagenActualCola = cola_normal));
    }
    if (Mundo.dir == izquierda) {
      update(Mundo, (Mundo.imagenActualCabeza = cabeza_izquierda_normal));
      update(Mundo, (Mundo.imagenActualCola = cola_normal));
    } else {
      return null;
    }
  } else if (Mundo.vendedorActivo == true) {
    if (Mundo.dir == abajo) {
      update(Mundo, (Mundo.imagenActualCabeza = cabeza_abajo_vendedor));
      update(Mundo, (Mundo.imagenActualCola = cola_vendedor));
    } else if (Mundo.dir == arriba) {
      update(Mundo, (Mundo.imagenActualCabeza = cabeza_arriba_vendedor));
      update(Mundo, (Mundo.imagenActualCola = cola_vendedor));
    }
    if (Mundo.dir == derecha) {
      update(Mundo, (Mundo.imagenActualCabeza = cabeza_derecha_vendedor));
      update(Mundo, (Mundo.imagenActualCola = cola_vendedor));
    }
    if (Mundo.dir == izquierda) {
      update(Mundo, (Mundo.imagenActualCabeza = cabeza_izquierda_vendedor));
      update(Mundo, (Mundo.imagenActualCola = cola_vendedor));
    } else {
      return null;
    }
  } else if (Mundo.neroActivo == true) {
    if (Mundo.dir == abajo) {
      update(Mundo, (Mundo.imagenActualCabeza = cabeza_abajo_nero));
      update(Mundo, (Mundo.imagenActualCola = cola_nero));
    } else if (Mundo.dir == arriba) {
      update(Mundo, (Mundo.imagenActualCabeza = cabeza_arriba_nero));
      update(Mundo, (Mundo.imagenActualCola = cola_nero));
    }
    if (Mundo.dir == derecha) {
      update(Mundo, (Mundo.imagenActualCabeza = cabeza_derecha_nero));
      update(Mundo, (Mundo.imagenActualCola = cola_nero));
    }
    if (Mundo.dir == izquierda) {
      update(Mundo, (Mundo.imagenActualCabeza = cabeza_izquierda_nero));
      update(Mundo, (Mundo.imagenActualCola = cola_nero));
    } else {
      return null;
    }
  } else if (Mundo.politicoActivo == true) {
    if (Mundo.dir == abajo) {
      update(Mundo, (Mundo.imagenActualCabeza = cabeza_abajo_politico));
      update(Mundo, (Mundo.imagenActualCola = cola_politico));
    } else if (Mundo.dir == arriba) {
      update(Mundo, (Mundo.imagenActualCabeza = cabeza_arriba_politico));
      update(Mundo, (Mundo.imagenActualCola = cola_politico));
    }
    if (Mundo.dir == derecha) {
      update(Mundo, (Mundo.imagenActualCabeza = cabeza_derecha_politico));
      update(Mundo, (Mundo.imagenActualCola = cola_politico));
    }
    if (Mundo.dir == izquierda) {
      update(Mundo, (Mundo.imagenActualCabeza = cabeza_izquierda_politico));
      update(Mundo, (Mundo.imagenActualCola = cola_politico));
    } else {
      return null;
    }
  } else if (Mundo.policiaActivo == true) {
    if (Mundo.dir == abajo) {
      update(Mundo, (Mundo.imagenActualCabeza = cabeza_abajo_policia));
      update(Mundo, (Mundo.imagenActualCola = cola_policia));
    } else if (Mundo.dir == arriba) {
      update(Mundo, (Mundo.imagenActualCabeza = cabeza_arriba_policia));
      update(Mundo, (Mundo.imagenActualCola = cola_policia));
    }
    if (Mundo.dir == derecha) {
      update(Mundo, (Mundo.imagenActualCabeza = cabeza_derecha_policia));
      update(Mundo, (Mundo.imagenActualCola = cola_policia));
    }
    if (Mundo.dir == izquierda) {
      update(Mundo, (Mundo.imagenActualCabeza = cabeza_izquierda_policia));
      update(Mundo, (Mundo.imagenActualCola = cola_policia));
    } else {
      return null;
    }
  }
}
