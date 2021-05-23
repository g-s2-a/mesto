import Popup from './Popup.js';
export default class PopupWithImage extends Popup { //заполняет попап фото - показывает изображение и текст
  constructor(popupSelector){
    super(popupSelector);
  }
  open(text,img){
    const popupIm = this.popup.querySelector('.popup__img');
    popupIm.src = img;
    popupIm.alt = text;
    this.popup.querySelector('.popup__description').textContent = text;
    super.open();
  }
}
