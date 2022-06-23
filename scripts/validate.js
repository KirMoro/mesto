const config = {
    formSelector: '.form',
    fieldsSelector: '.form__fields',
    inputList: '.form__field',
    buttonElement: '.form__submit-button',
    inactiveButtonClass: 'form__submit-button_disabled',
    inputErrorClass: 'form__field_type_error',
    errorClass: 'form__field-error_active'
  };

function showInputError(formElement, inputElement, errorMessage, config) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClass);
  };
  
  function hideInputError(formElement, inputElement, config) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = '';
  };
  
function clearInputsError(popupElement, config) {
    const inputErrorList = Array.from(popupElement.querySelectorAll(config.inputList));
    const buttonElement = popupElement.querySelector(config.buttonElement);

    inputErrorList.forEach((inputElement) => {
        hideInputError(popupElement, inputElement, config);
        inputElement.value = "";

        toggleButtonState(inputErrorList, buttonElement, config);
      });  
}

  function checkInputValidity(formElement, inputElement, config) {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, config);
    } else {
      hideInputError(formElement, inputElement, config);
    }
  };
  
  function hasInvalidInput (inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };
  
  function toggleButtonState(inputList, buttonElement, config) {
    if (hasInvalidInput(inputList, config)) {
      buttonElement.classList.add(config.inactiveButtonClass);
    } else {
      buttonElement.classList.remove(config.inactiveButtonClass);
    }
  };
  
  function setEventListeners(formElement, config) {
    const inputList = Array.from(formElement.querySelectorAll(config.inputList));
    const buttonElement = formElement.querySelector(config.buttonElement);
  
    toggleButtonState(inputList, buttonElement, config);
  
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement, config);
        toggleButtonState(inputList, buttonElement, config);
      });
    });
  };
  
  function enableValidation(config) {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
      formList.forEach((formElement) => {
        formElement.addEventListener('submit', function (evt) {
          evt.preventDefault();
        });
      
        const fieldsetList = Array.from(formElement.querySelectorAll(config.fieldsSelector));
        
        fieldsetList.forEach((fieldSet) => {
            setEventListeners(fieldSet, config);
      });
      });
  }
  
enableValidation(config);