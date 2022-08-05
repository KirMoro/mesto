import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';
import Api from '../components/Api.js';
import {
  profileEditBtn,
  cardAddBtn,
  avatarEditBtn,
  nameInput,
  jobInput,
  profileInfo,
  config
} from '../utils/constants.js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-48',
  headers: {
    authorization: '6dcd6a5f-9295-4e62-a1cd-62fe426f6415',
    'Content-Type': 'application/json'
  }
});

const runApp = ({
  profile,
  cards
}, api) => {
  // Функция создания карточки
  const createCard = (cardItem, cardSelector, handleClickImage, handleTrashBtnClick, handleLikeClick, isDelete) => {
    const card = new Card(cardItem, cardSelector, handleClickImage, handleTrashBtnClick, handleLikeClick,);
    const cardElement = card.generateCard(isDelete);

    return cardElement;
  };

// попап редактирования профиля
  profileEditBtn.addEventListener('click', () => {
    formEditProfilePopup.open();

    validatEditProfileForm.clearInputsError();
    validatEditProfileForm.enableSubmitBtn();

    fillingInputs();
  });

  const fillingInputs = () => {
    const userInfo = newUser.getUserInfo();

    nameInput.value = userInfo.name;
    jobInput.value = userInfo.about;
  };

  const handleFormEditSubmit = (inputValues) => {
    formEditProfilePopup.setSavingMode();
    api.setProfileInfo(inputValues)
      .then((result) => {
        newUser.setUserInfo(result);
        formEditProfilePopup.close();
        formEditProfilePopup.removeSavingMode();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  cardAddBtn.addEventListener('click', () => {
    formAddCardPopup.open();
    validateAddCardForm.clearInputsError();
  });

  const addCardSubmit = (inputValues) => {
    api.setNewCard(inputValues)
      .then((result) => {
        initialSection.addItem(createCard(result, '#item-template', handleCardClick, handleTrashBtnClick, handleLikeClick, true));
        formAddCardPopup.close();
      })
      .catch((err) => {
        console.log(err);
      });
  };

// попап превью картинки
  const handleCardClick = (link, name) => {
    imagePreview.open(link, name);
  };

  const imagePreview = new PopupWithImage('.popup_type_image');

// попап добавления аватара
  avatarEditBtn.addEventListener('click', () => {
    formAddAvatarPopup.open();
    validateSetAvatarForm.clearInputsError();
  });

  const setAvatarSubmit = (inputValues) => {
    formAddAvatarPopup.setSavingMode();
    api.setProfileAvatar(inputValues)
      .then((result) => {
        newUser.setUserAvatar(result);
        formAddAvatarPopup.close();
        formAddAvatarPopup.removeSavingMode();
      })
      .catch((err) => {
        console.log(err);
      });
  };

// попап подтверждения удаления карточки
  const handleTrashBtnClick = (id, cardElement) => {
    confirmPopup.open(id, cardElement);
  };

  const deleteUserCard = (id, cardElement) => {
    api.deleteCard(id)
      .then(() => {
        const initialSection = new Section({}, '.elements');
        initialSection.deleteItem(cardElement);
        confirmPopup.close();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Обработка лайков
  const handleLikeClick = (id, likeElement, likeCounter) => {
    if (!likeElement.classList.contains('elements_like-button_active')) {
      api.removeLike(id)
        .then((result) => {
          likeCounter.textContent = result.likes.length;
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      api.addLike(id)
        .then((result) => {
          likeCounter.textContent = result.likes.length;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // Запрос информации о профиле
  api.getProfileInfo()
    .then((res) => {
      newUser.setUserInfo(res);
      newUser.setUserAvatar(res);
      api.getInitialCards();
    })
    .catch((err) => {
      console.log(err);
    });

  // Загрузка карточек на страницу
  const initialSection = new Section({
    items: cards,
    renderer: (item) => {
      const idCompare = profile._id === item.owner._id;
      initialSection.addItem(createCard(item, '#item-template', handleCardClick, handleTrashBtnClick, handleLikeClick, idCompare));
    },
  }, '.elements');

  initialSection.renderItems();

// Создание экземпляра класса UserInfo
  const newUser = new UserInfo(profileInfo);

// Включение валидации
  const validatEditProfileForm = new FormValidator(config, '.form_type_edit');
  validatEditProfileForm.enableValidation();

  const validateAddCardForm = new FormValidator(config, '.form_type_add');
  validateAddCardForm.enableValidation();

  const validateSetAvatarForm = new FormValidator(config, '.form_type_add-avatar');
  validateSetAvatarForm.enableValidation();

  // Попапы
  const formEditProfilePopup = new PopupWithForm('.popup_type_edit', handleFormEditSubmit);
  const formAddCardPopup = new PopupWithForm('.popup_type_add', addCardSubmit);
  const formAddAvatarPopup = new PopupWithForm('.popup_type_add-avatar', setAvatarSubmit);
  const confirmPopup = new PopupWithConfirm('.popup_type_confirm', deleteUserCard);
};

const initialPromises = Promise.all([
  api.getProfileInfo(),
  api.getInitialCards(),
]);

initialPromises
  .then(([profile, cards]) => runApp({
    profile,
    cards
  }, api))
  .catch((err) => {
    console.log(err);
  });

