export default class Card {
  constructor({ name, link }, cardSelector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._alt = name;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
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
  }

  _setEventListeners() {
    const likeElement = this._element.querySelector('.elements__like-button');
    likeElement.addEventListener('click', () => {
      this._toggleLike(likeElement);
    });

    this._element.querySelector('.elements__trash-button').addEventListener('click', () => {
      this._deleteCard();
    });

    this._element.querySelector('.elements__image').addEventListener('click', () => {
      this._handleCardClick(this._link, this._name);
    });
  }

  generateCard() {
    this._getElement();
    this._setEventListeners();
    const initialElementImage = this._element.querySelector('.elements__image');

    this._element.querySelector('.elements__title').textContent = this._name;
    initialElementImage.src = this._link;
    initialElementImage.alt = this._name;

    return this._element;
  }
}
