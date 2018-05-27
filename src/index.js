VK.init({
    apiId: 6490487
});

function auth() {
    return new Promise((resolve, reject) => {
        VK.Auth.login(data => {
            if (data.session) {
                resolve();
            } else {
                reject(new Error('Не удалось авторизоваться'));
            }
        }, 2);
        // 2 - доступ к друзьям, номер списка прав
    });
}

function callAPI(method, params) {
    params.v = '5.78';

    return new Promise((resolve, reject) => {
        VK.api(method, params, (data) => {
            if (data.error) {
                reject(data.error);
            } else {
                resolve(data.response);
            }
        });
    })
}

auth()
    .then(() => {
        return callAPI('users.get', { name_case: 'gen' });
        // вызываем ФИ юзера и делаем ее в родительнском падеже - name_case: 'gen'
    })
    .then(([me]) => {
        const headerInfo = document.querySelector('.friend__title');
        headerInfo.textContent = `Друзья на странице ${me.first_name} ${me.last_name}`;

        return callAPI('friends.get', { fields: 'photo_100' });
    })
    .then(friends => {
        const template = document.querySelector('#user-template').textContent;
        const render = Handlebars.compile(template);
        const html = render(friends);
        const results = document.querySelector('#friend__list');

        results.innerHTML = html;
    });
    // .then(friends => {
    //     console.log(friends);
    // });