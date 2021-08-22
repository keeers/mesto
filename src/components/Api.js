export default class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
        this._userInfo = {};
    }

    getInitialCards() {
        this._initialCards = [];
        return fetch(`${this._baseUrl}/cards`, {
            headers: {
                authorization: this._headers.authorization,
                'Content-Type': this._headers["Content-Type"]
            }
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                } return Promise.reject(`Ошибка: ${res.status}`);
            })
            .then(data => {
                data.forEach(item => {
                    this._initialCards.unshift({ name: item.name, link: item.link, likes: item.likes.length })
                });
                console.log(this._initialCards)
                return this._initialCards;
            });
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: {
                authorization: this._headers.authorization,
                'Content-Type': this._headers["Content-Type"]
            }
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                } return Promise.reject(`Ошибка: ${res.status}`);
            })
            .then(data => {
                this._userInfo.name = data.name;
                this._userInfo.about = data.about;
                this._userInfo.avatar = data.avatar;
                this._userInfo._id = data._id;
                return this._userInfo;
            });
    }

    setUserInfo(userData) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this._headers.authorization,
                'Content-Type': this._headers["Content-Type"]
            },
            body: JSON.stringify({
                name: userData.nameInput,
                about: userData.jobInput
            })
        }).then(res => {
            if (res.ok) {
                return res.json();
            } return Promise.reject(`Ошибка: ${res.status}`);
        });
    }

    addNewCard(cardData) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: {
                authorization: this._headers.authorization,
                'Content-Type': this._headers["Content-Type"]
            },
            body: JSON.stringify({
                name: cardData.titleInput,
                link: cardData.linkInput
            })
        }).then(res => {
            if (res.ok) {
                return res.json();
            } return Promise.reject(`Ошибка: ${res.status}`);
        });
    }
}



