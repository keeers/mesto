import Card from './Card.js';
import FormValidator from './FormValidator.js';
import PopupWithForm from './PopupWithForm.js';
import PopupWithImage from './PopupWithImage.js';
import UserInfo from './UserInfo.js';
import { initialCards, config, formList, templateSelector, editButton, addButton, popupInputName, popupInputJob } from '../utils/constants.js';

function addCard(card) {
    const cards = document.querySelector('.cards');
    cards.prepend(card);
};

addButton.addEventListener('click', () => {
    const addPopup = new PopupWithForm('.popup_type_add-card', {
        handleFormSubmit: (formData) => {
            const cardInfo = {
                name: formData.titleInput,
                link: formData.linkInput
            };
            const newCard = new Card(cardInfo, {
                handleCardClick: () => {
                    const imagePopup = new PopupWithImage('.popup_type_image', { name: item.name, src: item.link })
                    imagePopup.open();
                    imagePopup.setEventListeners();
                }
            }, templateSelector).createCard();
            addCard(newCard);
            addPopup.close();
        }
    });
    addPopup.open();
    addPopup.setEventListeners();
    new FormValidator(addForm, config).clearValidationErrors();
});

editButton.addEventListener('click', () => {
    const userInfo = new UserInfo('.profile__name', '.profile__job');
    popupInputName.value = userInfo.getUserInfo().name;
    popupInputJob.value = userInfo.getUserInfo().job;
    const editForm = document.forms.editForm;
    new FormValidator(editForm, config).clearValidationErrors();
    const editPopup = new PopupWithForm('.popup_type_edit-profile', {
        handleFormSubmit: (formData) => {
            userInfo.setUserInfo(formData.nameInput, formData.jobInput);
            editPopup.close();
        }
    })
    editPopup.open();
    editPopup.setEventListeners();

});

initialCards.forEach((item) => {
    const card = new Card(item, {
        handleCardClick: () => {
            const imagePopup = new PopupWithImage('.popup_type_image', { name: item.name, src: item.link })
            imagePopup.open();
            imagePopup.setEventListeners();
        }
    }, templateSelector);
    addCard(card.createCard());
});

formList.forEach((item) => {
    const formElement = new FormValidator(item, config);
    formElement.enableValidation();
});