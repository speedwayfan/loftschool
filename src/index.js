/* ДЗ 6 - Асинхронность и работа с сетью */

/*
 Задание 1:

 Функция должна возвращать Promise, который должен быть разрешен через указанное количество секунду

 Пример:
   delayPromise(3) // вернет promise, который будет разрешен через 3 секунды
 */

function delayPromise(seconds) {

	let promise = new Promise((resolve, reject) => {
		setTimeout(() => {
	    // переведёт промис в состояние fulfilled с результатом "result"
	    resolve("result");
	  	}, seconds * 1000);

	});

	// promise.then навешивает обработчики на успешный результат или ошибку
	promise.then(
	    result => {
	      	// первая функция-обработчик - запустится при вызове resolve
	      	alert("Fulfilled: " + result); // result - аргумент resolve
	    },
	    error => {
	      	// вторая функция - запустится при вызове reject
	      	alert("Rejected: " + error); // error - аргумент reject
	    }
	);

	return promise
}

delayPromise(3);

/*
 Задание 2:

 2.1: Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов пожно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json

 2.2: Элементы полученного массива должны быть отсортированы по имени города

 Пример:
   loadAndSortTowns().then(towns => console.log(towns)) // должна вывести в консоль отсортированный массив городов
 */

function loadAndSortTowns() {
	// debugger;
    let promise = fetch('https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json')
	    .then(response => response.json())
	    .then(response => sortFn(response))
	    .catch(() => {
	    	console.error('Что-то пошло не так')
	    });

    	function sortFn(response) {
	    	let towns = response.slice(0);
				towns.sort(function(a,b) {
					let x = a.name.toLowerCase();
					let y = b.name.toLowerCase();
					return x < y ? -1 : x > y ? 1 : 0;
				});

			return towns
		};

	return promise
}

loadAndSortTowns().then(towns => console.log(towns));

export {
    delayPromise,
    loadAndSortTowns
};
