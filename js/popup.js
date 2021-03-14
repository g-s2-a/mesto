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
const addPlaceForm = popupPlace.querySelector('.popup__content'); //форма добавить место
const savePlaceButton = popupPlace.querySelector("#popup__save");

const placeNameInput = popupPlace.querySelector('#placeName'); //поле ввода названия места
const placeLinkInput = popupPlace.querySelector('#placePhoto'); //поле ввода ссылки на фото

// popup фото
const popupFoto = document.querySelector('#popupFoto');
const image = popupFoto.querySelector('.popup__img');
const description = popupFoto.querySelector('.popup__description');
const closePlaceFotoButton = popupFoto.querySelector('.popup__close');


function formSubmitHandler(event){
    event.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileKind.textContent = jobInput.value;
    togglePopup();
}

function formSubmitPlace(event){
  event.preventDefault();
  //создаю элемент места
  addPlace(placeNameInput.value,placeLinkInput.value);
  togglePopupPlace();
}

function togglePopup(event){
    if(!popup.classList.contains('popup_open')){
        nameInput.value = profileTitle.textContent;
        jobInput.value = profileKind.textContent;
    }
    popup.classList.toggle('popup_open');
}

function togglePopupPlace(event){
  popupPlace.classList.toggle('popup_open');
}

function togglePopupLike(event){
  event.stopPropagation();
  event.target.classList.toggle('attraction__like_b');
}

function togglePopupFoto(event){
  if(!popupFoto.classList.contains('popup_open')){
    descr = event.target.parentElement.querySelector('.attraction__name-attraction').innerText;
    image.src = event.target.currentSrc;
    image.alt = descr;
    description.textContent = descr;
  }
  popupFoto.classList.toggle('popup_open');
}

function deletePlace(event){
  event.stopPropagation();
  event.target.parentElement.remove();
}

function addPlace(name,link){
  // клонируем содержимое
  const attraction = templatePlace.querySelector('.attraction').cloneNode(true);
  attraction.querySelector('.attraction__image').src = link;
  attraction.querySelector('.attraction__image').title = name;
  attraction.querySelector('.attraction__image').alt = name;

  attraction.querySelector('.attraction__name-attraction').textContent = name;
  attraction.querySelector('.attraction__like').addEventListener("click",togglePopupLike);
  attraction.querySelector('.attraction__delete').addEventListener("click",deletePlace);
  attraction.addEventListener("click",togglePopupFoto);
  places.prepend(attraction);
}

showPopupButton.addEventListener("click",togglePopup);
closePopupButton.addEventListener("click",togglePopup);
formElement.addEventListener("submit", formSubmitHandler);

buttonAddPlace.addEventListener("click",togglePopupPlace);
closePlaceButton.addEventListener("click",togglePopupPlace);
popupPlace.addEventListener("submit",formSubmitPlace);

closePlaceFotoButton.addEventListener("click",togglePopupFoto);

const templatePlace = document.querySelector('#template_place').content;
const places = document.querySelector('.places');


initialCards.forEach((item) => {
  addPlace(item.name,item.link)
});
