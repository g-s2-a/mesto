
export class Api {

  constructor({ baseUrl, token }) {
    this.baseUrl = baseUrl
    this.token = token
  }

  _checkResponse(res) {
      if (res.ok) {
        return res.json()
      } else {
        return Promise.reject(`status: ${res.status}`)
      }

  }

  getInitialCards() {
    return fetch(`${this.baseUrl}cards`, {
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      }
    })
    .then(this._checkResponse);
  }

  //создание карточки
  createCard({ name, link }) {
    return fetch(`${this.baseUrl}cards`, {
      method: 'POST',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
    .then(this._checkResponse);
  }

  // получение пользователя
  getUserData() {
    return fetch(`${this.baseUrl}users/me`, {
      headers: {
        authorization: this.token,
      }
    })
    .then(this._checkResponse);
  };
  // изменение пользователя
  saveUserData(userData) {
    return fetch(`${this.baseUrl}users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: userData.popupName,
        about: userData.popupProfession
      })
    })
    .then(this._checkResponse);
  };
  // изменение аватарки
  saveUserAvatar(userData) {
    return fetch(`${this.baseUrl}users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: userData.nameImg
      })
    })
    .then(this._checkResponse);
  };

  // поставить лайк
  saveLike(cardId) {
    return fetch(`${this.baseUrl}cards/likes/${cardId}`, {
      method: 'PUT',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      }
    })
    .then(this._checkResponse);
  };

  // снять лайк
  removeLike(cardId) {
    return fetch(`${this.baseUrl}cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      }
    })
    .then(this._checkResponse);
  };


  deleteCard(id) {
    return fetch(`${this.baseUrl}cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      }
    })
    .then(this._checkResponse);
  };

}


