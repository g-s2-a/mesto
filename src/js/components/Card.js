// Card — модуль

export default class Card { //класс Card создаёт карточку с текстом и ссылкой на изображение,
  constructor({name, link}, selector, handleCardClick) {
      this._text = name;
      this._image = link;
      this._selector = selector;
      this._handleCardClick = handleCardClick;
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

  //установить слушатели событий
  _setEventListeners() {
    this._likeButton.addEventListener("click",() => this._togglePopupLike());
    this._deleteButton.addEventListener("click",() => this._deletePlace());
    this._imageElement.addEventListener("click", () => this._handleCardClick(this._text,this._image));
  }

  //создание карточки
  generateCard(){

    this._element = this._getTemplate();
    this._titleElement = this._element.querySelector('.attraction__name-attraction');
    this._imageElement = this._element.querySelector('.attraction__image');
    this._likeButton = this._element.querySelector('.attraction__like');
    this._deleteButton = this._element.querySelector('.attraction__delete');

    this._setEventListeners(); //установка обработчиков событий

    //-------------
    this._titleElement.textContent = this._text;

    this._imageElement.src = this._image;
    this._imageElement.title = this._text;
    this._imageElement.alt = this._text;

    return this._element;
  }

}; // IIFE возвращает объект
