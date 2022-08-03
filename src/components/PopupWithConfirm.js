import PopupWithForm from './PopupWithForm.js';

export default class PopupWithConfirm extends PopupWithForm {
  constructor(popupSelector, formSubmitHandler) {
    super(popupSelector, formSubmitHandler);
    // super.setEventListeners();
  }

  // setEventListeners() {
  //   this._form.addEventListener('submit', (evt) => {
  //     evt.preventDefault();
  //     this._formSubmitHandler();
  //   });
  //   super.setEventListeners();
  // }
}
