import react from "react";

class Api {

    constructor({ baseURL, headers }) {
        this._baseURL = baseURL;
        this._headers = headers;
    }

    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Error: ${res.status}`);
        }
        return res.json();
    }

    getInitialCards = () => {
        return fetch(`${this._baseURL}/cards`, {
            headers: this._headers
        })
            .then(res => this._getResponseData(res))
    }

    getUserInfo = () => {
        return fetch(`${this._baseURL}/users/me`, {
            headers: this._headers
        })
            .then(res => this._getResponseData(res))
    }

    createNewCard = (data) => {
        return fetch(`${this._baseURL}/cards`, {
            headers: this._headers,
            method: 'POST',
            body: JSON.stringify(data)
        })
            .then(res => this._getResponseData(res))
    }

    deleteCard = (cardId) => {
        return fetch(`${this._baseURL}/cards/${cardId}`, {
            headers: this._headers,
            method: 'DELETE'
        })
            .then(res => this._getResponseData(res))
    }

    setUserInfo = ({ name, about }) => {
        return fetch(`${this._baseURL}/users/me`, {
            headers: this._headers,
            method: 'PATCH',
            body: JSON.stringify({
                name: name,
                about: about
            })
        })
            .then(res => this._getResponseData(res))
    }

    setUserImage = (avatar) => {
        return fetch(`${this._baseURL}/users/me/avatar`, {
            headers: this._headers,
            method: 'PATCH',
            body: JSON.stringify({
                avatar: avatar
            })
        })
            .then(res => this._getResponseData(res))
    }

    likeCard = (cardId) => {
        return fetch(`${this._baseURL}/cards/likes/${cardId}`, {
            headers: this._headers,
            method: 'PUT'
        })
            .then(res => this._getResponseData(res))
    }

    unLikeCard = (cardId) => {
        return fetch(`${this._baseURL}/cards/likes/${cardId}`, {
            headers: this._headers,
            method: 'DELETE'
        })
            .then(res => this._getResponseData(res))
    }
}

export const api = new Api({
    baseURL: "https://around.nomoreparties.co/v1/group-12",
    headers: {
        authorization: "001651b9-e63d-4f3d-8d65-ab968b3111ee",
        "Content-Type": "application/json"
    }
});

export default Api;