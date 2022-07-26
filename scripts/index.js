import Card from './Card.js';
import { initialCards } from './initial-cards.js';
import FormValidator from './FormValidator.js';

const popups = document.querySelectorAll('.popup');
const profileEditBtn = document.querySelector('.profile__edit-button');
const cardAddBtn = document.querySelector('.profile__add-button');
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupAddCard = document.querySelector('.popup_type_add');
const popupImagePreview = document.querySelector('.popup_type_image');
const popupCloseBtns = document.querySelectorAll('.popup__close-button');
const formEditProfile = document.querySelector('.form_type_edit');
const formAddCard = document.querySelector('.form_type_add');
const nameInput = document.querySelector('.form__field_type_name');
const jobInput = document.querySelector('.form__field_type_about');
const nameProfile = document.querySelector('.profile__title');
const jobProfile = document.querySelector('.profile__subtitle');
const titleInput = document.querySelector('.form__field_type_title');
const linkInput = document.querySelector('.form__field_type_link');
// const popupImageCard = document.querySelector('.popup__image');
// const popupCapture = document.querySelector('.popup__capture');
// const itemsContainer = document.querySelector('.elements');

const config = {
  fieldsSelector: '.form__fields',
  inputList: '.form__field',
  buttonElement: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_disabled',
  inputErrorClass: 'form__field_type_error',
  errorClass: 'form__field-error_active',
};

function createCard(cardItem, cardSelector, handleClickImage) {
  const card = new Card(cardItem, cardSelector, handleClickImage);
  const cardElement = card.generateCard();
  return cardElement;
}

// function renderCard(cardItem) {
//   itemsContainer.prepend(cardItem);
// }

// initialCards.forEach((item) => {
//   console.log(item)
//   renderCard(createCard(item, '#item-template', openImagePopup));
// });
// console.log(initialCards)

const validatEditProfileForm = new FormValidator(config, '.form_type_edit');
validatEditProfileForm.enableValidation();

const validateAddCardForm = new FormValidator(config, '.form_type_add');
validateAddCardForm.enableValidation();

function closePopupByKey(evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
}

function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByKey);
}

function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByKey);
}

function fillingInputs() {
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
}

function formEditSubmitHandler(evt) {
  evt.preventDefault();

  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;

  closePopup(popupEditProfile);
}


// function openImagePopup(link, name) {
//   popupImageCard.src = link;
//   popupImageCard.alt = name;
//   popupCapture.textContent = name;
//   openPopup(popupImagePreview);
// }

function addCardSubmit(evt) {
  evt.preventDefault();

  const itemElement = {
    name: '',
    link: '',
  };

  itemElement.name = titleInput.value;
  itemElement.link = linkInput.value;

  renderCard(createCard(itemElement, '#item-template', openImagePopup));

  closePopup(popupAddCard);

  formAddCard.reset();
}

profileEditBtn.addEventListener('click', () => {
  validatEditProfileForm.clearInputsError();
  fillingInputs();
  popupEditProfile.querySelector('.form__submit-button').classList.remove('form__submit-button_disabled');
  popupEditProfile.querySelector('.form__submit-button').removeAttribute('disabled');

  openPopup(popupEditProfile);
});

cardAddBtn.addEventListener('click', () => {
  openPopup(popupAddCard);
  validateAddCardForm.clearInputsError();
});

popupCloseBtns.forEach((popupCloseBnt) => {
  popupCloseBnt.addEventListener('click', () => {
    const popupClosest = popupCloseBnt.closest('.popup');
    closePopup(popupClosest);
  });
});

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target === evt.currentTarget) {
      closePopup(popup);
    }
  });
});

formEditProfile.addEventListener('submit', formEditSubmitHandler);

formAddCard.addEventListener('submit', addCardSubmit);


const handleCardClick = (link, name) => {
  const imagePreview = new PopupWithImage('.popup_type_image');
  imagePreview.open(link, name);
}

class Section {
  constructor({ items, renderer }, containerSelector) {
    this._itemsArray = (items);
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(cardElement) {
    this._container.prepend(cardElement);
  }

  renderItems() {
    this._itemsArray.forEach((item) => {
      this._renderer(item);
    });
  }
}

const initialCardItems = new Section({
  items: initialCards, renderer: (item) => {
    const card = new Card(item, '#item-template', handleCardClick);
    const cardElement = card.generateCard();
    initialCardItems.addItem(cardElement);
  }
}, '.elements');

initialCardItems.renderItems()

class Popup {
  constructor(popupSelector) {
    this._popupSelector = document.querySelector(popupSelector);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      // const popup = document.querySelector('.popup_opened');
      this.close();
    }
  }

  setEventListeners() {
    document.addEventListener('keydown', this._handleEscClose);

    this._popupSelector.addEventListener('mousedown', (evt) => {
      if (evt.target === evt.currentTarget) {
        this.close();
      }
    });

    const closeBnt = this._popupSelector.querySelector('.popup__close-button')
    closeBnt.addEventListener('click', () => {
      // const popupClosest = popupCloseBnt.closest('.popup');
      this.close();
    });
  }

  open() {
    this.setEventListeners();
    this._popupSelector.classList.add('popup_opened');
  }

  close() {
    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }
}

class PopupWithImage extends Popup {

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

class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmitHandler) {
    super(popupSelector);
    this._formSubmitHandler = formSubmitHandler;
  }

  _getInputValues() {

  }

  setEventListeners() {

  }

  close() {

  }
}

class UserInfo {
  constructor({ profileNameSelector, profileAboutSelector }) {

  }

  getUserInfo() {

  }

  setUserInfo() {

  }
}
