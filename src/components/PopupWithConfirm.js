import Popup from './Popup.js';

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector, formSubmitHandler) {
    super(popupSelector);
    this._formSubmitHandler = formSubmitHandler;
    this._form = this._popup.querySelector('.form');
    this.setEventListeners();
  }

  open(id, cardElement) {
   super.open(id);
   this._id = id;
   this._element = cardElement
  }

  setEventListeners() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._formSubmitHandler(this._id, this._element);
    });

   super.setEventListeners();
  }
}
