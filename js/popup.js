

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


function haftEscapeKey(key,popup) {
  if (key === "Escape") {
    closePopup(popup);
  }
}

function openPopup(popup) {
  popup.classList.add('popup_open');
  document.addEventListener("keydown", (evt) => haftEscapeKey(evt.key, popup));
}

function openProfilePopup(event){
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileKind.textContent;
  openPopup(popup);
}

function formSubmitHandler(event){
    event.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileKind.textContent = jobInput.value;
    closePopup(popup);
}

function formSubmitPlace(event){
  event.preventDefault();
  let newPlace = createNewPlace(placeNameInput.value,placeLinkInput.value); // создаю элемент места
  addPlace(newPlace); // помещаю новый элемент в разметку
  closePopup(popupPlace);
}

 function togglePopupPlace(event){
   popupPlace.classList.toggle('popup_open');
 }

function togglePopupLike(event){
  event.target.classList.toggle('attraction__like_b');
}

function openPopupFoto(name, link){
    image.src = link;
    image.alt = name;
    description.textContent = name;
    openPopup(popupFoto);
}

 function deletePlace(event){
   event.target.closest('.attraction').remove();
 }

 function createNewPlace(name,link){ // функция создает из шаблона новый элемент "Место" заполняет его
  // клонируем содержимое шаблона
  const attraction = templatePlace.querySelector('.attraction').cloneNode(true);

  // заполняем фото
  const attractionImage = attraction.querySelector('.attraction__image');
  attractionImage.src = link;
  attractionImage.title = name;
  attractionImage.alt = name;

  // заполняем название
  attraction.querySelector('.attraction__name-attraction').textContent = name;

  // вешаем обработчики на "кнопки"
  attraction.querySelector('.attraction__like').addEventListener("click",togglePopupLike);
  attraction.querySelector('.attraction__delete').addEventListener("click", deletePlace);
  attraction.querySelector('.attraction__image').addEventListener("click", () => openPopupFoto(name, link));

  return attraction;
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
   if (event.path[0] == event.target){
     closePopup(event.target)
   }
  }
  );
});



buttonAddPlace.addEventListener("click",() => openPopup(popupPlace));
popupPlace.addEventListener("submit",formSubmitPlace);
closePlaceButton.addEventListener("click", () => closePopup(popupPlace));

closePlaceFotoButton.addEventListener("click",() => closePopup(popupFoto));



const templatePlace = document.querySelector('#template_place').content;
const places = document.querySelector('.places');

initialCards.forEach((item) => {
  let newPlace = createNewPlace(item.name,item.link); //создаем новое место
  addPlace(newPlace); //помещаем новое место в разметку
});
