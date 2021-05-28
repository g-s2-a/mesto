export default class FormValidator{
  constructor(settingsObject, form){
    this._settingsObject = settingsObject;
    this._formElement = form;
    this._errorEmptyField = 'Поле не заполнено';
    //кнопка "Записать"
    this._buttonElement = this._formElement.querySelector(this._settingsObject.submitButtonSelector);
    //массив всех полей ввода
    this._inputList = Array.from(this._formElement.querySelectorAll(this._settingsObject.inputSelector));
  }

  //проверяют валидность поля
  //есть ли не валидные элементы в списке
  _hasInvalidInput() {
    return this._inputList.some((inputEl) => {
      return !inputEl.validity.valid; // если найден хотябы один невалидный элемент метод вернет true
    });
  }

  //изменяют состояние кнопки сабмита
  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) { // если в списке есть невалидные элементы
      this._buttonElement.setAttribute("disabled", true); // выключаю кнопку
      this._buttonElement.classList.add(this._settingsObject.inactiveButtonClass); // изменяю вид кнопки
    } else {                                // все элементы списка валидные
      this._buttonElement.removeAttribute("disabled"); // убираю выключение
      this._buttonElement.classList.remove(this._settingsObject.inactiveButtonClass); // изменяю вид кнопки
    }
  }

  //скрыть ошибку
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.classList.remove(this._settingsObject.errorClass);
    inputElement.classList.remove(this._settingsObject.inputErrorClass);
  }

  //показать ошибку
  _showInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.classList.add(this._settingsObject.errorClass);
    inputElement.classList.add(this._settingsObject.inputErrorClass);

    if (inputElement.value.length !== 0) {
      errorElement.textContent = inputElement.validationMessage;
    } else {
      errorElement.textContent = this._errorEmptyField;
    }
  }

  // проверка правельности вввода
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement); //показать ошибку
    } else {
      this._hideInputError(inputElement); //скрыть ошибку
    }
  }

  //установка обработчиков - при изменении инпута, будет проверка валидации на нем и включение/выключение кнопки
  installingEventHandlers(){
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(this._inputList, this._buttonElement);
      });
    });
  }

  _clearErrors(){
    this._inputList.forEach((inputElement)=>{
      this._hideInputError(inputElement);
    });
  }

  //выполняет валидацию формы при открытии
  enableValidation(){
    //обхожу инпуты проверяю текущую валидность
    this._inputList.forEach((inputElement) => {
      if (inputElement.value.trim()){ //если инпут заполнен проверяю
        this._checkInputValidity(inputElement);
      }
    });
    if (this._inputList.length > 0){
      this._toggleButtonState(); //включение/выключение кнопки
    }
    this._clearErrors() // включение ошибок (при открытии формы скрываем все ошибки)
  }



}


