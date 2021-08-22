import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import Api from '../components/Api.js';
import { config, templateSelector, editButton, addButton, popupInputName, popupInputJob, imagePopupSelector, addCardPopupSelector, editProfilePopupSelector, cardListSelector, cardLikeSelector, profileNameSelector, profileJobSelector } from '../utils/constants.js';

const cards = new Section({
    renderer: (cardItem) => {
        cards.addElement(createCard(cardItem));
    }, containerSelector: cardListSelector
});

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-27',
    headers: {
        authorization: '7abd72de-4e29-415a-9784-32653cfffc2b',
        'Content-Type': 'application/json'
    }
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
        api.addNewCard(formData).catch(err => console.log(err));
        addPopup.close();
    }
});

const editPopup = new PopupWithForm({
    popupSelector: editProfilePopupSelector,
    handleFormSubmit: (formData) => {
        userInfo.setUserInfo(formData.nameInput, formData.jobInput);
        editPopup.close();
        api.setUserInfo(formData).catch(err => console.log(err));
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
    card.querySelector(cardLikeSelector).textContent = cardItem.likes;
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

api.getInitialCards().then(initialCards => cards.renderItems(initialCards)).catch(err => console.log(err));
api.getUserInfo().then(data => {
    userInfo.setUserInfo(data.name, data.about);
    userInfo.setUserPic(data.avatar);
}).catch(err => console.log(err));



