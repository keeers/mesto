import { initialCards } from './initial-cards.js'
import Card from './card.js'
import { clearValidationErrors, config } from './validate.js'


const templateSelector = '.template';
const editButton = document.querySelector('.profile__edit-btn');
const addButton = document.querySelector('.profile__add-btn');
const popupCloseButtons = document.querySelectorAll('.popup__close-btn');
const popupInputName = document.querySelector('.popup__input_type_name');
const popupInputJob = document.querySelector('.popup__input_type_job');
const popupInputTitle = document.querySelector('.popup__input_type_title');
const popupInputLink = document.querySelector('.popup__input_type_link');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const editPopup = document.querySelector('.popup_type_edit-profile');
const addPopup = document.querySelector('.popup_type_add-card');


export default function openPopup(popupElement) {
    popupElement.classList.add('popup_is-opened');
    addClosePopupListeners(popupElement);
};

function removePopup(popupElement) {
    popupElement.classList.remove('popup_is-opened');
    removeClosePopupListeners(popupElement);
};

function closePopup(evt) {
    const popupElement = evt.target.closest('.popup');
    removePopup(popupElement);
};

function closePopupOnClick(evt) {
    if (evt.target.classList.contains('popup')) {
        closePopup(evt);
    };
};

function closePopunOnEscape(evt) {
    if (evt.key === 'Escape') {
        const popupElement = document.querySelector('.popup_is-opened');
        removePopup(popupElement);
    };

};

const closeButtons = Array.from(popupCloseButtons);
closeButtons.forEach(function (item) {
    item.addEventListener('click', closePopup);
});

function submitEditProfilePopup(evt) {
    evt.preventDefault();
    profileName.textContent = popupInputName.value;
    profileJob.textContent = popupInputJob.value;
    closePopup(evt);
};

function submitAddCardPopup(evt) {
    evt.preventDefault();
    const newCard = {
        name: popupInputTitle.value,
        link: popupInputLink.value
    };
    addCard(newCard);
    closePopup(evt);
};

addButton.addEventListener('click', () => {
    document.forms.addForm.reset();
    openPopup(addPopup);
    clearValidationErrors(addPopup, config);
});

editButton.addEventListener('click', () => {
    popupInputName.value = profileName.textContent;
    popupInputJob.value = profileJob.textContent;
    openPopup(editPopup);
    clearValidationErrors(editPopup, config);
});

function addClosePopupListeners(popupElement) {
    popupElement.addEventListener('click', closePopupOnClick);
    document.addEventListener('keydown', closePopunOnEscape);
};

function removeClosePopupListeners(popupElement) {
    popupElement.removeEventListener('click', closePopupOnClick);
    document.removeEventListener('keydown', closePopunOnEscape);
};

addPopup.addEventListener('submit', submitAddCardPopup);
editPopup.addEventListener('submit', submitEditProfilePopup);


initialCards.forEach((item) => {
    const card = new Card(item, templateSelector);
    card.addCard();
})