const editBtn = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupCloseBtn = popup.querySelector('.popup__close-button');

const nameInput = popup.querySelector('.form__field_type_name');
const jobInput = popup.querySelector('.form__field_type_about');
const nameProfile = document.querySelector('.profile__title');
const jobProfile = document.querySelector('.profile__subtitle');

function openPopup() {
    popup.classList.add('popup_opened');
}

function closePopup() {
    popup.classList.remove('popup_opened');
}

function fillingInputs() {
    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent;
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    
    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;

    closePopup();
}

editBtn.addEventListener('click', function () {
    openPopup();
    fillingInputs();
});

popupCloseBtn.addEventListener('click', closePopup);

popup.addEventListener('submit', formSubmitHandler);