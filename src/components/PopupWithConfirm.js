import PopupWithForm from './PopupWithForm.js';

export default class PopupWithConfirm extends PopupWithForm {
  constructor(popupSelector, formSubmitHandler) {
    super(popupSelector, formSubmitHandler);
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

    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target === evt.currentTarget) {
        this.close();
      }
    });

    const closeBtn = this._popup.querySelector('.popup__close-button');
    closeBtn.addEventListener('click', () => {
      this.close();
    });
  }
}
