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
  
function clearInputsError(inputError) {
    const inputErrorList = Array.from(inputError.querySelectorAll('.form__field-error_active, .form__field_type_error'));
    
    inputErrorList.forEach((inputElement) => {
      inputElement.classList.remove('form__field_type_error');
      inputElement.classList.remove('form__field-error_active');
      inputElement.value = ""
      });  
}

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
    }  else {
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
  
  function enableValidation(obj) {
    const formList = Array.from(document.querySelectorAll(obj.formSelector));
      formList.forEach((formElement) => {
        formElement.addEventListener('submit', function (evt) {
          evt.preventDefault();
        });
      
      const fieldsetList = Array.from(formElement.querySelectorAll(obj.fieldsSelector));
      
      fieldsetList.forEach((fieldSet) => {
        setEventListeners(fieldSet);
      });
      });
  }
  
  enableValidation({
    formSelector: '.form',
    fieldsSelector: '.form__fields',
    inputList: '.form__field',
    buttonElement: '.form__submit-button',
    inactiveButtonClass: 'form__submit-button_disabled',
    inputErrorClass: 'form__field_type_error',
    errorClass: 'form__field-error_active'
  });