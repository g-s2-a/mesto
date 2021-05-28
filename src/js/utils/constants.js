export const initialCards = [
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
export const settingsObject = {
  formSelector: '.popup__content',
  inputSelector: '.popup__edit',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__edit_type_error',
  errorClass: 'popup__error_visible'
}

//элемнты профиля
export const popupProfileSelector = "#popup"; // селектор попап профиля
export const popupFotoSelector = ".popup_foto"; // селектор попап фото

export const buttonShowPopup = document.querySelector(".profile__edit-button"); // кнопка редактирования профиля

export const formSelector = ".popup__content"; //селектор форм попап
export const nameInput = document.querySelector("#popupName"); // поле ввода имени
export const jobInput = document.querySelector("#popupProfession"); //поле ввода професии

export const profileFotoSelector = ".profile__image"; // текущее фото профиля
export const profileUserSelector = ".profile__title"; // текущий заголовок профиля
export const profileInfoSelector = ".profile__kind-of-activity"; //текущая профессия профиля

//элементы попап delete
export const popupDeleteSelector = ".popup_delete"; // селектор попап фото
export const idCardInput = document.querySelector("#prodId"); // поле ШВ;

//элементы попап изменениея автара
export const buttonEditAvatarPopup = document.querySelector(".profile__edit-avatar-button");
export const popupEditAvatarSelector = ".popup_edit-avatar";

// popup Добавить место
export const popupPlaceSelector = '#popupPlace'; //селектор блока добавления формы места

export const buttonAddPlace = document.querySelector(".profile__add-button"); //кнопка добавить место

export const placeNameInput = popupPlace.querySelector('#placeName'); //поле ввода названия места
export const placeLinkInput = popupPlace.querySelector('#placePhoto'); //поле ввода ссылки на фото

// все попапы
export const popups = document.querySelectorAll(".popup");


