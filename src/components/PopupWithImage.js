import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImageCard = this._popup.querySelector('.popup__image');
    this._popupCapture = this._popup.querySelector('.popup__capture');
  }

  open(link, name) {
    this._popupImageCard.src = link;
    this._popupImageCard.alt = name;
    this._popupCapture.textContent = name;
    super.open();
  }
}
