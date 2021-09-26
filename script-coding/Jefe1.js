/**Dibuja el arma que utiliza el enemigo 'Thief' en este caso un cuchillo(knife)
 * Toma cada lista dentro de knife y accede a los valores de su posicion 'x','y', esto permite dibujar varios knife. 
*/
function drawKnife(knife) {  
    forEach(knife, (k) => {
      if (k.pos== true) {
        image(knifeUp, k?.x * lado, k?.y * lado, lado , lado );
      } else {
        image(knifeSide, k?.x * lado, k?.y * lado, lado, lado );
      }
      
    });
  }

  
// }

/**Funcion para dibujar a uno de los enemigos, en este caso 'el Thief'
 * Accede a los valores de la posicion de Thief y lo dibuja en las cordenadas
*/
function drawThief(Thief) {
  image(thief, Thief?.x * lado, Thief?.y * lado, lado+20, lado+20);
}

/**Funcion del movimiento del Thief
 * list->list
 * Recibe los valores de la posicion 'x','y' ,'dirx' y 'diry'
 * @param dirx Si el valor de 'y' esta aumentando (baja) sera true de lo contrario cuando 'y' disminuya (sube) pasando a ser false
 * @param diry: Si el valor de 'x' esta deciende (se mueve a la izquierda) sera true de lo contrario si aumenta (se mueve a la derecha) sera false
 * @condition Cuando se encuentra en el punto de cambio de 'x' e 'y' (esquina superior derecha) se evaluan los valores de la direccion tanto de dirx como diry para definir si cambia la posicion de 'x' o 'y'
 * 
 * @example {x:26,y:6, dirx: false , diry: true}-> Se movera hacia la izquierda 
 * @example{x:26,y:6, dirx: true, diry: true}->  Se movera hacia abajo ya que volvio al caso inicial 
 * @example{x:10,y:6, dirx:false, diry: false}-> Error  por que si se mueve a la izquierda se cambia dirx: true ya que se esta preparando para bajar
 * @example{x:26,y:6, dirx: true, diry:false}-> se movera hacia abajo ya que llego al punto de cambio por la izquierda
 * @
*/
function ThiefMove(Thief) {
  if (
    (Thief.dirx == true && Thief.y != 24 && Thief.diry == true) ||
    (Thief.x == 26 && Thief.diry == false)
  ) {
    return { x: Thief.x, y: Thief.y + 1, dirx: true, diry: true };
  }
  if (Thief.y == 24) {
    return { x: Thief.x, y: Thief.y - 1, dirx: false, diry: true };
  }
  if (Thief.dirx == false && Thief.y != 6) {
    return { x: Thief.x, y: Thief.y - 1, dirx: false, diry: true };
  }
  if (
    Thief.y == 6 &&
    Thief.dirx == false &&
    Thief.x != 1 &&
    Thief.diry == true
  ) {
    return { x: Thief.x - 1, y: 6, dirx: false, diry: true };
  }
  if (Thief.x == 1) {
    return { x: Thief.x + 1, y: 6, dirx: true, diry: false };
  }
  if (Thief.diry == false && Thief.x != 1) {
    return { x: Thief.x + 1, y: 6, dirx: true, diry: false };
  }

}


/**Funcion que se encarga del movimiento de el cuchillo
 * list->list
 * Se encarga de mover cada una de las listas dentro de knife o mas propiamente cada knife
 * @param pos: Define si el cuchillo fue creado cuando Thief se encontraba moviendose por 'x' o por 'y', si es true fue creado arriba de lo contrario fue creado de lado
 * @example {x:10,y:8, pos:true}-> Se movera hacia abajo
 * @example {x:10,y:8, pos:false}-> Se movera hacia la izquierda
 * 
*/
function moveKnife(knife) {
  const head = first(knife);
  if (isEmpty(knife)) {
    return [{}]
  } else {
    if (head.pos == true) {
      if (isEmpty(rest(knife))) {
        return [{ x: head.x, y: head.y + 1, pos: true }];
      } else {
        return cons(
          { x: head.x, y: head.y + 1, pos: true },
          moveKnife(rest(knife))
        );
      }
    } else {
      if (isEmpty(rest(knife))) {
        return [{ x: head.x - 1, y: head.y, pos: false }];
      } else {
        return cons(
          { x: head.x - 1, y: head.y, pos: false },
          moveKnife(rest(knife))
        );
      }
    }
  }
}

