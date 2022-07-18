const config = {
  formSelector: '.form',
  fieldsSelector: '.form__fields',
  inputList: '.form__field',
  buttonElement: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_disabled',
  inputErrorClass: 'form__field_type_error',
  errorClass: 'form__field-error_active',
};

// function showInputError(formElement, inputElement, errorMessage, settings) {
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   inputElement.classList.add(settings.inputErrorClass);
//   errorElement.textContent = errorMessage;
//   errorElement.classList.add(settings.errorClass);
// }

// function hideInputError(formElement, inputElement, settings) {
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   inputElement.classList.remove(settings.inputErrorClass);
//   errorElement.classList.remove(settings.errorClass);
//   errorElement.textContent = '';
// }

// function checkInputValidity(formElement, inputElement, settings) {
//   if (!inputElement.validity.valid) {
//     showInputError(formElement, inputElement, inputElement.validationMessage, settings);
//   } else {
//     hideInputError(formElement, inputElement, settings);
//   }
// }

// function hasInvalidInput(inputList) {
//   return inputList.some((inputElement) => !inputElement.validity.valid);
// }

// function toggleButtonState(inputList, buttonElement, settings) {
//   if (hasInvalidInput(inputList, settings)) {
//     buttonElement.classList.add(settings.inactiveButtonClass);
//     buttonElement.setAttribute('disabled', true);
//   } else {
//     buttonElement.classList.remove(settings.inactiveButtonClass);
//     buttonElement.removeAttribute('disabled');
//   }
// }

// function setEventListeners(formElement, settings) {
//   const inputList = Array.from(formElement.querySelectorAll(settings.inputList));
//   const buttonElement = formElement.querySelector(settings.buttonElement);

//   toggleButtonState(inputList, buttonElement, settings);

//   inputList.forEach((inputElement) => {
//     inputElement.addEventListener('input', () => {
//       checkInputValidity(formElement, inputElement, settings);
//       toggleButtonState(inputList, buttonElement, settings);
//     });
//   });
// }

// function enableValidation(settings) {
//   const formList = Array.from(document.querySelectorAll(settings.formSelector));
//   formList.forEach((formElement) => {
//     formElement.addEventListener('submit', (evt) => {
//       evt.preventDefault();
//     });

//     const fieldsetList = Array.from(formElement.querySelectorAll(settings.fieldsSelector));

//     fieldsetList.forEach((fieldSet) => {
//       setEventListeners(fieldSet, settings);
//     });
//   });
// }

// enableValidation(config);

class FormValidator {
  constructor(settings, formElement) {
    this._formSelector = settings.formSelector;
    this._fieldsSelector = settings.fieldsSelector;
    this._inputList = settings.inputList;
    this._buttonElement = settings.buttonElement;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._formElement = formElement;
  }

  _showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  _checkInputValidity(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(formElement, inputElement);
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => !inputElement.validity.valid);
  }

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.setAttribute('disabled', true);
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
    }
  }

  clearInputsError(popupElement) {
    const inputErrorList = Array.from(popupElement.querySelectorAll(this._inputList));
    const buttonElement = popupElement.querySelector(this._buttonElement);

    inputErrorList.forEach((inputElement) => {
      this._hideInputError(popupElement, inputElement);
      inputElement.value = '';

      this._toggleButtonState(inputErrorList, buttonElement);
    });
  }

  _setEventListeners(formElement) {
    const inputList = Array.from(formElement.querySelectorAll(this._inputList));
    const buttonElement = formElement.querySelector(this._buttonElement);

    this._toggleButtonState(inputList, buttonElement);

    const fieldsetList = Array.from(formElement.querySelectorAll(this._fieldsSelector));

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(formElement, inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }

  enableValidation(settings) {
    const formList = Array.from(document.querySelectorAll(this._formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });

      const fieldsetList = Array.from(formElement.querySelectorAll(this._fieldsSelector));

      fieldsetList.forEach((fieldSet) => {
        this._setEventListeners(fieldSet);
      });
    });
  }

// имеет приватные методы, которые обрабатывают форму:
 // проверяют валидность поля,
 // изменяют состояние кнопки сабмита,
 // устанавливают все обработчики;
// имеет публичный метод enableValidation, который включает валидацию формы.
// Для каждой проверяемой формы создайте экземпляр класса FormValidator.
}


const formList = Array.from(document.querySelectorAll('.form'));

formList.forEach((form) => {
  const validateForm = new FormValidator (config, '.form');
  validateForm.enableValidation();
});
