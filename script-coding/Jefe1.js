//Dibuja el arma que utiliza el enemigo 'Thief' en este caso un cuchillo(knife)
function drawKnife(knife) {
  // if(Mundo.thiefActivo==true){
  forEach(knife, (k) => {
    fill("green");
    triangle(
      k.x * lado + 10,
      k.y * lado,
      k.x * lado,
      k.y * lado + 10,
      k.x * lado + 10,
      k.y * lado + 20
    );
  });
}
// }

//Funcion para dibujar a uno de los enemigos, en este caso 'el Thief'
function drawThief(Thief) {
  // if(Mundo.thiefActivo==true){
  fill("blue");
  rect(Thief.x * lado, Thief.y * lado, lado, lado);
}
// }

/*TODO Funcion del movimiento del Thief*/
function ThiefMove(Thief) {
  // if(Mundo.thiefActivo==true){
  // if(Mundo.thiefActivo==true){
  // Esto se ejecuta en cada tic del reloj. Con esto se pueden hacer animaciones
  //
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
    return { x: Thief.x + 1, y: 6, dir: true, diry: false };
  }
  if (Thief.diry == false && Thief.x != 1) {
    return { x: Thief.x + 1, y: 6, dir: true, diry: false };
  }
// }
}
// }
//TODO Funcion que se encarga del movimiento de el cuchillo
function moveKnife(knife) {
  // if(Mundo.thiefActivo==true){
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
// }
//TODO Funcion que duplica a knife
function duplicarKnife(knife, Thief) {
  // if(Mundo.thiefActivo==true){
  if (Thief?.y == 6) {
    return cons({ x: Thief.x, y: Thief.y, pos: true },knife);
  } else {
    return cons({ x: Thief.x, y: Thief.y, pos: false }, knife);
  }
}
// }

//TODO Funcion que se encarga del golpe
function hitHead(snake, knife) {
  // if(Mundo.thiefActivo==true){
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
// }

function knifeOut(knife) {
  // if(Mundo.thiefActivo==true){
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
// }

function despawnKnife(knife) {
  // if(Mundo.thiefActivo==true){
  return knife.slice(0,length(knife)-1)
}
// }
