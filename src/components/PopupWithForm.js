import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmitHandler) {
    super(popupSelector);
    this._formSubmitHandler = formSubmitHandler;
    this._form = this._popupSelector.querySelector('.form');
  }

  _getInputValues() {
    this._inputList = this._form.querySelectorAll('.form__field');
    this._formValues = {};

    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  setEventListeners() {
    document.addEventListener('keydown', this._handleEscClose);

    this._popupSelector.addEventListener('mousedown', (evt) => {
      if (evt.target === evt.currentTarget) {
        this.close();
      }
    });

    const closeBtn = this._popupSelector.querySelector('.popup__close-button');
    closeBtn.addEventListener('click', () => {
      this.close();
    });

    this._popupSelector.addEventListener('submit', this._formSubmitHandler);
  }

  close() {
    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
    this._form.reset();
  }
}
