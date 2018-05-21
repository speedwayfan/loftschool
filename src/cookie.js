/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если добавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

// зачем здесь options = {} ?
function setCookie(name, value, options = {}) {
    let string = `${name}=${value}`;
    // options - Объект с дополнительными свойствами для установки cookie
    // expires - Время истечения cookie. Интерпретируется по-разному, в зависимости от типа
    let expires = options.expires;

    if (typeof expires == 'number' && expires) {
        const cookieDate = new Date();

        cookieDate.setTime(cookieDate.getTime() + expires * 1000);
        expires = cookieDate;
    }

    if (expires && expires.toUTCString) {
        expires = expires.toUTCString();
    }

    if (expires) {
        string += `; expires=${expires}`
    }

    document.cookie = string;
}

function deleteCookie(name) {
// при удалении cookie просто добавляем пустое значение с датой в прошлом
    setCookie(name, '', { expires: -1 });
}

filterNameInput.addEventListener('keyup', function() {
    loadCookies();
});

addButton.addEventListener('click', () => {
    if (addNameInput.value && addValueInput.value) {
        setCookie(addNameInput.value, addValueInput.value)
        addNameInput.value = '';
        addValueInput.value = '';
        loadCookies();
    }
});

listTable.addEventListener('click', (e) => {
// Element.closest() возвращает ближайший родительский элемент (или сам элемент)
    if (e.target.closest('.del-button')) {
        deleteCookie(e.target.dataset.cookieName);
        loadCookies();
    }
});

function loadCookies() {
    let objCookies = getCookies();

    listTable.innerHTML = '';
    if (document.cookie.length == 0) {
        // что возвращает это условие?
        return;
    }
    // Обычно используются для создания фрагмента документа, добавления в него новых элементов/нод,
    // а затем присоединения этого фрагмента к основному дереву
    const fragment = document.createDocumentFragment();

    for (let key in objCookies) {
        // что проверяется в этом условии
        if (isMatching(key, filterNameInput.value) || isMatching(objCookies[key], filterNameInput.value)) {
            const tr = document.createElement('tr');
            const tdName = document.createElement('td');
            const tdValue = document.createElement('td');
            const delButton = document.createElement('button');

            delButton.classList.add('del-button');
            delButton.dataset.cookieName = key;
            // дата-атрибуты ^^
            tdName.textContent = key;
            tdValue.textContent = objCookies[key];
            delButton.innerHTML = 'удалить';
            tr.appendChild(tdName);
            tr.appendChild(tdValue);
            tr.appendChild(delButton);
            fragment.appendChild(tr);
        }
    }
    listTable.appendChild(fragment);
}

function isMatching(full, chunk) {
// includes() определяет, содержит ли массив определённый элемент, возвращая true или false
    return full.toLowerCase().includes(chunk.toLowerCase());
}

function getCookies() {
// сначала разделяем нашу плоскую строку (c cookie) на "; "
// split - деструктуризация по массиву 
    return document.cookie.split('; ').reduce((prev, current) => {
        const [name, value] = current.split('=');

        prev[name] = value;

        return prev;
    }, []);
//     !!! заносим все в массив или объект? т.к. обращаемся мы потом как к объекту !!!
// последняя строка - заносим все элементые, разделенные и созданые методом reduce, в пустой массив
}

// зачем в конце отдельно вызывается эта функция
loadCookies();