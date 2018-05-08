/* ДЗ 2 - работа с массивами и объеектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array
 */

function forEach(array, fn) {
	for (i = 0; i < array.length; i++) {
		fn(array[i], i, array);
	}
};

function fn(item, i, array) {
	var sum = item*2;
	console.log(sum);
};

var array = [1, 2, 3];
forEach(array, fn);

/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array
 */

function map(array, fn) {
	var newArr = [];

	for (i = 0; i < array.length; i++) {
		newArr.push(fn(array[i], i, array));
	}
	return newArr;
};

function fn(item, i, array) {
	return item * item;
}

var array = [1, 2, 3];
map(array, fn);

/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array
 */

function reduce(array, fn, initial) {
	let acc = initial;

	for (i = 0; i < array.length; i++) {
		acc = fn(acc, array[i], i, array);
	}
	return acc;
};

function fn(initial, currentItem, i, array) {
	var sum = initial + currentItem;
	return sum;
};

var array = [1, 2, 3];

reduce(array, fn, 2);

/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */
// другое решение с методом for in:
// function upperProps(obj) {
// 	var array = [];
// 	for (var key in obj) {
// 		array.push(key.toUpperCase());
// 	}
// 	return array;
// }
// console.log(upperProps({ name: 'Сергей', lastName: 'Петров' }));

function upperProps(obj) {
	return Object.keys(obj).map(function(keys) {
 			return keys.toUpperCase()
 		});
};

upperProps({ name: 'Сергей', lastName: 'Петров' });

/*
 Задание 5 *:

 Напишите аналог встроенного метода slice для работы с массивами
 Посмотрите как работает slice и повторите это поведение для массива, который будет передан в параметре array
 */
function slice(array, from, to) {
}

// array = [1, 2, 3, 4];
// var result = array.slice(0, 4);
// console.log(result)

/*
 Задание 6 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {
}

export {
    forEach,
    map,
    reduce,
    upperProps
};
