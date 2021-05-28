export default class UserInfo{
  constructor({profileUserSelector, profileInfoSelector, profileFotoSelector}){
    this._name = document.querySelector(profileUserSelector);
    this._profession = document.querySelector(profileInfoSelector);
    this._avatar = document.querySelector(profileFotoSelector);
  }

  //возвращает объект с данными пользователя. Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии
  getUserInfo(){
    return {name: this._name.textContent, profession: this._profession.textContent, idUser: this._idUser};
  }

  //принимает новые данные пользователя и добавляет их на страницу
  setUserInfo({name, about, avatar, _id}){
    this._name.textContent = name;
    this._profession.textContent = about;
    this._avatar.src = avatar;
    this._idUser = _id
  }
}
