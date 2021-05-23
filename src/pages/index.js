import './index.css';
import Section from '../js/components/Section.js';
import Card from '../js/components/Card.js';
import UserInfo from '../js/components/userInfo.js';

import {initialCards,
  popupProfileSelector,
  popupPlaceSelector,
  popupFotoSelector,
  formSelector,
  buttonShowPopup,
  buttonAddPlace,
  settingsObject,
  profileUserSelector,
  profileInfoSelector,
  nameInput,
  jobInput} from '../js/utils/constants.js';

import FormValidator from '../js/components/FormValidator.js';
import PopupWithImage from '../js/components/PopupWithImage.js';
import PopupWithForm from '../js/components/PopupWithForm.js';

//запись профиля
const entryProfile = ({popupName,popupProfession}) => {
  userInfo.setUserInfo(popupName, popupProfession);
}
const popupProfile = new PopupWithForm(popupProfileSelector,entryProfile);
const formPopapProfile = document.querySelector(popupProfileSelector).querySelector(formSelector);
const popupProfileValidation = new FormValidator(settingsObject,formPopapProfile);
popupProfileValidation.enableValidation();

const popupImage = new PopupWithImage(popupFotoSelector);
// открывает попап изображения
function openImagePopup(text,image){
  popupImage.open(text,image);
}
//функция отрисовки карточки (места)
const drawingСard = (item)=>{
  const newСard = new Card(item,'#template_place',openImagePopup);
  const cardElement = newСard.generateCard();
  cardList.addItem(cardElement);};

const popupPlace = new PopupWithForm(popupPlaceSelector, drawingСard);
const formPopapPlace = document.querySelector(popupPlaceSelector).querySelector(formSelector);
const popupPlaceValidation = new FormValidator(settingsObject,formPopapPlace);
popupPlaceValidation.enableValidation();

const cardList = new Section({items: initialCards, renderer: drawingСard},'.places');
const userInfo = new UserInfo({profileUserSelector,profileInfoSelector});

// открывает попап профиля
function openProfilePopup(){
  const {name,profession} = userInfo.getUserInfo();
  nameInput.value = name;
  jobInput.value = profession;
  popupProfileValidation.clearErrors();
  popupProfile.open();
}

// открывает попап места
function openPlacePopup(){
  popupPlaceValidation.clearErrors();
  popupPlace.open();
}

popupImage.setEventListeners();
popupProfile.setEventListeners();
popupPlace.setEventListeners();

buttonShowPopup.addEventListener("click", openProfilePopup);
buttonAddPlace.addEventListener("click", openPlacePopup);

cardList.renderItems();
