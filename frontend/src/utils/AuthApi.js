export const BASE_URL = 'https://api.mesto.sikacheva.nomoreparties.sbs';
// export const BASE_URL = 'http://localhost:3000';
const headers = {
  'Content-Type': 'application/json'
}

  const getJson = (res) =>  {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  }

  export const register = (password, email) => {
    return fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        password,
        email
      })
    })
    .then(getJson)
  };

  export const login = (password, email) => {
    return fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        password,
        email
      })
    })
    .then(getJson)
  };

  export const checkToken = () => {
    const token = localStorage.getItem('jwt');
    return fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
        headers,
        "Authorization" : `Bearer ${token}`
      }
    })
    .then(getJson)
  }