
const popupEditButton = document.querySelector('.profile__edit-btn');
const popupElement = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup__close-btn');
const popupSaveButton = document.querySelector('.popup__save-btn')
const popupInputName = document.querySelector('.popup__input_name');
const popupInputJob = document.querySelector('.popup__input_job');
const name = document.querySelector('.profile__name');
const job = document.querySelector('.profile__job');
const popupForm = document.querySelector('.popup__container');


const openPopup = function () {
    popupInputName.value = name.textContent;
    popupInputJob.value = job.textContent;
    popupElement.classList.add('popup_is-opened');
}

const closePopup = function () {
    popupElement.classList.remove('popup_is-opened');
}

const savePopup = function (evt) {
    evt.preventDefault();
    name.textContent = popupInputName.value;
    job.textContent = popupInputJob.value;
    closePopup();
}


popupEditButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);
popupForm.addEventListener('submit', savePopup);
