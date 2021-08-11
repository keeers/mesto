import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import { initialCards, config, templateSelector, editButton, addButton, popupInputName, popupInputJob, imagePopupSelector, addCardPopupSelector, editProfilePopupSelector, cardListSelector, profileNameSelector, profileJobSelector } from '../utils/constants.js';

const cards = new Section({
    renderer: (cardItem) => {
        cards.addElement(createCard(cardItem));
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
        cards.addElement(createCard(cardInfo));
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

const imagePopup = new PopupWithImage({ popupSelector: imagePopupSelector })

const addForm = document.forms.addForm;
const addFormValidator = new FormValidator(addForm, config);
const editForm = document.forms.editForm;
const editFormValidator = new FormValidator(editForm, config)

function createCard(cardItem) {
    const card = new Card({
        data: cardItem
    }, {
        handleCardClick: () => {
            imagePopup.open(cardItem.name, cardItem.link);
        }
        , templateSelector: templateSelector
    }).createCard();

    return card;
}

addButton.addEventListener('click', () => {
    addFormValidator.clearValidationErrors();
    addPopup.open();
});

editButton.addEventListener('click', () => {
    popupInputName.value = userInfo.getUserInfo().name;
    popupInputJob.value = userInfo.getUserInfo().job;
    editFormValidator.clearValidationErrors();
    editPopup.open();
});


editPopup.setEventListeners();
addPopup.setEventListeners();
imagePopup.setEventListeners();
addFormValidator.enableValidation();
editFormValidator.enableValidation();
cards.renderItems(initialCards);

