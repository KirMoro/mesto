import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { initialCards } from '../utils/initial-cards.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';
import Api from '../components/Api.js';

const profileEditBtn = document.querySelector('.profile__edit-button');
const cardAddBtn = document.querySelector('.profile__add-button');
const avatarEditBtn = document.querySelector('.profile__edit-avatar-button');
const nameInput = document.querySelector('.form__field_type_name');
const jobInput = document.querySelector('.form__field_type_about');

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

const validateSetAvatarForm = new FormValidator(config, '.form_type_add-avatar');
validateSetAvatarForm.enableValidation();

// Создание экземпляра класса UserInfo
const newUser = new UserInfo(profileInfo);

// попап редактирования профиля
profileEditBtn.addEventListener('click', () => {
  formEditProfilePopup.open();

  validatEditProfileForm.clearInputsError();
  validatEditProfileForm.enableSubmitBtn();

  fillingInputs();
});

function fillingInputs() {
  const userInfo = newUser.getUserInfo();

  nameInput.value = userInfo.name;
  jobInput.value = userInfo.job;
}

const handleFormEditSubmit = (inputValues) => {

  newUser.setUserInfo(inputValues);

  formEditProfilePopup.close();
};

// попап добавления новой картчоки
cardAddBtn.addEventListener('click', () => {
  formAddCardPopup.open();
  validateAddCardForm.clearInputsError();
});

const addCardSubmit = (inputValues) => {
  initialSection.addItem(createCard(inputValues, '#item-template', handleCardClick));
  formAddCardPopup.close();
};

// попап превью картинки
const handleCardClick = (link, name) => {
  imagePreview.open(link, name);
};

// попап добавления аватара
avatarEditBtn.addEventListener('click', () => {
  formAddAvatarPopup.open();
  validateSetAvatarForm.clearInputsError();
});

const setAvatarSubmit = () => {
  console.log('hello')
};

//попап подтверждения удаления карточки
const handleTrashBtnClick = () => {
  confirmPopup.open();
};

// Создание экземпляров классов попапов
const formEditProfilePopup = new PopupWithForm('.popup_type_edit', handleFormEditSubmit);

const formAddCardPopup = new PopupWithForm('.popup_type_add', addCardSubmit);

const formAddAvatarPopup = new PopupWithForm('.popup_type_add-avatar', setAvatarSubmit);

// const confirmPopup = new PopupWithConfirm('.popup_type_confirm', setAvatarSubmit)

const imagePreview = new PopupWithImage('.popup_type_image');

// Создание карточки
const createCard = (
  cardItem,
  cardSelector,
  handleClickImage,
  handleTrashBtnClick,
  isDelete
) => {
    const card = new Card(
      cardItem,
      cardSelector,
      handleClickImage,
      handleTrashBtnClick,
      );
    const cardElement = card.generateCard(isDelete);

  return cardElement;
};

// Создание новой секции
const initialSection = new Section({
  items: initialCards, renderer: (item) => {
    initialSection.addItem(createCard(item, '#item-template', handleCardClick, handleTrashBtnClick, false));
  },
}, '.elements');

// Загрузка карточек
initialSection.renderItems();



  const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-48',
    headers: {
      authorization: '6dcd6a5f-9295-4e62-a1cd-62fe426f6415',
      'Content-Type': 'application/json'
    }
  });

// api.getProfileInfo('users/me')
// api.getInfo();

// api.getInitialCards()
//   .then((result) => {
//     // обрабатываем результат
//   })
//   .catch((err) => {
//     console.log(err); // выведем ошибку в консоль
//   });


// Запрос информации о профиле
// fetch('https://mesto.nomoreparties.co/v1/cohort-48/users/me', {
//   headers: {
//     authorization: '6dcd6a5f-9295-4e62-a1cd-62fe426f6415'
//   }
// })
//   .then(res => res.json())
//   .then((result) => {
//     console.log(result);
//   });

// Запрос информации о карточках
// fetch('https://mesto.nomoreparties.co/v1/cohort-48/cards', {
//   headers: {
//     authorization: '6dcd6a5f-9295-4e62-a1cd-62fe426f6415'
//   }
// })
//   .then(res => res.json())
//   .then((result) => {
//     console.log(result);
//   });
