import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';
import Api from '../components/Api.js';
import { profileEditBtn, cardAddBtn, avatarEditBtn, nameInput, jobInput, profileInfo, config } from '../utils/constants.js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-48',
  headers: {
    authorization: '6dcd6a5f-9295-4e62-a1cd-62fe426f6415',
    'Content-Type': 'application/json'
  }
});

// Создание экземпляра класса UserInfo
const newUser = new UserInfo(profileInfo);

// Запрос информации о профиле и загрузка карточек
api.getProfileInfo('users/me')
  .then((res) => {
    newUser.setUserInfo(res);
    newUser.setUserAvatar(res);
    api.getInitialCards('cards')
      .then((result) => {
        const initialSection = new Section({
          items: result,
          renderer: (item) => {
            const idCompare = res._id === item.owner._id;
            initialSection.addItem(createCard(item, '#item-template', handleCardClick, handleTrashBtnClick, handleLikeClick, idCompare));
          },
        }, '.elements');

        initialSection.renderItems();
      });
  })
  .catch((err) => {
    console.log(err);
  });

// Включение валидации
const validatEditProfileForm = new FormValidator(config, '.form_type_edit');
validatEditProfileForm.enableValidation();

const validateAddCardForm = new FormValidator(config, '.form_type_add');
validateAddCardForm.enableValidation();

const validateSetAvatarForm = new FormValidator(config, '.form_type_add-avatar');
validateSetAvatarForm.enableValidation();

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
}

const handleFormEditSubmit = (inputValues) => {
  formEditProfilePopup.setSavingMode();
  api.setProfileInfo('users/me', 'PATCH', inputValues)
    .then((result) => {
      newUser.setUserInfo(result);
      formEditProfilePopup.close();
      formEditProfilePopup.removeSavingMode();
    })
    .catch((err) => {
      console.log(err);
    });
};

// попап добавления новой картчоки
cardAddBtn.addEventListener('click', () => {
  formAddCardPopup.open();
  validateAddCardForm.clearInputsError();
});

const addCardSubmit = (inputValues) => {
  api.setNewCard('cards', 'POST', inputValues)
    .then((result) => {
      const initialSection = new Section({
        items: result,
        renderer: (result) => {
          initialSection.addItem(createCard(item, '#item-template', handleCardClick, handleTrashBtnClick, true));
        },
      }, '.elements');

      initialSection.addItem(createCard(result, '#item-template', handleCardClick, handleTrashBtnClick, true));
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

// попап добавления аватара
avatarEditBtn.addEventListener('click', () => {
  formAddAvatarPopup.open();
  validateSetAvatarForm.clearInputsError();
});

const setAvatarSubmit = (inputValues) => {
  formAddAvatarPopup.setSavingMode();
  api.setProfileAvatar('users/me/avatar', 'PATCH', inputValues)
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
  api.deleteCard(`cards/${id}`, 'DELETE')
    .then(() => {
      const initialSection = new Section({}, '.elements');
      initialSection.deleteItem(cardElement);
      confirmPopup.close();
    })
    .catch((err) => {
      console.log(err);
    });
};

// Создание экземпляров классов попапов
const formEditProfilePopup = new PopupWithForm('.popup_type_edit', handleFormEditSubmit);

const formAddCardPopup = new PopupWithForm('.popup_type_add', addCardSubmit);

const formAddAvatarPopup = new PopupWithForm('.popup_type_add-avatar', setAvatarSubmit);

const confirmPopup = new PopupWithConfirm('.popup_type_confirm', deleteUserCard);

const imagePreview = new PopupWithImage('.popup_type_image');

// Функция создания карточки
const createCard = (cardItem, cardSelector, handleClickImage, handleTrashBtnClick, handleLikeClick, isDelete) => {
  const card = new Card(cardItem, cardSelector, handleClickImage, handleTrashBtnClick, handleLikeClick,);
  const cardElement = card.generateCard(isDelete);

  return cardElement;
};

// Обработка лайков
const handleLikeClick = (id, likeElement, likeCounter) => {
  if (!likeElement.classList.contains('elements_like-button_active')) {
    api.removeLike(`cards/likes/${id}`, 'DELETE')
      .then((result) => {
        likeCounter.textContent = result.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    api.addLike(`cards/likes/${id}`, 'PUT')
      .then((result) => {
        likeCounter.textContent = result.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
