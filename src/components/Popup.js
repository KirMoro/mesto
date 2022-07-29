export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
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

  open() {
    document.addEventListener('keydown', this._handleEscClose);
    this._popup.classList.add('popup_opened');
  }

  close() {

    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }
}
