const BASE_URL = 'https://auth.nomoreparties.co';
const headers = {
  'Content-Type': 'application/json'
}

  const getJson = (res) =>  {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  }

  const request = (url, options) => {
    return fetch(`${BASE_URL}${url}`, options).then(getJson)
  }

  export const register = (password, email) => {
    return request('/signup', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        password,
        email
      })
    })
  };

  export const login = (password, email) => {
    return request('/signin', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        password,
        email
      })
    })
  };

  export const checkToken = (token) => {
    return request('/users/me', {
      method: 'GET',
      headers: {
        headers,
        "Authorization" : `Bearer ${token}`
      }
    })
  }