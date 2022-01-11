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
            headers: this._headers,
        })
            .then(res => this._getResponseData(res))
            .then(res => {
                return res.data;
            })
    }

    getUserInfo = () => {
        return fetch(`${this._baseURL}/users/me`, {
            headers: this._headers,
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
            headers:this._headers,
            method: 'DELETE'
        })
            .then(res => this._getResponseData(res))
    }

    setUserInfo = ({ name, about }) => {
        return fetch(`${this._baseURL}/users/me`, {
            headers:this._headers,
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

    changeLikeCardStatus = (cardId, isLiked) => {
        return fetch(`${this._baseURL}/cards/likes/${cardId}`, {
            headers: this._headers,
            method: `${isLiked ? "PUT" : "DELETE"}`,
        })
            .then(res => this._getResponseData(res))
    }
}

export default new Api({
    baseURL: "https://api.around-porat.students.nomoreparties.sbs",
    headers: {
        "content-type": "application/json",
        authorization: ``,
    },
});