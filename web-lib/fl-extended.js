require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/**
 * Agreaga el elemento value al comienzo de la lista. 
 * @param {*} value 
 * @param {Array} list 
 */
function cons(value, list) {
    let tmp = list.slice(0);
    tmp.splice(0, 0, value);
    return tmp;
}

/**
 * Retorma el primer elemento de la lista
 * @param {Array} list 
 */
function first(list) {
    return list.slice(0, 1)[0];
}

/**
 * Retorna todos los elementos de la lista, excepto el primero
 * @param {Array} list 
 */
function rest(list) {
    return list.slice(1);
}

/**
 * La lista de entrada está vacio?
 * @param {Array} list 
 */
function isEmpty(list) {
    if (typeof list == 'object') {
        return list.length === 0;
    }
    return false;
}

/**
 * El objeto de entrada es una lista?
 * @param {Array} list 
 */
function isList(list) {
    return typeof list === 'object' && typeof list.length == 'number' && list.length >= 0;
}

/**
 * Retorna la longitud de un arreglo
 * @param {Array} list 
 */
function length(list) {
    return list.length;
}

/**
 * Concatena la list2 al final de la list1. Si list2 no es un arreglo, simplemente agrega
 * este elemento al final de list1.
 * @param {Array} list1 
 * @param {Array | Object} list2 
 */
function append(list1, list2) {
    let tmp = list1.slice();
    if (typeof list2 === 'object' && list2.length >= 0) {
        tmp.push(...list2);
        return tmp;
    } else {
        tmp.push(list2);
        return tmp;
    }
}

module.exports = { cons, first, rest, isEmpty, isList, length, append };
},{}],"fl-extended":[function(require,module,exports){
const { cons, first, rest, isEmpty, isList, append, length } = require('functional-light');

/**
 * Apply a function f to each element of the array a
 * @param {Array} a 
 * @param {function} f 
 * @example console.log(map([1,2,3], x => x*x)); // => [1, 4, 9]
 */
let map = function(a, f) {
    if (isEmpty(a)) {
        return [];
    } else {
        return cons(f(first(a)), map(rest(a), f));
    }
}
// We export all the previous functions +  our current implementation of map
module.exports = { cons, first, rest, isEmpty, isList, append, length, map }
},{"functional-light":1}]},{},[]);
