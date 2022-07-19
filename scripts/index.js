import { Card } from './Card.js';
import { initialCards } from './initial-cards.js';
import { FormValidator } from './FormValidator.js';

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
const popupImageCard = document.querySelector('.popup__image');
const popupCapture = document.querySelector('.popup__capture');
const itemsContainer = document.querySelector('.elements');
const itemTemplate = document.querySelector('#item-template').content;
const formList = Array.from(document.querySelectorAll('.form'));

const config = {
  formSelector: '.form',
  fieldsSelector: '.form__fields',
  inputList: '.form__field',
  buttonElement: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_disabled',
  inputErrorClass: 'form__field_type_error',
  errorClass: 'form__field-error_active',
};

initialCards.forEach((item) => {
  const card = new Card (item, '#item-template', openImagePopup);
  const cardElement = card.generateCard();

  renderCard(cardElement);
});

const validatEditProfileForm = new FormValidator (config, '.form_type_edit');
validatEditProfileForm.enableValidation();

const validateAddCardForm = new FormValidator (config, '.form_type_add');
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

function openImagePopup(link, name) {
  popupImageCard.src = link;
  popupImageCard.alt = name;
  popupCapture.textContent = name;
  openPopup(popupImagePreview);
}

function renderCard(cardItem) {
  itemsContainer.prepend(cardItem);
}

function addCardSubmit(evt) {
  evt.preventDefault();

  const itemElement = {
    name: '',
    link: '',
  };

  itemElement.name = titleInput.value;
  itemElement.link = linkInput.value;

  const card = new Card (itemElement, '#item-template', openImagePopup);
  const cardElement = card.generateCard();

  renderCard(cardElement);

  closePopup(popupAddCard);

  formAddCard.reset();

  popupAddCard.querySelector('.form__submit-button').classList.add('form__submit-button_disabled');
}

profileEditBtn.addEventListener('click', () => {
  validatEditProfileForm.clearInputsError(popupEditProfile);
  fillingInputs();
  openPopup(popupEditProfile);
});

cardAddBtn.addEventListener('click', () => {
  openPopup(popupAddCard);
  validateAddCardForm.clearInputsError(popupAddCard);
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

