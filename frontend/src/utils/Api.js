class Api {
    constructor({ basePath, headers }) {
        this._basePath = basePath;
        this._headers = headers;
    }

    setToken(token) {
        this._headers.Authorization = `Bearer ${token}`;
      }

    _getJson(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getInitialCards() {
        
      return fetch(`${this._basePath}/cards`, { 
        headers: this._headers, 
      })
        .then(this._getJson);
    }

    createCard(item) {
        return fetch(`${this._basePath}/cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify(item),
        })
          .then(this._getJson);
    }

    deleteCard(id) {
        return fetch(`${this._basePath}/cards/${id}`, {
            method: "DELETE",
            headers: this._headers,
        })
          .then(this._getJson);
    }

    setLike(id) {
        return fetch(`${this._basePath}/cards/${id}/likes`, {
            method: 'PUT',
            headers: this._headers,
        })
          .then(this._getJson);
    }

    deleteLike(id) {
        return fetch(`${this._basePath}/cards/${id}/likes`, {
            method: 'DELETE',
            headers: this._headers,
        })
          .then(this._getJson);
    }

    changeLikeCardStatus(id, isLiked) {
        if (isLiked) {
          return this.setLike(id);
        } else {
          return this.deleteLike(id);
        }
      }

    getCurrentUser() {
        return fetch(`${this._basePath}/users/me`, { headers: this._headers })
          .then(this._getJson);
    }

    setUserInfo({ name, about }) {
        return fetch(`${this._basePath}/users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({ name, about })
        })
          .then(this._getJson);
    }

    changeUserAvatar({ avatar }) {
        return fetch(`${this._basePath}/users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({ avatar }),
        })
          .then(this._getJson);
    }
}

const api = new Api({
    basePath: "https://api.mesto.sikacheva.nomoreparties.sbs",
    // basePath: "http://localhost:3000",
    headers: {
      "Content-Type": "application/json",
      Authorization: "",
    }
})

export default api;    