/**Funcion que se encarga de duplicar los cuchillos
 * list,list->list
 * Cuando el Snake come Thief le lanza un nuevo knife, esta funcion revisa en donde se encontraba Thief en el momento de comer definiedno asi el valor de pos
 * y añadiendo la nueva lista a knife
 * @example {x:20,y:6,pos:true}-> se movera de arriba hacia abajo
 * @example {x:20,y:15,pos:false}-> se movera de derecha a izquierda
 */
function duplicarKnife(knife, Thief) {
  // if(Mundo.thiefActivo==true){
  if (Thief?.y == 6) {
    return cons({ x: Thief.x, y: Thief.y, pos: true },knife);
  } else {
    return cons({ x: Thief.x, y: Thief.y, pos: false }, knife);
  }
}


/**Funcion que se encarga del golpe
 * lsit,list->boolean 
 * Cuando knife golpea la "cabeza o cuello" del snake se reducen sus vidas en 1 punto, se evalua si la posicion del knife es igual a la de los 2 primeros sectores del snake (cadros originalmente de 20*20)
 * @example([{x:20,y:15}{x:20,y:14}],{x:10,y:15,pos:true})->false 
 * @example([{x:20,y:15}{x:20,y:14}],{x:20,y:15,pos:true})->true
*/
function hitHead(snake, knife) {
  const head = first(knife);
  if (isEmpty(knife)) {
    return false
  } else {
    if (isEmpty(rest(knife))) {
    if (
      (snake[0].x == head.x && snake[0].y == head.y) ||
      (snake[1].x == head.x && snake[1].y == head.y)
    ) {
      return true;
    } else {
      return false;
    }
  } else {
    if (
      (snake[0].x == head.x && snake[0].y == head.y) ||
      (snake[1].x == head.x && snake[1].y == head.y)
    ) {
      return true;
    } else {
      return hitHead(snake, rest(knife));
    }
  }
  }
  }

/**Funcion que se encarga de saber si el knife esta fuera del tablero
 * list->boolean
 * Cuando la posicion de knife tanto en 'x' como en 'y' se sale de los bordes del tablero retorna un booleano 
 * @example {x:-5,y:15,pos:false}->true
 * @example {}->false
 */
function knifeOut(knife) {
  const head = first(knife);
  if (isEmpty(knife)) {
    return false
  } else {
    if (isEmpty(rest(knife))) {
      if (head.x < 0 || head.y > 26) {
        return true;
      } else {
        return false;
      }
    } else {
      if (head.x < 0 || head.y > 28) {
        return true;
      } else {
        return knifeOut(rest(knife));
      }
    }
  }
  }

  /**Funcion que se encarga reducir la lista de comodines cuando un knife se sale del esceneario
   * list->list
   * Se realiza un .slice para reducir la longitud de la lista de cuchillos en 1 como los nuevos cuchillos se añaden al frente y todos viajan a la misma velocidad, el que se salio fue el primero creado (el ultimo de la lista)
   * @example [{x:-5,y:15, pos:false}]->[]
   */

function despawnKnife(knife) {
  return knife.slice(0,length(knife)-1)
}
/**Funcion que mira si el knife golpeo alguna parte del snake reduciendo el score en 1
 * 
 */

function hitBody(lista) {
  forEach(lista, (element) => {
    forEach(Mundo.snake, (elementD) => {
      x = lookupx(Mundo.snake, elementD);
      if (element.x == elementD.x && element.y == elementD.y && x != 0) {
        update(Mundo, (Mundo.score = Mundo.score - 1));
      }
    });
  });
}
