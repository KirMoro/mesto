export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
      document.removeEventListener('keydown', this._handleEscClose);
    }
  }

  setEventListeners() {
    document.addEventListener('keydown', this._handleEscClose.bind(this));

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
    this._popup.classList.add('popup_opened');
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }
}
