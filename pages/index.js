const edit_btn = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupCloseBtn = popup.querySelector('.popup__close-button');

let nameInput = popup.querySelector('.form__field-name');
let jobInput = popup.querySelector('.form__field-about');
let nameProfile = document.querySelector('.profile__title');
let jobProfile = document.querySelector('.profile__subtitle');

function openPopup() {
    popup.classList.add('popup_opened');

    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent;
}

function closePopup() {
    popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    
    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;

    closePopup();
}

edit_btn.addEventListener('click', openPopup);

popupCloseBtn.addEventListener('click', closePopup);

popup.addEventListener('submit', formSubmitHandler);