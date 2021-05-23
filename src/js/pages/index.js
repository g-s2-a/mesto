import '../../pages/index.css';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import UserInfo from '../components/userInfo.js';

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
  jobInput} from '../utils/constants.js';

import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';


//функция отрисовки карточки (места)
const drawingСard = (item)=>{
  const newСard = new Card(item.name, item.link,'#template_place',openImagePopup);
  const cardElement = newСard.generateCard();
  CardList.addItem(cardElement);};

const CardList = new Section({items: initialCards, renderer: drawingСard},'.places');
const userInfo = new UserInfo({profileUserSelector,profileInfoSelector});

//const userInfo1 = new userInfo({name:'.profile__title', profession:'.profile__kind-of-activity'});

//валидация форм
function validation(popupSelector,formSelector){
  const formPopap = document.querySelector(popupSelector).querySelector(formSelector);
  const enableValidation = new FormValidator(settingsObject,formPopap);
  enableValidation.enableValidation();
}

const entryProfile = ({popupName,popupProfession}) => {
  userInfo.setUserInfo(popupName, popupProfession);
}

// открывает попап профиля
function openProfilePopup(){


  const {name,profession} = userInfo.getUserInfo();
  nameInput.value = name;
  jobInput.value = profession;

  const pp = new PopupWithForm(popupProfileSelector,entryProfile);
  pp.open();
  pp.setEventListeners();

  //валидация после открытия попапа
  validation(popupProfileSelector,formSelector);
}

// открывает попап места
function popupPlace(){
  const pp = new PopupWithForm(popupPlaceSelector, drawingСard);
  pp.open();
  pp.setEventListeners();

  //валидация после открытия попапа
  validation(popupPlaceSelector,formSelector);
}

// открывает попап изображения
function openImagePopup(text,image){
  const pp = new PopupWithImage(popupFotoSelector);
  pp.open(text,image);
  pp.setEventListeners();
}

buttonShowPopup.addEventListener("click", openProfilePopup);
buttonAddPlace.addEventListener("click", popupPlace);

CardList.renderItems();
