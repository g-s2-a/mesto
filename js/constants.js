const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// объект настроек
const settingsObject = {
  formSelector: '.popup__content',
  inputSelector: '.popup__edit',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__edit_type_error',
  errorClass: 'popup__error_visible'
}

const showPopupButton = document.querySelector(".profile__edit-button"); // кнопка редактирования профиля
const popup = document.querySelector("#popup"); // блок редактирования профиля
const formPopapProfile = popup.querySelector(".popup__content"); // форма попап профиля
const nameInput = popup.querySelector("#popupName"); // поле ввода имени
const jobInput = popup.querySelector("#popupProfession"); //поле ввода професии

const profileTitle = document.querySelector(".profile__title"); // текущий заголовок профиля
const profileKind = document.querySelector(".profile__kind-of-activity"); //текущая профессия профиля

// блок мест
const places = document.querySelector('.places');

// popup Добавить место
const buttonAddPlace = document.querySelector(".profile__add-button"); //кнопка добавить место
const popupPlace = document.querySelector('#popupPlace'); //блок добавления формы места

const placeNameInput = popupPlace.querySelector('#placeName'); //поле ввода названия места
const placeLinkInput = popupPlace.querySelector('#placePhoto'); //поле ввода ссылки на фото

// все попапы
const popups = document.querySelectorAll(".popup");


