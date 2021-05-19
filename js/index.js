import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { Popup } from './Popup.js';

function validationForm(form){
    const enableValidation = new FormValidator(settingsObject,form);
    enableValidation.enableValidation();
}

function enableValidation() {//включить валидацию
  const forms = Array.from(document.querySelectorAll("form"));

  forms.forEach((form) => {
    validationForm(form);
  });
}

// открывает попап профиля
function openProfilePopup(event){
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileKind.textContent;
  new Popup(popup).openPopup();

  //валидация после открытия попапа
  validationForm(formPopapProfile);
}

function formSubmitHandler(event){// записывает значения профиля и закрывает попап
    event.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileKind.textContent = jobInput.value;
    new Popup(popup).closePopup();
}

function clearingPopup(popup){// очищает попап
  const inputs = popup.querySelectorAll("input");
  inputs.forEach((item) => {
    item.value = "";
  })
}

function createsСard(name,link,selector){ // создает новую карточку места
  const newСard = new Card(name, link,selector).generateCard();
  addPlace(newСard); //помещаем новое место в разметку
}

function formSubmitPlace(event){ //создает и записывает новое место, закрывает попап
  event.preventDefault();
  createsСard(placeNameInput.value,placeLinkInput.value,'#template_place');
  clearingPopup(popupPlace); //очищает поля ввода попап
  new Popup(popupPlace).closePopup();
}

function addPlace(attraction){ // и помещает в разметку
  // добавляем созданый элемент в разметку
  places.prepend(attraction);
}

showPopupButton.addEventListener("click", openProfilePopup);
formPopapProfile.addEventListener("submit", formSubmitHandler);
buttonAddPlace.addEventListener("click",() => new Popup(popupPlace).openPopup());
popupPlace.addEventListener("submit",formSubmitPlace);

popups.forEach((cardFormModalWindow) => {
  cardFormModalWindow.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
      new Popup(cardFormModalWindow).closePopup();
    }
  });
});

initialCards.forEach((item) => {
  createsСard(item.name, item.link,'#template_place');
});

enableValidation(settingsObject);