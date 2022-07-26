import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {

  open(link, name) {
    super.setEventListeners();
    const popupImageCard = this._popupSelector.querySelector('.popup__image');
    const popupCapture = this._popupSelector.querySelector('.popup__capture');
    popupImageCard.src = link;
    popupImageCard.alt = name;
    popupCapture.textContent = name;
    this._popupSelector.classList.add('popup_opened');
  }
}
