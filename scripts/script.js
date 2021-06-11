
const popupEditButton = document.querySelector('.profile__edit-btn');
const popupElement = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup__close-btn');
const popupSaveButton = document.querySelector('.popup__save-btn')
const popupInputName = document.querySelector('.popup__input_name');
const popupInputJob = document.querySelector('.popup__input_job');
const name = document.querySelector('.profile__name');
const job = document.querySelector('.profile__job');


console.log(popupEditButton, popupElement, popupCloseButton, popupInputJob, popupInputName, popupSaveButton, name, job);

const openPopup = function () {
    console.log(name.textContent);
    popupInputName.setAttribute('value', name.textContent);
    popupInputJob.setAttribute('value', job.textContent);
    popupElement.classList.add('popup_is-opened');

}

const closePopup = function () {
    popupElement.classList.remove('popup_is-opened');
}

const savePopup = function (evt) {
    evt.preventDefault();
    const InputName = document.querySelector('.popup__input_name').value;
    const InputJob = document.querySelector('.popup__input_job').value;

    name.textContent = InputName;
    job.textContent = InputJob;
    closePopup();

}


popupEditButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);
popupSaveButton.addEventListener('click', savePopup);