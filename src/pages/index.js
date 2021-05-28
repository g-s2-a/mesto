import './index.css';
import Section from '../js/components/Section.js';
import Card from '../js/components/Card.js';
import UserInfo from '../js/components/userInfo.js';
import {Api} from '../js/components/API.js';

import {
  popupProfileSelector,
  popupPlaceSelector,
  popupFotoSelector,
  popupDeleteSelector,
  formSelector,
  buttonShowPopup,
  buttonAddPlace,
  buttonEditAvatarPopup,
  settingsObject,
  profileFotoSelector,
  profileUserSelector,
  profileInfoSelector,
  popupEditAvatarSelector,
  nameInput,
  jobInput,
  idCardInput} from '../js/utils/constants.js';

import FormValidator from '../js/components/FormValidator.js';
import PopupWithImage from '../js/components/PopupWithImage.js';
import PopupWithForm from '../js/components/PopupWithForm.js';

function renderLoading(isLoading, button) {
  if (isLoading) {
    button.textContent = "Сохранение...";
  } else {
    button.textContent = "Сохранить";
  }
}

function renderLoadingDel(isLoading, button) {
  if (isLoading) {
    button.textContent = "Удаление...";
  } else {
    button.textContent = "Ок";
  }
}

//запись профиля
const entryProfile = (userData,evt) => {
  //сохрание данных пользователя
  const button = evt.target.querySelector('.popup__save');
  renderLoading(true,button);
  api.saveUserData(userData)
    .then((result) => {userInfo.setUserInfo(result); popupProfile.close()})
    .catch(e => console.log(`Ошибка сохранении userInfo ${e}`))
    .finally(() => {
      renderLoading(false,button);
    })
}

const popupProfile = new PopupWithForm(popupProfileSelector,entryProfile);
const formPopapProfile = document.querySelector(popupProfileSelector).querySelector(formSelector);
const popupProfileValidation = new FormValidator(settingsObject,formPopapProfile);
popupProfileValidation.installingEventHandlers();

const popupImage = new PopupWithImage(popupFotoSelector);
// открывает попап изображения
function openImagePopup(text,image){
  popupImage.open(text,image);
}

//данные карточки отправляются на сервер, если успешно, то на отрисовку
const drawingСardForm = (item,evt) =>{
  const button = evt.target.querySelector('.popup__save');
  renderLoading(true,button)
  api.createCard(item)
    .then((result) => {drawingСard(result); popupPlace.close()})
    .catch(e => console.log(`Ошибка при создании карточки на сервере: ${e}`))
    .finally(() => {
      renderLoading(false,button);
    })
};

const createCard = (item) =>{
  const newСard = new Card(item,'#template_place',openImagePopup,handleDeleteClick,userInfo.getUserInfo().idUser,saveLike,removeLike)
  return newСard.generateCard();
};

//функция отрисовки карточки (места)
const drawingСard = (item) =>{
  const cardElement = createCard(item)
  cardList.addItem(cardElement);
};

//данные "адрес аватарки" отправляются на сервер
const sendAvatarForm = (item,evt) =>{
  const button = evt.target.querySelector('.popup__save');
  renderLoading(true,button)
  api.saveUserAvatar(item)
    .then((result) => {userInfo.setUserInfo(result); popupAvatar.close()})
    .catch(e => console.log(`Ошибка при отправке аватарки на сервер: ${e}`))
    .finally(() => {
      renderLoading(false,button);
    })
};

const popupPlace = new PopupWithForm(popupPlaceSelector, drawingСardForm);
const formPopapPlace = document.querySelector(popupPlaceSelector).querySelector(formSelector);
const popupPlaceValidation = new FormValidator(settingsObject,formPopapPlace);
popupPlaceValidation.installingEventHandlers();

const popupAvatar = new PopupWithForm(popupEditAvatarSelector, sendAvatarForm);
const formPopapAvatar = document.querySelector(popupEditAvatarSelector).querySelector(formSelector);
const popupAvatarValidation = new FormValidator(settingsObject,formPopapAvatar);
popupAvatarValidation.installingEventHandlers();

const cardList = new Section(drawingСard,'.places');
const userInfo = new UserInfo({profileUserSelector,profileInfoSelector,profileFotoSelector});

// открывает попап профиля
function openProfilePopup(){
  const {name,profession} = userInfo.getUserInfo();
  nameInput.value = name;
  jobInput.value = profession;

  popupProfileValidation.enableValidation();
  popupProfile.open();
}

// открывает попап места
function openPlacePopup(){
  popupPlaceValidation.enableValidation();
  popupPlace.open();
}

// открывает попап аватара
function openEditAvatarPopup(){
  popupAvatarValidation.enableValidation();
  popupAvatar.open();
}

//удаление карточки места
const entryDelete = (data,evt) => {
  const button = evt.target.querySelector('.popup__save');
  renderLoadingDel(true,button);
  api.deleteCard(data.cardId)
    .then(() => {cardList.deleteItem(data.cardId); popupDelete.close()})
    .catch(e => console.log(`Ошибка при удалении карты ${data.cardId}`))
    .finally(() => {
      renderLoadingDel(false,button);
    })
}

const saveLike = (cardId, cardElement) => {//установить лайк
  api.saveLike(cardId)
  .then((result) => cardElement.updateLikes(result.likes))
  .catch(e => console.log(`Ошибка при сохранении лайка ${e}`))
}

const removeLike = (cardId, cardElement) => {//снять лайк
  api.removeLike(cardId)
  .then((result) => cardElement.updateLikes(result.likes))
  .catch(e => console.log(`Ошибка при снятии лайка ${e}`))
}

const popupDelete = new PopupWithForm(popupDeleteSelector,entryDelete);
// открывает попап подтверждения на удаление
function handleDeleteClick(id){
  idCardInput.value = id;
  popupDelete.open();
}

popupImage.setEventListeners();
popupProfile.setEventListeners();
popupPlace.setEventListeners();
popupDelete.setEventListeners();
popupAvatar.setEventListeners();

buttonEditAvatarPopup.addEventListener("click", openEditAvatarPopup);
buttonShowPopup.addEventListener("click", openProfilePopup);
buttonAddPlace.addEventListener("click", openPlacePopup);

//------------------------------------------------------------

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-24/',
  token: '0414880f-08ee-45c2-a10b-c92889f01bda'
});

//полчение карточек с сервера
const getCards = api.getInitialCards()
getCards.catch(e => console.log(`Ошибка при получении карточек мест ${e}`))

//получение данных пользователя
const getUser = api.getUserData()
getUser.catch(e => console.log(`Ошибка при получении userInfo ${e}`))

Promise.all([getUser,getCards]).then(value => {
  userInfo.setUserInfo(value[0]);
  cardList.renderItems(value[1]);
}, reason => {
  console.log(reason)
});
