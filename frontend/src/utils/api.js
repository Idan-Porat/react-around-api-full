class Api {

    constructor({ baseURL }) {
        this._baseURL = baseURL;
    }

    customFetch = (url, options) => {
        fetch(url, options).then((res) =>
            res.ok ? res.json() : Promise.reject(res.statusText),
        );
    }

    getInitialCards(token) {
        return this.customFetch(`${this._baseURL}/cards`, {
            method: 'GET',
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${token}`,
            },
        });
    }

    getUserInfo(token) {
        return this.customFetch(`${this._baseURL}/users/me`, {
            method: 'GET',
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${token}`,
            },
        })
    }

    createNewCard = (data, token) => {
        return this.customFetch(`${this._baseURL}/cards`, {
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${token}`,
            },
            method: 'POST',
            body: JSON.stringify(data)
        })
    }

    deleteCard = (cardId, token) => {
        return this.customFetch(`${this._baseURL}/cards/${cardId}`, {
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${token}`,
            },
            method: 'DELETE'
        })
            .then(res => this._getResponseData(res))
    }

    setUserInfo = ({ name, about }, token) => {
        return this.customFetch(`${this._baseURL}/users/me`, {
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
    }

    setUserImage = (avatar, token) => {
        return this.customFetch(`${this._baseURL}/users/me/avatar`, {
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${token}`,
            },
            method: 'PATCH',
            body: JSON.stringify({
                avatar: avatar
            })
        })
    }

    changeLikeCardStatus = (cardId, isLiked, token) => {
        return this.customFetch(`${this._baseURL}/cards/likes/${cardId}`, {
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${token}`,
            },
            method: `${isLiked ? "PUT" : "DELETE"}`,
        })
    }
}

export default new Api({
    baseURL: "https://api.around-porat.students.nomoreparties.sbs",
});