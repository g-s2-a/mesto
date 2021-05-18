// Card — модуль
import { openPopup } from './Popup.js';

export class Card { //класс Card создаёт карточку с текстом и ссылкой на изображение
  constructor(text, image, selector) {
      this._text = text;
      this._image = image;
      this._selector = selector;
  }

  _getTemplate() { //задача — вернуть разметку карточки через return
    // забираем размеку из HTML и клонируем элемент
    const cardElement = document.querySelector(this._selector).content.querySelector('.attraction').cloneNode(true);
    // вернём DOM-элемент карточки
    return cardElement;
  }

  //устанавливает или снимает лайк
  _togglePopupLike(){
    this._element.querySelector('.attraction__like').classList.toggle('attraction__like_b');
  }

  //удаляет место
  _deletePlace(){
    this._element.remove();
  }

  //открывает попап карточки
  _openPopupFoto(name, link){
    image.src = link;
    image.alt = name;
    description.textContent = name;
    openPopup(popupFoto);
  }

  //установить слушатели событий
  _setEventListeners() {
    this._element.querySelector('.attraction__like').addEventListener("click",() => this._togglePopupLike());
    this._element.querySelector('.attraction__delete').addEventListener("click",() => this._deletePlace());
    this._element.querySelector('.attraction__image').addEventListener("click", () => this._openPopupFoto(this._text, this._image));
  }

  generateCard(){ //наполняю шаблон данными
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.attraction__name-attraction').textContent = this._text;

    const attractionImage = this._element.querySelector('.attraction__image');
    attractionImage.src = this._image;
    attractionImage.title = this._text;
    attractionImage.alt = this._text;

    return this._element;
  }

}; // IIFE возвращает объект
