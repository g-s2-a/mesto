export default class Popup{// открывает или закрывает попап
  constructor(popupSelector){
    this.popup = document.querySelector(popupSelector);
  }

  open() {
    this.popup.classList.add('popup_open');
    document.addEventListener("keydown", this._handleEscClose.bind(this));
  }

  close() {
    this.popup.classList.remove('popup_open');
    document.removeEventListener("keydown", this._handleEscClose.bind(this));
    
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }

  setEventListeners(){
    this.popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
        this.close();
      }
    });
  }

}


