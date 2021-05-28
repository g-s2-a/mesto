
export class Api {

  constructor({ baseUrl, token }) {
    this.baseUrl = baseUrl
    this.token = token
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}cards`, {
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        } else {
          return Promise.reject(`status: ${res.status}`)
        }
      });
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
      .then(res => {
        if (res.ok) {
          return res.json()
        } else {
          return Promise.reject(`status: ${res.status}`)
        }
      })
  }

  // получение пользователя
  getUserData() {
    return fetch(`${this.baseUrl}users/me`, {
      headers: {
        authorization: this.token,
      }
    })
      .then(res => res.ok ? res.json() : Promise.reject(`status: ${res.status}`))
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
      .then(res => res.ok ? res.json() : Promise.reject(`status: ${res.status}`))
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
      .then(res => res.ok ? res.json() : Promise.reject(`status: ${res.status}`))
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
      .then(res => res.ok ? res.json() : Promise.reject(`status: ${res.status}`))
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
      .then(res => res.ok ? res.json() : Promise.reject(`status: ${res.status}`))
  };


  deleteCard(id) {
    return fetch(`${this.baseUrl}cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.ok ? res.json() : Promise.reject(`status: ${res.status}`))
  };

}


