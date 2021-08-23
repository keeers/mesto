export default class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
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
                    this._initialCards.unshift({ name: item.name, link: item.link, likesCount: item.likes.length, likes: item.likes, owner: item.owner._id, id: item._id })
                });
                return this._initialCards;
            });
    }

    getUserInfo() {
        this._userInfo = {};
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
                return this._userInfo;
            })
    }

    getUserId() {
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
                this._userId = data._id;
                return this._userId;
            })
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

    deleteCard(id) {
        return fetch(`${this._baseUrl}/cards/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: this._headers.authorization,
                'Content-Type': this._headers["Content-Type"]
            }
        }).then(res => {
            if (res.ok) {
                return res.json();
            } return Promise.reject(`Ошибка: ${res.status}`);
        });
    }

    setLike(id) {
        return fetch(`${this._baseUrl}/cards/likes/${id}`, {
            method: 'PUT',
            headers: {
                authorization: this._headers.authorization,
                'Content-Type': this._headers["Content-Type"]
            }
        }).then(res => {
            if (res.ok) {
                return res.json();
            } return Promise.reject(`Ошибка: ${res.status}`);
        });
    }

    removeLike(id) {
        return fetch(`${this._baseUrl}/cards/likes/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: this._headers.authorization,
                'Content-Type': this._headers["Content-Type"]
            }
        }).then(res => {
            if (res.ok) {
                return res.json();
            } return Promise.reject(`Ошибка: ${res.status}`);
        });
    }

    setAvatar(link) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: this._headers.authorization,
                'Content-Type': this._headers["Content-Type"]
            },
            body: JSON.stringify({
                avatar: link
            })
        }).then(res => {
            if (res.ok) {
                return res.json();
            } return Promise.reject(`Ошибка: ${res.status}`);
        });
    }
}
