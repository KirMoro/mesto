export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = document.querySelector(popupSelector);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      const popup = document.querySelector('.popup_opened');
      popup.classList.remove('popup_opened');
      document.removeEventListener('keydown', this._handleEscClose);
    }
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
  }

  open() {
    this.setEventListeners();
    this._popupSelector.classList.add('popup_opened');
  }

  close() {
    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }
}
