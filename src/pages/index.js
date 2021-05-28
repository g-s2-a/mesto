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

//запись профиля
const entryProfile = (userData,evt) => {
  //сохрание данных пользователя
  const button = evt.target.querySelector('.popup__save');
  renderLoading(true,button);
  api.saveUserData(userData)
    .then((result) => userInfo.setUserInfo(result))
    .catch(e => console.log(`Ошибка сохранении userInfo ${e}`))
    .finally(() => {
      renderLoading(false,button);
    })
  popupProfile.close();
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

//данные карточки отправляются на сервер, если успешно, то на отрисовку
const drawingСardForm = (item,evt) =>{
  const button = evt.target.querySelector('.popup__save');
  renderLoading(true,button)
  api.createCard(item)
    .then((result) => drawingСard(result))
    .catch(e => console.log(`Ошибка при создании карточки на сервере: ${e}`))
    .finally(() => {
      renderLoading(false,button);
    })
  popupPlace.close()
};

//функция отрисовки карточки (места)
const drawingСard = (item) =>{
  const newСard = new Card(item,'#template_place',openImagePopup,handleDeleteClick,userInfo.getUserInfo().idUser,saveLike,removeLike);
  const cardElement = newСard.generateCard()
  cardList.addItem(cardElement);
};

//данные "адрес аватарки" отправляются на сервер
const sendAvatarForm = (item,evt) =>{
  const button = evt.target.querySelector('.popup__save');
  renderLoading(true,button)
  api.saveUserAvatar(item)
    .then((result) => {
      console.log(result)
      userInfo.setUserInfo(result)}
      )
    .catch(e => console.log(`Ошибка при отправке аватарки на сервер: ${e}`))
    .finally(() => {
      renderLoading(false,button);
    })
    popupAvatar.close()
};

const popupPlace = new PopupWithForm(popupPlaceSelector, drawingСardForm);
const formPopapPlace = document.querySelector(popupPlaceSelector).querySelector(formSelector);
const popupPlaceValidation = new FormValidator(settingsObject,formPopapPlace);
popupPlaceValidation.enableValidation();

const popupAvatar = new PopupWithForm(popupEditAvatarSelector, sendAvatarForm);
const formPopapAvatar = document.querySelector(popupEditAvatarSelector).querySelector(formSelector);
const popupAvatarValidation = new FormValidator(settingsObject,formPopapAvatar);
popupAvatarValidation.enableValidation();

const cardList = new Section(drawingСard,'.places');
const userInfo = new UserInfo({profileUserSelector,profileInfoSelector,profileFotoSelector});

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

// открывает попап аватара
function openEditAvatarPopup(){
  popupAvatarValidation.clearErrors();
  popupAvatar.open();
}

//удаление карточки места
const entryDelete = (data) => {
  //

  api.deleteCard(data.cardId)
    .then(cardList.deleteItem(data.cardId))
    .catch(e => console.log(`Ошибка при удалении карты ${data.cardId}`))
  popupDelete.close();

}

const saveLike = (cardId) => {
  api.saveLike(cardId)
  .then((result) => {
    const card = document.querySelector(`article[data-id='${result._id}']`)
    card.querySelector('.attraction__number-likes').textContent = result.likes.length
    card.querySelector('.attraction__like').classList.add('attraction__like_b')
  }) //установить лайк
  .catch(e => console.log(`Ошибка при сохранении лайка ${e}`))
}

const removeLike = (cardId) => {
  api.removeLike(cardId)
  .then((result) => {
    const card = document.querySelector(`article[data-id='${result._id}']`)
    card.querySelector('.attraction__number-likes').textContent = result.likes.length
    card.querySelector('.attraction__like').classList.remove('attraction__like_b')
  }) //снять лайк
  .catch(e => console.log(`Ошибка при снятии лайка ${e}`))
}

const popupDelete = new PopupWithForm(popupDeleteSelector,entryDelete);
// открывает попап подтверждения удаления
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
api.getInitialCards()
  .then((result) => cardList.renderItems(result))
  .catch(e => console.log(`Ошибка при получении карточек мест ${e}`))

//получение данных пользователя
api.getUserData()
  .then((result) => userInfo.setUserInfo(result))
  .catch(e => console.log(`Ошибка при получении userInfo ${e}`))



