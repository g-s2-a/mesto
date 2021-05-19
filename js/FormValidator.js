export class FormValidator{
  constructor(settingsObject, form){
    this._settingsObject = settingsObject;
    this._formElement = form;
    this._error_empty_field = 'Поле не заполнено';
  }

  //проверяют валидность поля
  //есть ли не валидные элементы в списке
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid; // если найден хотябы один невалидный элемент метод вернет true
    });
  }

  //изменяют состояние кнопки сабмита
  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) { // если в списке есть невалидные элементы
      buttonElement.setAttribute("disabled", true); // выключаю кнопку
      buttonElement.classList.add(this._settingsObject.inactiveButtonClass); // изменяю вид кнопки
    } else {                                // все элементы списка валидные
      buttonElement.removeAttribute("disabled"); // убираю выключение
      buttonElement.classList.remove(this._settingsObject.inactiveButtonClass); // изменяю вид кнопки
    }
  }

  //устанавливаю все обработчики
  _handlers(){
    this._formElement.addEventListener("submit", (evt) => { //отменяю событие по умолчанию
      evt.preventDefault();
    });
  }


  //скрыть ошибку
  _hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.classList.remove(this._settingsObject.errorClass);
    inputElement.classList.remove(this._settingsObject.inputErrorClass);
  }

  //показать ошибку
  _showInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.classList.add(this._settingsObject.errorClass);
    inputElement.classList.add(this._settingsObject.inputErrorClass);

    if (inputElement.value.length !== 0) {
      errorElement.textContent = inputElement.validationMessage;
    } else {
      errorElement.textContent = this._error_empty_field;
    }
  }

  _checkInputValidity(formElement, inputElement) { // проверка правельности вввода
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement); //показать ошибку
    } else {
      this._hideInputError(formElement, inputElement); //скрыть ошибку
    }
  }

  //включает валидацию формы
  enableValidation(){
    //массив всех полей ввода
    const inputList = Array.from(this._formElement.querySelectorAll(this._settingsObject.inputSelector));
    //кнопка "Записать"
    const buttonElement = this._formElement.querySelector(this._settingsObject.submitButtonSelector);

    inputList.forEach((inputElement) => { //обхожу инпуты проверяю текущую валидность и вешаю обработчики на изменение
      // проверяю инпут
      if (inputElement.value.trim()){
        this._checkInputValidity(this._formElement, inputElement);
      }

      inputElement.addEventListener("input", () => { //обработчик -  при изменении инпута, будет проверка влидации на нем и включение/выключение кнопки
        this._checkInputValidity(this._formElement, inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });

    });

    if (inputList.length > 0){
      this._toggleButtonState(inputList, buttonElement); //включение/выключение кнопки
    }


    this._handlers();
  }

}


