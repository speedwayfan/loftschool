/* ДЗ 2 - работа с массивами и объеектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array
 */

function forEach(array, fn) {
    for (let i = 0; i < array.length; i++) {
        fn(array[i], i, array);
    }
}

function fn(item) {
    var sum = item*2;

    return sum;
}

forEach([1, 2, 3], fn);

/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array
 */

function map(array, fn1) {
    var newArr = [];

    for (let i = 0; i < array.length; i++) {
        newArr.push(fn1(array[i], i, array));
    }

    return newArr;
}

function fn1(item) {

    return item * item;
}

map([1, 2, 3], fn1);

/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array
 */

function reduce(array, fn2, initial) {
    let acc = initial;

    for (let i = 0; i < array.length; i++) {
        acc = fn2(acc, array[i], i, array);
    }

    return acc;
}

function fn2(initial, currentItem) {
    var sum = initial + currentItem;

    return sum;
}

reduce([1, 2, 3], fn2, 2);

/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */
// другое решение с методом for in:
// function upperProps(obj) {
// var array = [];
// for (var key in obj) {
// array.push(key.toUpperCase());
// }
// return array;
// }
// console.log(upperProps({ name: 'Сергей', lastName: 'Петров' }));

function upperProps(obj) {

    return Object.keys(obj).map(function(keys) {

        return keys.toUpperCase()
    });
}

upperProps({ name: 'Сергей', lastName: 'Петров' })

/*
 Задание 5 *:

 Напишите аналог встроенного метода slice для работы с массивами
 Посмотрите как работает slice и повторите это поведение для массива, который будет передан в параметре array
 */
// function slice(array, from, to) {
// }

// array = [1, 2, 3, 4];
// var result = array.slice(0, 4);
// console.log(result)

/*
 Задание 6 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
// function createProxy(obj) {
// }

export {
    forEach,
    map,
    reduce,
    upperProps
};
