export default class Card {
  constructor({ name, link }, cardSelector, handleCardClick, handleTrashBtnClick) {
    this._name = name;
    this._link = link;
    this._alt = name;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleTrashBtnClick = handleTrashBtnClick;
  }

  _getElement() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.elements__item')
      .cloneNode(true);

    this._element = cardElement;
  }

  _toggleLike(likeElement) {
    likeElement.classList.toggle('elements_like-button_active');
  }

  _deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    const likeElement = this._element.querySelector('.elements__like-button');
    likeElement.addEventListener('click', () => {
      this._toggleLike(likeElement);
    });

    this._element.querySelector('.elements__trash-button').addEventListener('click', () => {
      // this._deleteCard();
      this._handleTrashBtnClick();
    });

    this._element.querySelector('.elements__image').addEventListener('click', () => {
      this._handleCardClick(this._link, this._name);
    });
  }

  generateCard(Deleteable) {
    this._getElement();
    this._setEventListeners();
    const initialElementImage = this._element.querySelector('.elements__image');

    this._element.querySelector('.elements__title').textContent = this._name;
    initialElementImage.src = this._link;
    initialElementImage.alt = this._name;

    if (Deleteable) {
      return this._element;
    } else {
      this._element.querySelector('.elements__trash-button').remove();
      return this._element;
    }
  }
}
