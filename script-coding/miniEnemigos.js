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

//----------------------------------------------

//CLASE ENEMIGO
//Esta es una clase enemigo, con ciertos atributos especificos para está. Esta implementación nos sirve para crear varios enemigos con los mismos atributos a partir de una sola clase. Lo que este dentro de esta clase debera llamarse a traves del this.<nombre>  para especificarlo que es un atributo especifico a las clase
const enemigo = function (x, y) {
  //Posicion x en el canvas
  this.x = x;
  //Posicion y en el canvas
  this.y = y;
  //Contador y Retraso(Lo que servira para el retraso en el movimiento)
  this.contador = 0;
  this.retraso = 5;
  //Contador y Retraso para Enemigos ( Lo que servira para el retraso al bajar el score)
  this.contadorEne = 0;
  this.retrasoEne = 3;
  // Un numero aleatorio entre 0 y 3 (Las direcciones posibles que puede tener el enemigo)
  /*
  0=>Arriba
  1=>Abajo
  2=>Izquierda
  3=>Derecha
  */
  this.direccion = getRandom(0, 4);

  /*
  x: posicion en el eje x del objeto (Numero entre 0 y 28 => Numero de columnas)
  y: posicion en el eje y del objeto (Numero entre 0 y 26 => Numero de filas)
  colision: llegar al borde

  Contrato: x,y => boolean
  Propósito: Saber si el objeto de la clase enemigo colisiono o no, sabiendo que colisionar es tocar el borde el cual esta definido mediante el escenario con el numero dos.
  Prototipo: compruebaColision(x,y){} (Debe ser definida como una funcion y a la vez un atributo del objeto)
  Ejemplos:
  compruebaColision(0,20) => true
  compruebaColision(4,9) => false
  compruebaColision(8,2) => false
  */
  this.compruebaColision = function (x, y) {
    colisiona = false;
    if (Mundo.escenario[y][x] == 2) {
      colisiona = true;
    }
    return colisiona;
  };
};
//----------------------------------------------
/*
Contrato: list, element/object => function()
Recibe dos parametros:
*Lista : La lista actual de los enemigos
*Element/Objecto : La instancia de la clase enemigo
Retorna una funcion:
*append : Agrega a la lista el elemento u objeto, los cuales lo dimos como parametros
Propósito: Agregar a la lista, el elemento indicado
Prototipo: actualizaLista(lista,enemigo)
Ejemplos:
actualizaLista([0,2],3) => append([0,2],3) => [0,2,3]
actualizaLista([],enemigo1) => append([],enemigo1) => [enemigo1]
actualizaLista([enemigo1],enemigo2) => append([enemigo1],enemigo2) => [enemigo1,enemigo2]
*/
function actualizaLista(lista, enemigo) {
  return append(lista, enemigo);
}
//----------------------------------------------
/*
Contrato: list => function()
Recibe una lista pero no retorna nada, por el contrario, realiza una funcion:
*lado = 20px
* Realiza la funcion forEach, la cual me recorre la lista enviada como parametro para realizar el proposito de la funcion
Propósito: Dibujar cada elemento de la lista pasada por el parametro. Esta funcion esta diseñada para dibujar especificamente a los enemigos (tambien llamados tombos)
Prototipo: dibujaEnemgio(lista)
Ejemplos:
dibujaEnemigo([enemigo1]) => image(tombo,enemigo1.x*lado,enemigo1.y*lado,lado+40,lado+40)
dibujaEnemigo([enemigo1,enemigo2]) => image(tombo,enemigo1.x*lado,enemigo1.y*lado,lado+40,lado+40) , image(tombo,enemigo1.x*lado,enemigo1.y*lado,lado+40,lado+40)
*/
function dibujaEnemigo(lista) {
  forEach(lista, (element) => {
    image(tombo, element.x * lado, element.y * lado, lado + 40, lado + 40);
  });
}
//----------------------------------------------
/*
Contrato: list => function()
Propósito: Mover cada objeto / enemigo que esta entro de la lista dada como parametro
Prototipo: mueveEnemigo(lista)
Explicación Textual del Funcionamineto:
=> Se recibe una lista (La funcion sirve especificamente para la lista de enemigos)
=> Se recorre cada elemento de la lista, y a cada elemento se le hace lo siguiente:
  => Se busca el indice de la lista a traves de la funcion lookupx (Debidamente documentada buscarIndice.js)
  =>Vemos si el contador de ese elemento es menor que el retraso, si es menor me hace un update de ese contador + 1. Si no es menor, si no igual hace lo siguiente
    =>(Lo anterior es para que halla un retraso en el movimiento de los tombos)
    =>Se hace un update de ese contador en 0 (reiniciarlo)
    => Se mira cual es la direccion del elemento, si esta direccion que se dara lleva a una colision (tocar el borde) lo que hace es darme otra direccion a travez de un update
    => Una vez verifica cual es la dirrecion y que no halla ningun tipo de colsion, procede a mover el tombo. El sistema es simple:
      {
        direccion 0 : Arrriba => update del y con y-1
        direccion 1: Abajo => update del y con y+1
        direccion 2: Izquierda => update del x con x-1
        direccion 3: Derecha => update del x con  x+1
      }
*/
function mueveEnemigo(lista) {
  forEach(lista, (element) => {
    x = lookupx(Mundo.listaEnemigos, element);
    if (Mundo.listaEnemigos[x].contador < Mundo.listaEnemigos[x].retraso) {
      update(
        Mundo,
        (listaEnemigos[x].contador = listaEnemigos[x].contador + 1)
      );
    } else {
      update(Mundo, (listaEnemigos[x].contador = 0));
      //ARRIBA
      if (Mundo.listaEnemigos[x].direccion == 0) {
        if (
          Mundo.listaEnemigos[x].compruebaColision(
            Mundo.listaEnemigos[x].x,
            Mundo.listaEnemigos[x].y - 1
          ) == false
        ) {
          update(Mundo, (listaEnemigos[x].y = listaEnemigos[x].y - 1));
          update(Mundo, (listaEnemigos[x].direccion = getRandom(0, 4)));
        } else {
          Mundo.listaEnemigos[x].direccion = getRandom(0, 4);
        }
      }

      //ABAJO
      if (Mundo.listaEnemigos[x].direccion == 1) {
        if (
          Mundo.listaEnemigos[x].compruebaColision(
            Mundo.listaEnemigos[x].x,
            Mundo.listaEnemigos[x].y + 1
          ) == false
        ) {
          update(Mundo, (listaEnemigos[x].y = listaEnemigos[x].y + 1));
          update(Mundo, (listaEnemigos[x].direccion = getRandom(0, 4)));
        } else {
          Mundo.listaEnemigos[x].direccion = getRandom(0, 4);
        }
      }

      //IZQUIERDA
      if (Mundo.listaEnemigos[x].direccion == 2) {
        if (
          Mundo.listaEnemigos[x].compruebaColision(
            Mundo.listaEnemigos[x].x - 1,
            Mundo.listaEnemigos[x].y
          ) == false
        ) {
          update(Mundo, (listaEnemigos[x].x = listaEnemigos[x].x - 1));
          update(Mundo, (listaEnemigos[x].direccion = getRandom(0, 4)));
        } else {
          Mundo.listaEnemigos[x].direccion = getRandom(0, 4);
        }
      }

      //IZQUIERDA
      if (Mundo.listaEnemigos[x].direccion == 3) {
        if (
          Mundo.listaEnemigos[x].compruebaColision(
            Mundo.listaEnemigos[x].x + 1,
            Mundo.listaEnemigos[x].y
          ) == false
        ) {
          update(Mundo, (listaEnemigos[x].x = listaEnemigos[x].x + 1));
          update(Mundo, (listaEnemigos[x].direccion = getRandom(0, 4)));
        } else {
          Mundo.listaEnemigos[x].direccion = getRandom(0, 4);
        }
      }
    }
  });
}

