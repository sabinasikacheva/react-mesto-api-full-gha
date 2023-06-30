class Api {
    constructor({ basePath }) {
        this._basePath = basePath;
        //this._headers = headers;
    }

    // setToken(token) {
    //     this._headers.Authorization = `Bearer ${token}`;
    //   }
    _getHeaders() {
      const token = localStorage.getItem('jwt');
      return {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`
      };
  }
    _getJson(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getInitialCards() {
        
      return fetch(`${this._basePath}/cards`, { 
        headers: this._getHeaders(), 
      })
        .then(this._getJson);
    }

    createCard(item) {
        return fetch(`${this._basePath}/cards`, {
            method: "POST",
            hheaders: this._getHeaders(),
            body: JSON.stringify(item),
        })
          .then(this._getJson);
    }

    deleteCard(id) {
        return fetch(`${this._basePath}/cards/${id}`, {
            method: "DELETE",
            headers: this._getHeaders(),
        })
          .then(this._getJson);
    }

    setLike(id) {
        return fetch(`${this._basePath}/cards/${id}/likes`, {
            method: 'PUT',
            headers: this._getHeaders(),
        })
          .then(this._getJson);
    }

    deleteLike(id) {
        return fetch(`${this._basePath}/cards/${id}/likes`, {
            method: 'DELETE',
            headers: this._getHeaders(),
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
        return fetch(`${this._basePath}/users/me`, {
          headers: this._getHeaders(),
        })
          .then(this._getJson);
    }

    setUserInfo(item) {
        return fetch(`${this._basePath}/users/me`, {
            method: "PATCH",
            headers: this._getHeaders(),
            body: JSON.stringify({
                name: item.name,
                about: item.about
            })
        })
          .then(this._getJson);
    }

    changeUserAvatar(data) {
        return fetch(`${this._basePath}/users/me/avatar`, {
            method: "PATCH",
            headers: this._getHeaders(),
            body: JSON.stringify(data),
        })
          .then(this._getJson);
    }
}

const api = new Api({
    basePath: "https://api.mesto.sikacheva.nomoreparties.sbs",
    // basePath: "http://localhost:3000",
    // headers: {
    //   "Content-Type": "application/json",
    //   Authorization: "",
    // }
})

export default api;    

