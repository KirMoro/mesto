export class FormValidator {
  constructor(settings, formElement) {
    this._formElement = document.querySelector(formElement);
    this._fieldsSelector = settings.fieldsSelector;
    this._fieldsetList = Array.from(this._formElement.querySelectorAll(this._fieldsSelector));
    this._inputSelector = settings.inputList;
    this._buttonElement = settings.buttonElement;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));;
    this._submitButton = this._formElement.querySelector(this._buttonElement);
  }

  _showInputError(fieldSet, inputElement, errorMessage) {
    const errorElement = fieldSet.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(fieldSet, inputElement) {
    const errorElement = fieldSet.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  _checkInputValidity(fieldSet, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(fieldSet, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(fieldSet, inputElement);
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => !inputElement.validity.valid);
  }

  _toggleButtonState(inputList) {
    if (this._hasInvalidInput(inputList)) {
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.setAttribute('disabled', true);
    } else {
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.removeAttribute('disabled');
    }
  }

  clearInputsError() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(this._formElement, inputElement);
      inputElement.value = '';

      this._toggleButtonState(this._inputList);
    });
  }

  _setEventListeners(fieldSet) {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(fieldSet, inputElement);
        this._toggleButtonState(this._inputList);
      });
    });
  }

  enableValidation(settings) {
      this._formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });

      this._fieldsetList.forEach((fieldSet) => {
        this._setEventListeners(fieldSet);
      });
    };
}
