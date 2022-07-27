import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { initialCards } from '../utils/initial-cards.js';

const profileEditBtn = document.querySelector('.profile__edit-button');
const cardAddBtn = document.querySelector('.profile__add-button');
const popupEditProfile = document.querySelector('.popup_type_edit');
const nameInput = document.querySelector('.form__field_type_name');
const jobInput = document.querySelector('.form__field_type_about');
const titleInput = document.querySelector('.form__field_type_title');
const linkInput = document.querySelector('.form__field_type_link');

const profileInfo = {
  profileNameSelector: '.profile__title',
  profileAboutSelector: '.profile__subtitle',
};

const config = {
  fieldsSelector: '.form__fields',
  inputList: '.form__field',
  buttonElement: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_disabled',
  inputErrorClass: 'form__field_type_error',
  errorClass: 'form__field-error_active',
};

// Включение валидации
const validatEditProfileForm = new FormValidator(config, '.form_type_edit');
validatEditProfileForm.enableValidation();

const validateAddCardForm = new FormValidator(config, '.form_type_add');
validateAddCardForm.enableValidation();

// Создание экземпляра класса UserInfo
const newUser = new UserInfo(profileInfo);

// попап с превью
const handleCardClick = (link, name) => {
  const imagePreview = new PopupWithImage('.popup_type_image');
  imagePreview.open(link, name);
};

// попап редактирования профиля
profileEditBtn.addEventListener('click', () => {
  formEditProfilePopup.open();

  validatEditProfileForm.clearInputsError();

  fillingInputs();

  popupEditProfile.querySelector('.form__submit-button').classList.remove('form__submit-button_disabled');
  popupEditProfile.querySelector('.form__submit-button').removeAttribute('disabled');
});

function fillingInputs() {
  const userInfo = newUser.getUserInfo();

  nameInput.value = userInfo.name;
  jobInput.value = userInfo.job;
}

const formEditSubmitHandler = (evt) => {
  evt.preventDefault();

  const newUserProfile = {
    name: nameInput.value,
    job: jobInput.value,
  };

  newUser.setUserInfo(newUserProfile);

  formEditProfilePopup.close();
};

// попап добавления новой картчоки
cardAddBtn.addEventListener('click', () => {
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
    items: itemElement, renderer: (item) => {
      const card = new Card(item, '#item-template', handleCardClick);
      const cardElement = card.generateCard();

      initialCardItems.addItem(cardElement);
    },
  }, '.elements');

  initialItemElement.renderItems();

  formAddCardPopup.close();
};

const formEditProfilePopup = new PopupWithForm('.popup_type_edit', formEditSubmitHandler);
const formAddCardPopup = new PopupWithForm('.popup_type_add', addCardSubmit);

// Инициализация карточек при загрузке
const initialCardItems = new Section({
  items: initialCards, renderer: (item) => {
    const card = new Card(item, '#item-template', handleCardClick);
    const cardElement = card.generateCard();
    initialCardItems.addItem(cardElement);
  },
}, '.elements');

initialCardItems.renderItems();
