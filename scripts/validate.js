const config = {
  formSelector: '.form',
  fieldsSelector: '.form__fields',
  inputList: '.form__field',
  buttonElement: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_disabled',
  inputErrorClass: 'form__field_type_error',
  errorClass: 'form__field-error_active',
};

function showInputError(formElement, inputElement, errorMessage, settings) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(settings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.errorClass);
}

function hideInputError(formElement, inputElement, settings) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(settings.inputErrorClass);
  errorElement.classList.remove(settings.errorClass);
  errorElement.textContent = '';
}

function checkInputValidity(formElement, inputElement, settings) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, settings);
  } else {
    hideInputError(formElement, inputElement, settings);
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => !inputElement.validity.valid);
}

function toggleButtonState(inputList, buttonElement, settings) {
  if (hasInvalidInput(inputList, settings)) {
    buttonElement.classList.add(settings.inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove(settings.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
}

function clearInputsError(popupElement, settings) {
  const inputErrorList = Array.from(popupElement.querySelectorAll(settings.inputList));
  const buttonElement = popupElement.querySelector(settings.buttonElement);

  inputErrorList.forEach((inputElement) => {
    hideInputError(popupElement, inputElement, settings);
    inputElement.value = '';

    toggleButtonState(inputErrorList, buttonElement, settings);
  });
}

function setEventListeners(formElement, settings) {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputList));
  const buttonElement = formElement.querySelector(settings.buttonElement);

  toggleButtonState(inputList, buttonElement, settings);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, settings);
      toggleButtonState(inputList, buttonElement, settings);
    });
  });
}

function enableValidation(settings) {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    const fieldsetList = Array.from(formElement.querySelectorAll(settings.fieldsSelector));

    fieldsetList.forEach((fieldSet) => {
      setEventListeners(fieldSet, settings);
    });
  });
}

enableValidation(config);
