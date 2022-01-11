class Auth {

  constructor({ baseURL, headers }) {
    this._baseURL = baseURL;
    this._headers = headers;
  }

  _getResponseData(res) {
    console.log(res)
    if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`);
    }
    return res.json();
  }

  register = ({ email, password }) => {
    console.log({ email, password })
    return fetch(`${this._baseURL}/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        password,
        email,
      }),
    })
      .then((res) => this._getResponseData(res));
  };

  authorize = (email, password) => {
    return fetch(`${this._baseURL}/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ password, email })
    })
      .then((res) => this._getResponseData(res))
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          return data;
        }
      });
  };

  checkToken = (token) => {
    console.log(token)
    return fetch(`${this._baseURL}/users/me`, {
      method: 'GET',
      headers: {
        Accept: "application/json",
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      }
    })
      .then((res) => this._getResponseData(res));
  }
}



export default new Auth({
  baseURL: "https://api.around-porat.students.nomoreparties.sbs",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  }
});