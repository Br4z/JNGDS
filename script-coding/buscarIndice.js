
/**INDICE */
/*
Contrato: list-->number
Proposito: Determinar la longitud de una lista en funcion del numero de elementos que tenga.
Prototipo: longitud(lista){cuerpo de la funcion}
Ejemplos:
longitud([2,3,4,[]])-->4
longitud([22,0101,"hola",2,2])-->5
longitud([1,2])-->2

*/
function longitud(lista) {
	if (isEmpty(lista)) return 0;
	return 1 + longitud(rest(lista));
}
/*
Contrato: list,number,number-->number
Proposito: Determinar el indice o la posicion del numero x dentro de la lista que ingresamos, a traves de una funcion que actue como contador
Prototipo: aux(list,x,contador){cuerpo de la funcion}
Ejemplos:
aux([1,2],2,0)-->1
aux([1,2],1,0)-->0
aux([1,2],5,0)-->[]
*/
function aux(list, x, contador) {
	if (isEmpty(list)) {
		return [];
	} else if (first(list) == x) {
		return contador;
	} else {
		return aux(rest(list), x, contador + 1);
	}
}
/*
Contrato: list,number-->number
Proposito:Retomar la funcion auxiliar para determinar el indice de nuestro numero a buscar en la lista, pero teniendo en cuenta que la nueva funcion tendra dos valores de entrada y siempre el contador iniciara en cero
Prototipo: lookpxindice(list,x){cuerpo de la funcion}
Ejemplos:
aux([1,2],2)-->1
aux([1,2],1)-->0
aux([1,2],5)-->[]
*/
function lookupxindice(list, x) {
	return aux(list, x, 0);
}
/*
Contrato: list, number-->boolean
Proposito: Determinar si n existe en list, es decir, si el numero que queremos buscar se encuentra dentro de la lista, de se así retornar true, o el caso contrario, retornar false
Prototipo: verificar(list,n){cuerpo de la funcion}
Ejemplos:
verificar([],5)-->false
verificar([3,4,5],5)-->true
verificar([3,9,7],4)-->false

*/
function verificar(list, n) {
	if (longitud(list) == 0) {
		return false;
	}
	if (first(list) == n) {
		return true;
	} else {
		return verificar(rest(list), n);
	}
}
/*
Contrato: list, number-->number
Proposito: Desarrollar una funcion que retorne el índice n donde se encuentra el elemento elem si existe, en caso contrario de que no exista retornar  -( n + 1 )
Prototipo: lookupx(list,x)
Ejemplos:
lookupx([1, 2, 3, 4], 8)-->-5
lookupx([1, 2, 3, 4], 3)-->2
lookupx([1, 2, 3, 4], 1)-->0
*/

function lookupx(list, x) {
	if (verificar(list, x) == true) {
		return lookupxindice(list, x);
	} else {
		if (longitud(list) == 0) {
			return -1;
		} else if (first(rest(list)) > x) {
			return -2;
		} else {
			return -1 + lookupx(rest(list), x);
		}
	}
}















this.mueveMalo = function (lista, x) {
  if (this.contador < this.retraso) {
    this.contador = this.contador + 1;
  } else {
    this.contador = 0;
    //ARRIBA
    if (this.direccion == 0) {
      if (this.compruebaColision(this.x, this.y - 1) == false) {
        this.y = this.y - 1;
      } else {
        this.direccion = randomr(1, 3);
      }
    }

    //ABAJO
    if (this.direccion == 1) {
      if (this.compruebaColision(this.x, this.y + 1) == false) {
        this.y = this.y + 1;
      } else {
        this.direccion = randomr(1, 3);
      }
    }

    //IZQUIERDA
    if (this.direccion == 2) {
      if (this.compruebaColision(this.x - 1, this.y) == false) {
        this.x -= this.x - 1;
      } else {
        this.direccion = randomr(1, 3);
      }
    }

    //IZQUIERDA
    if (this.direccion == 3) {
      if (this.compruebaColision(this.x + 1, this.y) == false) {
        this.x = this.x + 1;
      } else {
        this.direccion = randomr(1, 3);
      }
    }
  }
};
