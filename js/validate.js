const error_empty_field = 'Поле не заполнено';
const settings_object = {
  formSelector: '.popup__content',
  inputSelector: '.popup__edit',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__edit_type_error',
  errorClass: 'popup__error_visible'
}
function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.remove(settings_object.errorClass);
  inputElement.classList.remove(settings_object.inputErrorClass);
}

function showInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.add(settings_object.errorClass);
  inputElement.classList.add(settings_object.inputErrorClass);

  if (inputElement.value.length !== 0) {
    errorElement.textContent = inputElement.validationMessage;
  } else {
    errorElement.textContent = error_empty_field;
  }
}


function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function checkInputValidity(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement);
  } else {
    hideInputError(formElement, inputElement);
  }
}

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute("disabled", true);
    buttonElement.classList.add(settings_object.inactiveButtonClass);
  } else {
    buttonElement.removeAttribute("disabled");
    buttonElement.classList.remove(settings_object.inactiveButtonClass);
  }
}

function enableValidation(settings_object) {
  const formElements = Array.from(
    document.querySelectorAll(settings_object.formSelector)
  );
  formElements.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formElement);
  });
}

function setEventListeners(formElement) {
  const inputList = Array.from(
    formElement.querySelectorAll(settings_object.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    settings_object.submitButtonSelector
  );
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
}



enableValidation(settings_object);
