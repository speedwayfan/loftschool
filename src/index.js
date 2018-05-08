/* ДЗ 3 - работа с исключениями и отладчиком */

/*
 Задание 1:

 1.1: Функция принимает массив и фильтрующую фукнцию и должна вернуть true или false
 Функция должна вернуть true только если fn вернула true для всех элементов массива

 1.2: Необходимо выбрасывать исключение в случаях:
   - array не массив или пустой массив (с текстом "empty array")
   - fn не является функцией (с текстом "fn is not a function")

 Зарпещено использовать встроенные методы для работы с массивами

 Пример:
   isAllTrue([1, 2, 3, 4, 5], n => n < 10) // вернет true
   isAllTrue([100, 2, 3, 4, 5], n => n < 10) // вернет false
 */

function isAllTrue(array, fn) {

  if (!Array.isArray(array) || !array.length) {
    throw new Error('empty array');
  };
  if (!fn) {
    throw new Error('fn is not a function');
  };

  for (i = 0; i < array.length; i++) {
    if (!fn(array[i])) {
      return false;
    }
  }
  return true;
};

isAllTrue([1, 2, 3, 4, 5], n => n < 10);
// почему вызов функции fn срабатывает в таком виде?
/*
 Задание 2:

 2.1: Функция принимает массив и фильтрующую фукнцию и должна вернуть true или false
 Функция должна вернуть true если fn вернула true хотя бы для одного из элементов массива

 2.2: Необходимо выбрасывать исключение в случаях:
   - array не массив или пустой массив (с текстом "empty array")
   - fn не является функцией (с текстом "fn is not a function")

 Зарпещено использовать встроенные методы для работы с массивами

 Пример:
   isSomeTrue([1, 2, 30, 4, 5], n => n > 20) // вернет true
   isSomeTrue([1, 2, 3, 4, 5], n => n > 20) // вернет false
 */

function isSomeTrue(array, fn) {

  if (!Array.isArray(array) || !array.length) {
    throw new Error('empty array');
  };
  if (!fn) {
    throw new Error('fn is not a function');
  };

  for (i = 0; i < array.length; i++) {
    if (fn(array[i]) === true) {
      return true;
    }
  }
  return false;
};

isSomeTrue([1, 2, 30, 4, 5], n => n > 20);

/*
 Задание 3:

 3.1: Функция принимает заранее неизветсное количество аргументов, первым из которых является функция fn
 Функция должна поочередно запустить fn для каждого переданного аргумента (кроме самой fn)

 3.2: Функция должна вернуть массив аргументов, для которых fn выбросила исключение

 3.3: Необходимо выбрасывать исключение в случаях:
   - fn не является функцией (с текстом "fn is not a function")
 */

function returnBadArguments(fn) {
  var newArr = [];

  if (typeof fn !== 'function') {
    throw new Error('fn is not a function');
  };

  for (let i = 1 ; i < arguments.length; i++) {
    try {
      fn(arguments[i]) === Error
    } catch (e) {
      newArr.push(arguments[i]);
    }
  };

  return newArr;
};

  function fn(arg) {
    if (typeof arg !== 'number') {
    throw new Error();
  };
};

returnBadArguments(fn);

/*
 Задание 4:

 4.1: Функция имеет параметр number (по умолчанию - 0)

 4.2: Функция должна вернуть объект, у которого должно быть несколько методов:
   - sum - складывает number с переданными аргументами
   - dif - вычитает из number переданные аргументы
   - div - делит number на первый аргумент. Результат делится на следующий аргумент (если передан) и так далее
   - mul - умножает number на первый аргумент. Результат умножается на следующий аргумент (если передан) и так далее

 Количество передаваемых в методы аргументов заранее неизвестно

 4.3: Необходимо выбрасывать исключение в случаях:
   - number не является числом (с текстом "number is not a number")
   - какой-либо из аргументов div является нулем (с текстом "division by 0")
 */

function calculator(number = 0) {
  var calcObj = {};
// debugger;

    if (typeof number !== 'number') {
      throw new Error('number is not a number')
    };

    calcObj.sum = function() {
      // var sum = number;       // почему когда перед циклом переменную number записываешь в другую, то все работает?
      for (i = 0; i < arguments.length; i++) {
        number += arguments[i];   //почему здесь ругается на +=? и здесь нужно использовать переменную let?
      };
        return number;
    };

    // calcObj.dif = function() {
    //   var number = this.number;
    //   for (i = 0; i < arguments.length; i++) {
    //     var number = number - arguments[i];
    //   };
    //     return number;
    // };

    // calcObj.div = function() {
    //   var number = this.number;
    //   for (i = 0; i < arguments.length; i++) {
    //     if (arguments[i] === 0) {
    //       throw new Error('division by 0')
    //     };
    //     var number = number / arguments[i];
    //   };
    //     return number;
    // };

    // calcObj.mul = function() {
    //   var number = this.number;
    //   for (i = 0; i < arguments.length; i++) {
    //     var number = number * arguments[i];
    //   };
    //     return number;
    // };

  return calcObj;
};

const calcObj = calculator(number = 0)
console.log(calcObj.sum(2, 3));

/* При решении задач, пострайтесь использовать отладчик */

// export {
//     isAllTrue,
//     isSomeTrue,
//     returnBadArguments,
//     calculator
// };
