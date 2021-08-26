export default class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    _getResponse(res) {
        if (res.ok) {
            return res.json();
        } return Promise.reject(`Ошибка: ${res.status}`)
    }

    getInitialCards() {
        this._initialCards = [];
        return fetch(`${this._baseUrl}/cards`, {
            headers: {
                authorization: this._headers.authorization,
                'Content-Type': this._headers["Content-Type"]
            }
        })
            .then(res => this._getResponse(res));
    }

    getUserInfo() {
        this._userInfo = {};
        return fetch(`${this._baseUrl}/users/me`, {
            headers: {
                authorization: this._headers.authorization,
                'Content-Type': this._headers["Content-Type"]
            }
        })
            .then(res => this._getResponse(res));
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
        }).then(res => this._getResponse(res));
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
        }).then(res => this._getResponse(res));
    }

    deleteCard(id) {
        return fetch(`${this._baseUrl}/cards/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: this._headers.authorization,
                'Content-Type': this._headers["Content-Type"]
            }
        }).then(res => this._getResponse(res));
    }

    addLike(id) {
        return fetch(`${this._baseUrl}/cards/likes/${id}`, {
            method: 'PUT',
            headers: {
                authorization: this._headers.authorization,
                'Content-Type': this._headers["Content-Type"]
            }
        }).then(res => this._getResponse(res));
    }

    removeLike(id) {
        return fetch(`${this._baseUrl}/cards/likes/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: this._headers.authorization,
                'Content-Type': this._headers["Content-Type"]
            }
        }).then(res => this._getResponse(res));
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
        }).then(res => this._getResponse(res));
    }

}
