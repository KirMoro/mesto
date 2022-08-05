export default class Card {
  constructor({ name, link, _id, likes }, cardSelector, handleCardClick, handleTrashBtnClick, handleLikeClick) {
    this._name = name;
    this._link = link;
    this._alt = name;
    this._id = _id;
    this._likes = likes;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleTrashBtnClick = handleTrashBtnClick;
    this._handleLikeClick = handleLikeClick;
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

  _setEventListeners() {
    const likeElement = this._element.querySelector('.elements__like-button');
    likeElement.addEventListener('click', () => {
      this._toggleLike(likeElement);
      this._handleLikeClick(this._id, likeElement, this._likeCounter);
    });

    this._element.querySelector('.elements__trash-button').addEventListener('click', () => {
      this._handleTrashBtnClick(this._id, this._element);
    });

    this._element.querySelector('.elements__image').addEventListener('click', () => {
      this._handleCardClick(this._link, this._name);
    });
  }

  generateCard(Deleteable) {
    this._getElement();
    this._setEventListeners();
    const initialElementImage = this._element.querySelector('.elements__image');
    this._likeCounter = this._element.querySelector('.elements__like-counter');
    this._likeCounter.textContent = this._likes.length;
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
