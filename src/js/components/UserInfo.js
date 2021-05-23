export default class UserInfo{
  constructor({profileUserSelector, profileInfoSelector}){//{name, profession}
    this._name = document.querySelector(profileUserSelector);
    this._profession = document.querySelector(profileInfoSelector);
  }

  //возвращает объект с данными пользователя. Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии
  getUserInfo(){
    return {name: this._name.textContent, profession: this._profession.textContent};
  }

  //принимает новые данные пользователя и добавляет их на страницу
  setUserInfo(name, profession){
    this._name.textContent = name;
    this._profession.textContent = profession;
  }
}
