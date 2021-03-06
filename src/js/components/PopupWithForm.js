import Popup from './Popup.js';

export default class PopupWithForm extends Popup { // инструмент работы с попапами содержащими форму

  constructor(popupSelector,submitHandler){
    super(popupSelector);                // popupSelector - селектор попапа содержащего форму
    this._submitHandler = submitHandler; // ссылка на функцию обработки нажатия кнопки на форме

    this.form = this.popup.querySelector('form');
    this.inputs = [...this.form.querySelectorAll("input")];

  }

  //собирает данные всех полей формы
  _getInputValues(){
    const values = {};
    this.inputs.forEach(input => {
      values[input.name] = input.value;
    })
    return values;
  }

  // установка слушателей событий
  setEventListeners(){
    super.setEventListeners();

    this.submit = (evt) => {
      evt.preventDefault();
      this._submitHandler(this._getInputValues(),evt);
    }
    this.form.addEventListener('submit',this.submit);
  }

  // сбрасывает и закрывает форму
  close() {
    this.form.reset();
    super.close();
  }

}
