export default class Card {
  constructor(data, cardSelector, handler) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._likes = data.likes;
    this._userId = data.currentUser;
    this._ownerCardId = data.owner._id;
    this._cardSelector = cardSelector;
    this._handleCardClick = handler.onClick;
    this._handleTrashBtnClick = handler.onDelete;
    this._handleLikeClick = handler.onlike;
    this._getElement();
    this._trashBtn = this._element.querySelector('.elements__trash-button');
    this._likeElement = this._element.querySelector('.elements__like-button');
    this._likeCounter = this._element.querySelector('.elements__like-counter');
  }

  _getElement() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.elements__item')
      .cloneNode(true);

    this._element = cardElement;
  }

  _isDelete() {
    const isDelete = this._ownerCardId === this._userId;
    if (!isDelete) {
      this._trashBtn.remove();
    }
  }

  _isLiked() {
   const isLike = this._likes.some((like) => like._id === this._userId);
    if (isLike) {
      this._likeElement.classList.add('elements_like-button_active');
    }
  }

  _toggleLike(likesArr) {
    if (!likesArr.likes.some((like) => like._id === this._userId)) {
      this._likeCounter.textContent = Math.max(0, likesArr.likes.length - 1);
    } else {
      this._likeCounter.textContent = likesArr.likes.length;
    }
    this._likeElement.classList.toggle('elements_like-button_active');
  }

  _setEventListeners() {
    this._likeElement.addEventListener('click', () => {
      this._handleLikeClick(this._id, this._likeElement, this._likeCounter, this._toggleLike.bind(this));
    });

    this._element.querySelector('.elements__trash-button')
      .addEventListener('click', () => {
        this._handleTrashBtnClick(this._id, this._element);
      });

    this._element.querySelector('.elements__image')
      .addEventListener('click', () => {
        this._handleCardClick(this._link, this._name);
      });
  }

  generateCard() {
    const initialElementImage = this._element.querySelector('.elements__image');

    this._setEventListeners();

    this._likeCounter.textContent = this._likes.length;
    this._element.querySelector('.elements__title').textContent = this._name;
    initialElementImage.src = this._link;
    initialElementImage.alt = this._name;

    this._isDelete();
    this._isLiked();

    return this._element;
  }
}
