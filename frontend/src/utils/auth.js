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

  register = (email, password) => {
    console.log({ email, password })
    return fetch(`${this._baseURL}/signup`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password,
        email,
      }),
    })
      .then((res) => this._getResponseData(res))
      .then((res) => {
        console.log(res)
        return res;
      })
  };

  authorize = (email, password) => {
    return fetch(`${this._baseURL}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password, email })
    })
      .then((res) => this._getResponseData(res))
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
        }
      });
  };

  checkToken = (token) => {
    console.log(token)
    return fetch(`${this._baseURL}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`
      }
    })
      .then((res) => this._getResponseData(res))
      .then((res) => {
        return res;
      })
  }
}



export default new Auth({
  baseURL: "https://api.around-porat.students.nomoreparties.sbs",
});