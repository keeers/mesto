import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import { initialCards, config, formList, templateSelector, editButton, addButton, popupInputName, popupInputJob, imagePopupSelector, addCardPopupSelector, editProfilePopupSelector, cardListSelector, profileNameSelector, profileJobSelector } from '../utils/constants.js';

const cards = new Section({
    items: initialCards, renderer: (cardItem) => {
        const card = new Card({
            name: cardItem.name, link: cardItem.link,
            handleCardClick: () => {
                const imagePopup = new PopupWithImage({ popupSelector: imagePopupSelector, name: cardItem.name, src: cardItem.link })
                imagePopup.open();
                imagePopup.setEventListeners();
            }
            , templateSelector: templateSelector
        });
        const cardElement = card.createCard();
        cards.addElement(cardElement);

    }, containerSelector: cardListSelector
});

const userInfo = new UserInfo({ nameSelector: profileNameSelector, jobSelector: profileJobSelector });

const addPopup = new PopupWithForm({
    popupSelector: addCardPopupSelector,
    handleFormSubmit: (formData) => {
        const cardInfo = {
            name: formData.titleInput,
            link: formData.linkInput
        };
        const newCard = new Card({
            name: cardInfo.name, link: cardInfo.link,
            handleCardClick: () => {
                const imagePopup = new PopupWithImage({ popupSelector: imagePopupSelector, name: item.name, src: item.link })
                imagePopup.open();
                imagePopup.setEventListeners();
            }
            , templateSelector: templateSelector
        }).createCard();
        cards.addElement(newCard);
        addPopup.close();
    }
});

const editPopup = new PopupWithForm({
    popupSelector: editProfilePopupSelector,
    handleFormSubmit: (formData) => {
        userInfo.setUserInfo(formData.nameInput, formData.jobInput);
        editPopup.close();
    }
})

addButton.addEventListener('click', () => {
    const addForm = document.forms.addForm;
    addForm.reset();
    new FormValidator(addForm, config).clearValidationErrors();
    addPopup.open();
});

editButton.addEventListener('click', () => {
    popupInputName.value = userInfo.getUserInfo().name;
    popupInputJob.value = userInfo.getUserInfo().job;
    const editForm = document.forms.editForm;
    new FormValidator(editForm, config).clearValidationErrors();
    editPopup.open();
});

formList.forEach((item) => {
    const formElement = new FormValidator(item, config);
    formElement.enableValidation();
});

editPopup.setEventListeners();
addPopup.setEventListeners();
cards.renderItems();

