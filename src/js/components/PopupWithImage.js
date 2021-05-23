import Popup from './Popup.js';
export default class PopupWithImage extends Popup { //заполняет попап фото - показывает изображение и текст
  constructor(popupSelector){
    super(popupSelector);
    this._popupImg = this.popup.querySelector('.popup__img');
    this._description = this.popup.querySelector('.popup__description');
  }
  open(text,img){
    this._popupImg.src = img;
    this._popupImg.alt = text;
    this._description.textContent = text;
    super.open();
  }
}
