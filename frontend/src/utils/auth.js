class Auth {

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

  register = (email, password) => {
    console.log({ email, password })
    return fetch(`${this._baseURL}/signup`, {
      method: "POST",
      headers: this._headers,
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
    console.log(email)
    return fetch(`${this._baseURL}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password, email })
    })
      .then((res) => this._getResponseData(res))
      .then((data) => {
        if (data) {
          localStorage.setItem("jwt", data);
          return data;
        } else {
          throw new Error('the user email not found')
        }
      })
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
  headers: { 
    "Accept": localStorage.getItem('token'), 
    'Content-Type': 'application/json', 
  }, 
}); 