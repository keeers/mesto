export default class FormValidator {
    constructor(formElement, config) {
        this._formSelector = config.formSelector;
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass = config.errorClass;
        this._formElement = formElement;
        this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
        this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    };

    _showError(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`.${inputElement.name}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.classList.add(this._errorClass);
        errorElement.textContent = errorMessage;
    };

    _hideError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.name}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    };

    clearValidationErrors() {
        this._inputList.forEach((inputElement) => {
            this._hideError(inputElement);
        });
        this._toggleSaveButton();
    };

    _toggleSaveButton() {
        const findInvalidInput = (inputElement) => !inputElement.validity.valid;
        const hasInvalidInput = this._inputList.some(findInvalidInput);

        if (hasInvalidInput) {
            this._buttonElement.classList.add(this._inactiveButtonClass);
            this._buttonElement.setAttribute('disabled', true);
        } else {
            this._buttonElement.classList.remove(this._inactiveButtonClass);
            this._buttonElement.removeAttribute('disabled');
        };
    };

    _checkValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showError(inputElement, inputElement.validationMessage);
        } else {
            this._hideError(inputElement);
        };
    };

    _setValidateListeners() {
        const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
        const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));

        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkValidity(inputElement);
                this._toggleSaveButton(inputList, buttonElement);
            });
        });
    };

    enableValidation() {
        this._setValidateListeners();
    };
};
