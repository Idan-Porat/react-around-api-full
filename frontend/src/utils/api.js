class Api {

    constructor({ baseURL }) {
        this._baseURL = baseURL;
    }

    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Error: ${res.status}`);
        }
        return res.json();
    }

    getInitialCards = (token) => {
        return fetch(`${this._baseURL}/cards`, {
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${token}`,
            },
        })
            .then(res => this._getResponseData(res))
    }

    getUserInfo = (token) => {
        return fetch(`${this._baseURL}/users/me`, {
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${token}`,
            },
        })
            .then(res => this._getResponseData(res))
    }

    createNewCard = (data, token) => {
        return fetch(`${this._baseURL}/cards`, {
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${token}`,
            },
            method: 'POST',
            body: JSON.stringify(data)
        })
            .then(res => this._getResponseData(res))
    }

    deleteCard = (cardId, token) => {
        return fetch(`${this._baseURL}/cards/${cardId}`, {
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${token}`,
            },
            method: 'DELETE'
        })
            .then(res => this._getResponseData(res))
    }

    setUserInfo = ({ name, about }, token) => {
        return fetch(`${this._baseURL}/users/me`, {
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${token}`,
            },
            method: 'PATCH',
            body: JSON.stringify({
                name: name,
                about: about
            })
        })
            .then(res => this._getResponseData(res))
    }

    setUserImage = (avatar, token) => {
        return fetch(`${this._baseURL}/users/me/avatar`, {
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${token}`,
            },
            method: 'PATCH',
            body: JSON.stringify({
                avatar: avatar
            })
        })
            .then(res => this._getResponseData(res))
    }

    likeCard = (cardId, token) => {
        return fetch(`${this._baseURL}/cards/likes/${cardId}`, {
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${token}`,
            },
            method: 'PUT'
        })
            .then(res => this._getResponseData(res))
    }
    unLikeCard = (cardId, isLiked, token) => {
        return fetch(`${this._baseURL}/cards/likes/${cardId}`, {
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${token}`,
            },
            method: `${isLiked ? "PUT" : "DELETE"}`,
        })
            .then(res => this._getResponseData(res))
    }
}

export default new Api({
    baseURL: "https://api.around-porat.students.nomoreparties.sbs",
});