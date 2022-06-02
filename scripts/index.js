const editBtn = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupCloseBtn = popup.querySelector('.popup__close-button');

const nameInput = popup.querySelector('.form__field_type_name');
const jobInput = popup.querySelector('.form__field_type_about');
const nameProfile = document.querySelector('.profile__title');
const jobProfile = document.querySelector('.profile__subtitle');

function togglePopup() {
    popup.classList.toggle('popup_opened');
}

function fillingInputs() {
    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent;
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    
    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;

    togglePopup();
}

editBtn.addEventListener('click', function () {
    togglePopup();
    fillingInputs();
});

popupCloseBtn.addEventListener('click', togglePopup);

popup.addEventListener('submit', formSubmitHandler);