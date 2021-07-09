function showError(inputElement, sectionSelector, inputErrorClass, errorSelector, errorClass, errorMessage) {
    const formSection = inputElement.closest(sectionSelector);
    inputElement.classList.add(inputErrorClass);
    const errorElement = formSection.querySelector(errorSelector);
    errorElement.classList.add(errorClass);
    errorElement.textContent = errorMessage;
}

function hideError(inputElement, sectionSelector, inputErrorClass, errorSelector, errorClass) {
    const formSection = inputElement.closest(sectionSelector);
    inputElement.classList.remove(inputErrorClass);
    const errorElement = formSection.querySelector(errorSelector);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
}

function toggleSaveButton(inputList, buttonElement, inactiveButtonClass) {
    const findInvalidInput = (inputElement) => !inputElement.validity.valid;
    const hasInvalidInput = inputList.some(findInvalidInput);

    if (hasInvalidInput) {
        buttonElement.classList.add(inactiveButtonClass);
        buttonElement.setAttribute('disabled', true);
    } else {
        buttonElement.classList.remove(inactiveButtonClass);
        buttonElement.removeAttribute('disabled');
    }
}

function checkValidity(inputElement, sectionSelector, inputErrorClass, errorSelector, errorClass) {
    if (!inputElement.validity.valid) {
        showError(inputElement, sectionSelector, inputErrorClass, errorSelector, errorClass, inputElement.validationMessage);
    } else hideError(inputElement, sectionSelector, inputErrorClass, errorSelector, errorClass);
}

function setEventListeners(formElement, inputSelector, submitButtonSelector, inactiveButtonClass, sectionSelector, inputErrorClass, errorSelector, errorClass) {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);

    function setValidateListeners(inputElement) {
        inputElement.addEventListener('input', () => {
            checkValidity(inputElement, sectionSelector, inputErrorClass, errorSelector, errorClass);
            toggleSaveButton(inputList, buttonElement, inactiveButtonClass);
        });
    }

    inputList.forEach((inputElement) => {
        setValidateListeners(inputElement);
    });
}

function enableValidation({
    formSelector,
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass,
    sectionSelector,
    inputErrorClass,
    errorSelector,
    errorClass
}) {
    const formList = Array.from(document.querySelectorAll(formSelector));
    formList.forEach((formElement) => {
        setEventListeners(formElement, inputSelector, submitButtonSelector, inactiveButtonClass, sectionSelector, inputErrorClass, errorSelector, errorClass)
    });
}

enableValidation({
    formSelector: '.popup__container',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-btn',
    inactiveButtonClass: 'popup__save-btn_disabled',
    sectionSelector: '.popup__section',
    inputErrorClass: 'popup__input_type_error',
    errorSelector: '.popup__input-error',
    errorClass: 'popup__input-error_active'
});
