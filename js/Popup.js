export class Popup{// открывает или закрывает попап
  constructor(popup){
    this.popup = popup;
  }

  openPopup() {
  this.popup.classList.add('popup_open');
  document.addEventListener("keydown", this._haftEscapeKey);
  }

  closePopup() {
  this.popup.classList.remove('popup_open');
  document.removeEventListener("keydown", this._haftEscapeKey);
  }

  _haftEscapeKey(event) {
    if (event.key === "Escape") {
      closePopup(document.querySelector('.popup_open'));
    }
  }
}

export class PopupFoto extends Popup { //заполняет попап фото - показывает изображение и текст, возвращает element

  static elPopupFoto = document.querySelector('#popupFoto');
  static elImage = PopupFoto.elPopupFoto.querySelector('.popup__img');
  static elDescription = PopupFoto.elPopupFoto.querySelector('.popup__description');

  constructor(text,img){
    super(PopupFoto.elPopupFoto);
    this.text = text;
    this.img = img;
  }

  _fill(){
    PopupFoto.elImage.src = this.img;
    PopupFoto.elImage.alt = this.text;
    PopupFoto.elDescription.textContent = this.text;
  }

  openPopup(){
    this._fill();
    super.openPopup(PopupFoto.elPopupFoto);
    return PopupFoto.elPopupFoto;
  }

  closePopup(){
    super.closePopup(elPopupFoto);
  }

}
