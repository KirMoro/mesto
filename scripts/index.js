const editBtn = document.querySelector('.profile__edit-button');
const addBtn = document.querySelector('.profile__add-button');
const editProfilePopup = document.querySelector('.popup_type_edit');
const addItemPopup = document.querySelector('.popup_type_add');
const popupCloseBtns = document.querySelectorAll('.popup__close-button');

const editPopupCloseBtn = editProfilePopup.querySelector('.popup__close-button');
const addPopupCloseBtn = addItemPopup.querySelector('.popup__close-button');

const nameInput = document.querySelector('.form__field_type_name');
const jobInput = document.querySelector('.form__field_type_about');
const nameProfile = document.querySelector('.profile__title');
const jobProfile = document.querySelector('.profile__subtitle');

const titleInput = document.querySelector('.form__field_type_title');
const linkInput = document.querySelector('.form__field_type_link');
const itemsContainer = document.querySelector('.elements');

const trashBtns = itemsContainer.children;

const likeBtns = itemsContainer.querySelectorAll('.elements__like-button');
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

  function loadInitialCards () {
    initialCards.forEach(function (element) {
        const initialElement = itemTemplate.querySelector('.elements__item').cloneNode(true);
    
        initialElement.querySelector('.elements__title').textContent = element.name;
        initialElement.querySelector('.elements__image').src = element.link;
        initialElement.querySelector('.elements__image').alt = element.name;
      
        itemsContainer.prepend(initialElement);
      })
};

document.addEventListener("DOMContentLoaded", loadInitialCards);

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

function formAddSubmitHandler (evt) {
    evt.preventDefault();
    const itemElement = itemTemplate.querySelector('.elements__item').cloneNode(true);

    itemElement.querySelector('.elements__title').textContent = titleInput.value;
    itemElement.querySelector('.elements__image').src = linkInput.value;
    itemElement.querySelector('.elements__image').alt = titleInput.value;

    itemsContainer.prepend(itemElement);

    togglePopup(addItemPopup);
  }

//   for (let i = 0; i < trashBtns.length; ++i) {
//     let item = trashBtns[i];  
//     console.log(item);
//   }

//   for (var i = 0; i < trashBtns.length; i++){
//     console.log(trashBtns[i]);
// }

// trashBtns.forEach(function (trashBtn) {
//     console.log(trashBtn);
// });

// trashBtns.forEach(function (trashBtn) {
//     trashBtn.addEventListener('click', function () {
//         const removedItem = trashBtn.closest('.elements__item');
//         console.log(removedItem);
//         removedItem.remove();
//     })
// });

editBtn.addEventListener('click', function () {
    togglePopup(editProfilePopup);
    fillingInputs();
});

addBtn.addEventListener('click', function () {
    togglePopup(addItemPopup);
});

editPopupCloseBtn.addEventListener('click', function () {
    togglePopup(editProfilePopup);
});

addPopupCloseBtn.addEventListener('click', function () {
    togglePopup(addItemPopup);
});

editProfilePopup.addEventListener('submit', formEditSubmitHandler);

addItemPopup.addEventListener('submit', formAddSubmitHandler);

console.log(trashBtns)

// trashBtns.forEach(function (trashBtn) {
//     trashBtn.addEventListener('click', function () {
//         const removedItem = trashBtn.closest('.elements__item');
//         console.log(removedItem);
//         removedItem.remove();
//     })
// });



// document.querySelector('.popup__close-button').addEventListener('click', function (evt) {
//     evt.target.classList.toggle('popup_opened');
//     });
