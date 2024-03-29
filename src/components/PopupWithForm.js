import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmitHandler) {
    super(popupSelector);
    this._formSubmitHandler = formSubmitHandler;
    this._form = this._popup.querySelector('.form');
    this._inputList = this._form.querySelectorAll('.form__field');
    this.setEventListeners();
  }

  _getInputValues() {
    this._formValues = {};

    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._formSubmitHandler(this._getInputValues());
    });
    super.setEventListeners();
  }

  setSavingMode() {
    this._form.querySelector('.form__submit-button').textContent = 'Сохранение...';
  }

  removeSavingMode() {
    this._form.querySelector('.form__submit-button').textContent = 'Сохранить';
  }

  close() {
    super.close();
    this._form.reset();
  }
}
