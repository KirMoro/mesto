import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import Popup from './Popup.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';

import { initialCards } from './initial-cards.js';

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

const validatEditProfileForm = new FormValidator(config, '.form_type_edit');
validatEditProfileForm.enableValidation();

const validateAddCardForm = new FormValidator(config, '.form_type_add');
validateAddCardForm.enableValidation();

// Иницилизация попапа с превью
const handleCardClick = (link, name) => {
  const imagePreview = new PopupWithImage('.popup_type_image');
  imagePreview.open(link, name);
}

// Инициализация карточек при загрузке
const initialCardItems = new Section({
  items: initialCards, renderer: (item) => {
    const card = new Card(item, '#item-template', handleCardClick);
    const cardElement = card.generateCard();
    initialCardItems.addItem(cardElement);
  }
}, '.elements');

initialCardItems.renderItems()

// Инициализация попапа редактирования профиля
profileEditBtn.addEventListener('click', () => {
  const formEditProfilePopup = new PopupWithForm('.popup_type_edit', formEditSubmitHandler);
  formEditProfilePopup.open();

  validatEditProfileForm.clearInputsError();

  fillingInputs();

  popupEditProfile.querySelector('.form__submit-button').classList.remove('form__submit-button_disabled');
  popupEditProfile.querySelector('.form__submit-button').removeAttribute('disabled');
});

function fillingInputs() {
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
}

const formEditSubmitHandler = (evt) => {
  evt.preventDefault();

  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;

  popupEditProfile.classList.remove('popup_opened');
}

// Инициализация попапа добавления новой картчоки
cardAddBtn.addEventListener('click', () => {
  const formAddCardPopup = new PopupWithForm('.popup_type_add', addCardSubmit);
  formAddCardPopup.open();
  validateAddCardForm.clearInputsError();
});

const addCardSubmit = (evt) => {
  evt.preventDefault();

  const itemElement = [{
    name: '',
    link: '',
  }];

  const [itemCard] = itemElement;

  itemCard.name = titleInput.value;
  itemCard.link = linkInput.value;

  const initialItemElement = new Section({
    items: itemElement, renderer: (itemCard) => {
      const card = new Card(itemCard, '#item-template', handleCardClick);
      const cardElement = card.generateCard();
      initialCardItems.addItem(cardElement);
    }
  }, '.elements');

  initialItemElement.renderItems()

  popupAddCard.classList.remove('popup_opened');
  formAddCard.reset();
}

class UserInfo {
  constructor({ profileNameSelector, profileAboutSelector }) {

  }

  getUserInfo() {

  }

  setUserInfo() {

  }
}
