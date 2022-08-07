export default class Card {
  constructor({
    name,
    link,
    _id,
    likes
  }, cardSelector, handleCardClick, handleTrashBtnClick, handleLikeClick) {
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
  //
  _toggleLike(data) {
    console.log(data)
    // if (likeElement.classList.contains('elements_like-button_active')) {
    //
    //       likeCounter.textContent = result.likes.length;
    //
    //     }  else {
    //
    //       likeCounter.textContent = result.likes.length;
    //     }
    // likeCounter.textContent = result.likes.length + 1;
    //
    // likeElement.classList.toggle('elements_like-button_active');

    }



  _setEventListeners() {
    this._likeElement.addEventListener('click', () => {
      // this._toggleLike(this._likeElement);
      this._handleLikeClick(this._id, this._likeElement, this._likeCounter, this._toggleLike);
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

  generateCard(isDelete, isLike) {
    this._getElement();

    const initialElementImage = this._element.querySelector('.elements__image');
    this._likeElement = this._element.querySelector('.elements__like-button');
    this._likeCounter = this._element.querySelector('.elements__like-counter');

    this._setEventListeners();

    this._likeCounter.textContent = this._likes.length;
    this._element.querySelector('.elements__title').textContent = this._name;
    initialElementImage.src = this._link;
    initialElementImage.alt = this._name;

    if (!isDelete) {
      this._element.querySelector('.elements__trash-button')
        .remove();
    }

    if (isLike) {
      this._likeElement.classList.add('elements_like-button_active');
    }

    return this._element;
  }
}
