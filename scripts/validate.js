export { clearValidationErrors, config }

function showError(formElement, inputElement, inputErrorClass, errorClass, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.classList.add(errorClass);
    errorElement.textContent = errorMessage;
};

function hideError(formElement, inputElement, inputErrorClass, errorClass) {
    const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
};

function clearValidationErrors(popupElement, config) {
    const formElement = popupElement.querySelector(config.formSelector);
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    inputList.forEach((inputElement) => {
        hideError(formElement, inputElement, config.inputErrorClass, config.errorClass);
    });
    toggleSaveButton(inputList, formElement.querySelector(config.submitButtonSelector), config.inactiveButtonClass);
};

function toggleSaveButton(inputList, buttonElement, inactiveButtonClass) {
    const findInvalidInput = (inputElement) => !inputElement.validity.valid;
    const hasInvalidInput = inputList.some(findInvalidInput);

    if (hasInvalidInput) {
        buttonElement.classList.add(inactiveButtonClass);
        buttonElement.setAttribute('disabled', true);
    } else {
        buttonElement.classList.remove(inactiveButtonClass);
        buttonElement.removeAttribute('disabled');
    };
};

function checkValidity(formElement, inputElement, inputErrorClass, errorClass) {
    if (!inputElement.validity.valid) {
        showError(formElement, inputElement, inputErrorClass, errorClass, inputElement.validationMessage);
    } else {
        hideError(formElement, inputElement, inputErrorClass, errorClass);
    };
};

function setEventListeners(formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass) {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);

    function setValidateListeners(inputElement) {
        inputElement.addEventListener('input', () => {
            checkValidity(formElement, inputElement, inputErrorClass, errorClass);
            toggleSaveButton(inputList, buttonElement, inactiveButtonClass);
        });
    };

    inputList.forEach((inputElement) => {
        setValidateListeners(inputElement);
    });
};

function enableValidation({ formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass }) {
    const formList = Array.from(document.querySelectorAll(formSelector));
    formList.forEach((formElement) => {
        setEventListeners(formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass)
    });
};

const config = {
    formSelector: '.popup__container',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-btn',
    inactiveButtonClass: 'popup__save-btn_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
};

enableValidation(config);