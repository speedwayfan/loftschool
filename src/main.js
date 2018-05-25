VK.init({
    apiId: 6489954
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

auth().then(() => console.log('ok'));