/*
Contrato: lista => function() => Recibe una lista y realiza una funcion
Propósito: Recorrer cada elemento de la lista y realizar una funcion especifica con ese elemento. En este caso es comprobar si la posicion del tombo es la misma que la del snake (tanto cabeza como cola) y si es así, además del que el retraso ya se haya cumplido, bajarme el score con menos un punto
¿Por qué un retraso ?
Piensa que si no hay retraso y tienes tu snake muy grande, como el tombo funcion si lo tocas en cualquier parte de tu snake, hara que te baje el score de una forma muy rapida, en cambio con el retraso podras tener un margen para que no te baje el score rapido y así sea menos complicado evitar estos enemigos
Prototipo: comMiniEnemigos
Explicacion textual del Funcionamiento:
=> Se recibe una lista (La funcion funciona especificamente para que recina la lista de Enemigos / tombos)
=>Se hace un doble forEach para recorrer cada elemento de la lista de enemigos y el otro para recorrer cada cola (y cabeza claro) del snake, por lo que en formas simples comprobara si cada tombo esta en la posicion de cada una de las colas y la cabeza del snake.
=> Veamos el funcionamiento luego del doble forEach
  =>Se hace nuevamente la funcion lookupx (debidamente documentada en su buscarIndice.js) para saber el indice del elemento actual de la lista de Enemigos.
  =>Se procede a la condicion principal, saber si la posicion del elemento actual (tombo actual de la lista) es la misma que el elemento actual de Snake (cabeza o cualquiera de la cola). Si es así se procese a
    =>Se usa de nuevo el tema del retraso, si el contadorEne es menor al retrasoEne, me hace un update de ese contador a contador+1, en cambio si ambas constantes son iguales hace lo siguiente:
      =>Se reinicia el contador a 0 con un update
      =>Se baja el score a -1 con un update claramente

*/

function compMiniEnemigos(lista) {
  forEach(lista, (element) => {
    forEach(Mundo.snake, (elementD) => {
      x = lookupx(Mundo.listaEnemigos, element);
      if (element.x == elementD.x && element.y == elementD.y) {
        if (element.contadorEne < element.retrasoEne) {
          update(
            Mundo,
            (listaEnemigos[x].contadorEne = listaEnemigos[x].contadorEne + 1)
          );
        } else {
          update(Mundo, (listaEnemigos[x].contadorEne = 0));
          update(Mundo, (Mundo.score = Mundo.score - 1));
        }
      }
    });
  });
}
