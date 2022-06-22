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

const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

function toggleLike(likeElement) {
    likeElement.classList.toggle('elements_like-button_active');
}
 
function closePopupByKey(evt) {
  const popup = document.querySelector('.popup_opened');
  if (evt.key === 'Escape') {
    closePopup(popup);
  }
}

function openPopup(popupElement) {
    popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupByKey)
}

function closePopup(popupElement) {
    popupElement.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupByKey)
}

function fillingInputs() {
    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent;
}

function formEditSubmitHandler (evt) {
    evt.preventDefault();
    
    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;

    closePopup(popupEditProfile);
}

function deleteCard(card) {
    card.remove();
}

function createCard (element) {
    const initialElement = itemTemplate.querySelector('.elements__item').cloneNode(true);
    const initialElementImage = initialElement.querySelector('.elements__image');
    initialElement.querySelector('.elements__title').textContent = element.name;
    initialElementImage.src = element.link;
    initialElementImage.alt = element.name;
       
    const likeElement = initialElement.querySelector('.elements__like-button');
    likeElement.addEventListener('click', function () {
        toggleLike(likeElement);
    });

    initialElement.querySelector('.elements__trash-button').addEventListener('click', function () {
        deleteCard(initialElement);
    });

    initialElementImage.addEventListener('click', function () {
        popupImageCard.src = element.link;
        popupImageCard.alt = element.name;
        popupCapture.textContent = element.name;
        openPopup(popupImagePreview);
    });

    return initialElement;
};

function renderCard(initialElement) {
    itemsContainer.prepend(createCard(initialElement));
}

initialCards.forEach(renderCard);

function addCardSubmit (evt) {
    evt.preventDefault();

    const itemElement = {     
        name: "", 
        link: "",         
      };

    itemElement.name = titleInput.value;
    itemElement.link = linkInput.value;
   
    if (itemElement.name === '' || itemElement.link === '') {
        addCardSubmit;
        } else {
            renderCard(itemElement);

            closePopup(popupAddCard);
            
            formAddCard.reset();
            }
}

profileEditBtn.addEventListener('click', function () {
    fillingInputs();
    openPopup(popupEditProfile);
});

cardAddBtn.addEventListener('click', function () {
    openPopup(popupAddCard);
});

popupCloseBtns.forEach(function (popupCloseBnt) {
    popupCloseBnt.addEventListener('click', function () {
    const popupClosest = popupCloseBnt.closest('.popup');
    closePopup(popupClosest);
    })
});

popups.forEach(function (popup) {
    popup.addEventListener('click', function (evt) {
      if (evt.target === evt.currentTarget) {
        closePopup(popup);
      }
  });
});

formEditProfile.addEventListener('submit', formEditSubmitHandler);

formAddCard.addEventListener('submit', addCardSubmit);

// VALIDATION
function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('form__field_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__field-error_active');
};

function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('form__field_type_error');
  errorElement.classList.remove('form__field-error_active');
  errorElement.textContent = '';
};

function checkInputValidity(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

function hasInvalidInput (inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('form__submit-button_disabled');
  } else {
    buttonElement.classList.remove('form__submit-button_disabled');
  }
};

function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.form__field'));
  const buttonElement = formElement.querySelector('.form__submit-button');

  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

function enableValidation() {
    const formList = Array.from(document.querySelectorAll('.form'));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });
      
    const fieldsetList = Array.from(formElement.querySelectorAll('.form__fields'));
    
    fieldsetList.forEach((fieldSet) => {
      setEventListeners(fieldSet);
    });
    });
}

enableValidation();