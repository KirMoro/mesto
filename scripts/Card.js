export class Card {
  constructor(data, cardSelector, handleClickImage) {
    this._name = data.name;
    this._link = data.link;
    this._alt = data.name;
    this._cardSelector = cardSelector;
    this._handleClickImage = handleClickImage;
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

  _deleteCard(cardElement) {
    cardElement.remove();
  }

  _setEventListeners() {
    const likeElement = this._element.querySelector('.elements__like-button');
    likeElement.addEventListener('click', () => {
      this._toggleLike(likeElement);
  });

    this._element.querySelector('.elements__trash-button').addEventListener('click', () => {
      this._deleteCard(this._element);
  });

    this._element.querySelector('.elements__image').addEventListener('click', () => {
      this._handleClickImage(this._link, this._name);
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
