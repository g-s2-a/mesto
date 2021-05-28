// Card — модуль

export default class Card { //класс Card создаёт карточку с текстом и ссылкой на изображение,
  constructor({name, link, _id, likes, owner}, selector, handleCardClick, handleDeleteClick, idUser,saveLike, removeLike, ) {
      this._text = name;
      this._image = link;
      this._selector = selector;
      this._handleCardClick = handleCardClick;
      this._handleDeleteClick = handleDeleteClick;
      this._id = _id;
      this._idUserCard = owner._id;
      this._idUser= idUser;
      this._likes= likes;
      this._saveLike = saveLike;
      this._removeLike = removeLike;
  }

  _getTemplate() { //задача — вернуть разметку карточки через return
    // забираем размеку из HTML и клонируем элемент
    const cardElement = document.querySelector(this._selector).content.querySelector('.attraction').cloneNode(true);
    // вернём DOM-элемент карточки
    return cardElement;
  }

  //устанавливает или снимает лайк
  _togglePopupLike(){
    this._likeButton.classList.contains('attraction__like_b') ? this._removeLike(this._id,this) : this._saveLike(this._id,this)
    //this._likeButton.classList.toggle('attraction__like_b');
  }

  _setSignLike() { // выделение / снятие выделния для текущего лайка
    if (this._likes.find(el => el._id == this._idUser) != undefined) {
      this._likeButton.classList.add('attraction__like_b')
    } else {
      this._likeButton.classList.remove('attraction__like_b')
    };
  }

  updateLikes(likes){
    this._likes = likes;

    this._setSignLike();
    this._quantityLikes.textContent = this._likes.length;
    card.querySelector('.attraction__like').classList.remove('attraction__like_b')
  }

  //установить слушатели событий
  _setEventListeners() {
    this._likeButton.addEventListener("click",() => this._togglePopupLike());
    this._deleteButton.addEventListener("click",() => this._handleDeleteClick(this._id));
    this._imageElement.addEventListener("click", () => this._handleCardClick(this._text,this._image));
  }

  //создание карточки
  generateCard(){

    this._element = this._getTemplate();
    this._titleElement = this._element.querySelector('.attraction__name-attraction');
    this._imageElement = this._element.querySelector('.attraction__image');
    this._likeButton = this._element.querySelector('.attraction__like');
    this._deleteButton = this._element.querySelector('.attraction__delete');
    this._quantityLikes = this._element.querySelector('.attraction__number-likes');

    this._setEventListeners(); //установка обработчиков событий

    //-------------
    this._titleElement.textContent = this._text;

    this._imageElement.src = this._image;
    this._imageElement.title = this._text;
    this._imageElement.alt = this._text;

    this._element.dataset.id = this._id;
    this._element.dataset.id_autor = this._idUserCard;

    if (this._idUserCard == this._idUser){
      this._deleteButton.classList.remove('attraction__delete_hidden');
    }

    this._setSignLike()
    this._quantityLikes.textContent = this._likes.length;

    return this._element;
  }

  getId(){
    return this._id;
  };

}; // IIFE возвращает объект
