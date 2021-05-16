import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

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
const settings_object = {
  formSelector: '.popup__content',
  inputSelector: '.popup__edit',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__edit_type_error',
  errorClass: 'popup__error_visible'
}

const showPopupButton = document.querySelector(".profile__edit-button"); // кнопка редактирования профиля
const popup = document.querySelector("#popup"); // блок редактирования профиля
const closePopupButton = popup.querySelector(".popup__close"); //кнопка закрытия блока
const formElement = popup.querySelector(".popup__content"); // форма блока
const nameInput = popup.querySelector("#popupName"); // поле ввода имени
const jobInput = popup.querySelector("#popupProfession"); //поле ввода професии

const profileTitle = document.querySelector(".profile__title"); // текущий заголовок профиля
const profileKind = document.querySelector(".profile__kind-of-activity"); //текущая профессия профиля

// popup Добавить место
const buttonAddPlace = document.querySelector(".profile__add-button"); //кнопка добавить место
const popupPlace = document.querySelector('#popupPlace'); //блок добавления формы
const closePlaceButton = popupPlace.querySelector(".popup__close"); //кнопка закрытия блока

const placeNameInput = popupPlace.querySelector('#placeName'); //поле ввода названия места
const placeLinkInput = popupPlace.querySelector('#placePhoto'); //поле ввода ссылки на фото

// popup фото
const popupFoto = document.querySelector('#popupFoto');
const image = popupFoto.querySelector('.popup__img');
const description = popupFoto.querySelector('.popup__description');
const closePlaceFotoButton = popupFoto.querySelector('.popup__close');

const popups = document.querySelectorAll(".popup");

function closePopup(popup) {
  popup.classList.remove('popup_open');
  document.removeEventListener("keydown", haftEscapeKey);
}

function haftEscapeKey(event) {
  if (event.key === "Escape") {
    closePopup(document.querySelector('.popup_open'));
  }
}

// открывает любой попап
function openPopup(popup) {
  popup.classList.add('popup_open');
  document.addEventListener("keydown", haftEscapeKey);
}

// открывает попап профиля
function openProfilePopup(event){
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileKind.textContent;
  openPopup(popup);
}

// записывает значения профиля и закрывает попап
function formSubmitHandler(event){
    event.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileKind.textContent = jobInput.value;
    closePopup(popup);
}


//создает и записывает новое место, закрывает попап
function formSubmitPlace(event){
  event.preventDefault();
  const newСard = new Card(placeNameInput.value, placeLinkInput.value,'#template_place').generateCard();
  addPlace(newСard); //помещаем новое место в разметку
  closePopup(popupPlace);
}

//открывает попап с изображением места
function openPopupFoto(name, link){
    image.src = link;
    image.alt = name;
    description.textContent = name;
    openPopup(popupFoto);
}

function addPlace(attraction){ // и помещает в разметку
  // добавляем созданый элемент в разметку
  places.prepend(attraction);
}

showPopupButton.addEventListener("click", openProfilePopup);
formElement.addEventListener("submit", formSubmitHandler);
closePopupButton.addEventListener("click", () => closePopup(popup));

popups.forEach((item) => {
  item.addEventListener("click",function (event) {
   if (event.currentTarget == event.target){
     closePopup(event.target)
   }
  }
  );
});



buttonAddPlace.addEventListener("click",() => openPopup(popupPlace));
popupPlace.addEventListener("submit",formSubmitPlace);
closePlaceButton.addEventListener("click", () => closePopup(popupPlace));

closePlaceFotoButton.addEventListener("click",() => closePopup(popupFoto));


//шаблон места
//const templatePlace = document.querySelector('#template_place').content;

const places = document.querySelector('.places');

initialCards.forEach((item) => {
  const newСard = new Card(item.name, item.link,'#template_place').generateCard();
  addPlace(newСard); //помещаем новое место в разметку
});





function enableValidation(settings_object) {
  const forms = Array.from(
    document.querySelectorAll("form")
  );

  forms.forEach((form) => {
    const enableValidation = new FormValidator(settings_object,form);
    enableValidation.enableValidation();
  });
}


enableValidation(settings_object);
