const editBtn = document.querySelector('.profile__edit-button');
const addBtn = document.querySelector('.profile__add-button');
const editProfilePopup = document.querySelector('.popup_type_edit');
const addItemPopup = document.querySelector('.popup_type_add');
const imagePopup = document.querySelector('.popup_type_image');
const popupCloseBtns = document.querySelectorAll('.popup__close-button');
const nameInput = document.querySelector('.form__field_type_name');
const jobInput = document.querySelector('.form__field_type_about');
const nameProfile = document.querySelector('.profile__title');
const jobProfile = document.querySelector('.profile__subtitle');
const titleInput = document.querySelector('.form__field_type_title');
const linkInput = document.querySelector('.form__field_type_link');
const itemsContainer = document.querySelector('.elements');
const itemTemplate = document.querySelector('#item-template').content;
const popupTemplate = document.querySelector('#popup-template').content;

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

function togglePopup(popupElement) {
    popupElement.classList.toggle('popup_opened');
}

function fillingInputs() {
    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent;
}

function formEditSubmitHandler (evt) {
    evt.preventDefault();
    
    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;

    togglePopup(editProfilePopup);
}

function loadInitialCards () {
    initialCards.forEach(function (element) {
        const initialElement = itemTemplate.querySelector('.elements__item').cloneNode(true);    
        initialElement.querySelector('.elements__title').textContent = element.name;
        initialElement.querySelector('.elements__image').src = element.link;
        initialElement.querySelector('.elements__image').alt = element.name;
       
        const likeElement = initialElement.querySelector('.elements__like-button');
        likeElement.addEventListener('click', function () {
            toggleLike(likeElement);
        });

        const trashElement = initialElement.querySelector('.elements__trash-button');
        trashElement.addEventListener('click', function () {
            const cardItem = trashElement.closest('.elements__item');
            cardItem.remove();        
        });

        const imageElement = initialElement.querySelector('.elements__image');
        imageElement.addEventListener('click', function () {
            togglePopup(imagePopup);

            const popupImageElement = popupTemplate.querySelector('.popup__gallery').cloneNode(true);
            
            popupImageElement.querySelector('.popup__image').src = element.link;
            popupImageElement.querySelector('.popup__image').alt = element.name;
            popupImageElement.querySelector('.popup__capture').textContent = element.name;
            
            const closeButton = popupImageElement.querySelector('.popup__close-button');
            closeButton.addEventListener('click', function () {
                popupImageElement.remove();
                togglePopup(imagePopup);
            });

            imagePopup.prepend(popupImageElement);
        });

        itemsContainer.prepend(initialElement);
      })
};

function formAddSubmitHandler (evt) {
    evt.preventDefault();
    const itemElement = itemTemplate.querySelector('.elements__item').cloneNode(true);

    itemElement.querySelector('.elements__title').textContent = titleInput.value;
    itemElement.querySelector('.elements__image').src = linkInput.value;
    itemElement.querySelector('.elements__image').alt = titleInput.value;

    const likeElement = itemElement.querySelector('.elements__like-button');
    likeElement.addEventListener('click', function () {
        toggleLike(likeElement);
    });

    const trashElement = itemElement.querySelector('.elements__trash-button');
    trashElement.addEventListener('click', function () {
        const cardItem = trashElement.closest('.elements__item');
        cardItem.remove();        
    });

    itemsContainer.prepend(itemElement);

    togglePopup(addItemPopup);
}

document.addEventListener("DOMContentLoaded", loadInitialCards);

editBtn.addEventListener('click', function () {
    togglePopup(editProfilePopup);
    fillingInputs();
});

addBtn.addEventListener('click', function () {
    togglePopup(addItemPopup);
});

popupCloseBtns.forEach(function (closeBtn) {
    closeBtn.addEventListener('click', function () {
    const popupClosest = closeBtn.closest('.popup');
    togglePopup(popupClosest);
    })
});

editProfilePopup.addEventListener('submit', formEditSubmitHandler);

addItemPopup.addEventListener('submit', formAddSubmitHandler);