import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupDeleteCard from '../components/PopupDeleteCard';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import Api from '../components/Api.js';
import { config, templateSelector, editButton, addButton, popupInputName, popupInputJob, imagePopupSelector, addCardPopupSelector, editProfilePopupSelector, editAvatarPopupSelector, deletePopupSelector, cardListSelector, cardSelector, cardLikeSelector, cardImageSelector, cardTitleSelector, cardLikeButtonSelector, cardDeleteButtonSelector, likeButtonActiveClass, deleteCardSelector, deleteCardClassSelector, inactiveDeleteButtonClass, profileNameSelector, profileJobSelector, profileAvatarSelector, profileAvatarBox, submitEditButton, submitAddButton, submitAvatarButton } from '../utils/constants.js';
import { apiToken, apiURL } from '../utils/apiData.js';

const cards = new Section({
    renderer: (cardItem) => {
        cards.addElement(createCard(cardItem));
    }, containerSelector: cardListSelector
});

const api = new Api({
    baseUrl: apiURL,
    headers: {
        authorization: apiToken,
        'Content-Type': 'application/json'
    }
});

const userInfo = new UserInfo({ nameSelector: profileNameSelector, jobSelector: profileJobSelector, avatarSelector: profileAvatarSelector });

const addPopup = new PopupWithForm({
    popupSelector: addCardPopupSelector,
    handleFormSubmit: (formData) => {
        const cardInfo = {
            name: formData.titleInput,
            link: formData.linkInput,
            likes: [],
            likesCount: 0,
            owner: userId
        };
        api.addNewCard(formData).then((data) => {
            cards.addElement(createCard(cardInfo));
            submitAddButton.textContent += '...';
            cardInfo.id = data._id;
            addPopup.close();
        })
            .catch(err => console.log(err))
            .finally(() => {
                submitAddButton.textContent = submitAddButton.textContent.slice(0, -3);
            });
    }
});

const editPopup = new PopupWithForm({
    popupSelector: editProfilePopupSelector,
    handleFormSubmit: (formData) => {
        api.setUserInfo(formData)
            .then(() => {
                userInfo.setUserInfo(formData.nameInput, formData.jobInput);
                submitEditButton.textContent += '...';
                editPopup.close();
            })
            .catch(err => console.log(err))
            .finally(() => {
                submitEditButton.textContent = submitEditButton.textContent.slice(0, -3);
            });
    }
});

const imagePopup = new PopupWithImage({ popupSelector: imagePopupSelector });

const deletePopup = new PopupDeleteCard({
    popupSelector: deletePopupSelector, handleFormSubmit: () => {
        const card = document.querySelector(deleteCardSelector);
        const deleteCardId = (deletePopup.getCardId());
        api.deleteCard(deleteCardId)
            .then(() => {
                deletePopup.deleteCard(card);
                deletePopup.close();
            })
            .catch(err => console.log(err));
    }
});

const editAvatarPopup = new PopupWithForm({
    popupSelector: editAvatarPopupSelector, handleFormSubmit: (formData) => {
        api.setAvatar(formData.linkInput)
            .then(() => {
                userInfo.setUserPic(formData.linkInput);
                submitAvatarButton.textContent += '...';
                editAvatarPopup.close();
            })
            .catch(err => console.log(err))
            .finally(() => {
                submitAvatarButton.textContent = submitAvatarButton.textContent.slice(0, -3);
            });
    }
});

const addForm = document.forms.addForm;
const addFormValidator = new FormValidator(addForm, config);
const editForm = document.forms.editForm;
const editFormValidator = new FormValidator(editForm, config);
const editAvatarForm = document.forms.editAvatarForm;
const editAvatarFormValidator = new FormValidator(editAvatarForm, config);

function createCard(cardItem) {
    const card = new Card({
        data: cardItem
    }, {
        handleCardClick: () => {
            imagePopup.open(cardItem.name, cardItem.link);
        },
        handleDeleteClick: () => {
            deletePopup.open();
            deletePopup.setCardId(cardItem.id);
        },
        handleAddLike: () => {
            api.addLike(cardItem.id).catch(err => console.log(err));;;
        },
        handleRemoveLike: () => {
            api.removeLike(cardItem.id).catch(err => console.log(err));
        },
        cardSelector: cardSelector,
        deleteCardClassSelector: deleteCardClassSelector,
        templateSelector: templateSelector,
        likeButtonActiveClass: likeButtonActiveClass,
        inactiveDeleteButtonClass: inactiveDeleteButtonClass,
        cardTitleSelector: cardTitleSelector,
        cardImageSelector: cardImageSelector,
        cardLikeButtonSelector: cardLikeButtonSelector,
        cardDeleteButtonSelector: cardDeleteButtonSelector,
        cardLikeSelector: cardLikeSelector,
        userId: userId
    }).createCard();

    return card;
};

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

profileAvatarBox.addEventListener('click', () => {
    editAvatarFormValidator.clearValidationErrors();
    editAvatarPopup.open();
});

editPopup.setEventListeners();
addPopup.setEventListeners();
imagePopup.setEventListeners();
deletePopup.setEventListeners();
editAvatarPopup.setEventListeners();
addFormValidator.enableValidation();
editFormValidator.enableValidation();
editAvatarFormValidator.enableValidation();

let userId;

Promise.all([api.getInitialCards(), api.getUserInfo()]).then(([initialApiCards, userData]) => {
    const initialCards = [];
    initialApiCards.forEach(item => {
        initialCards.unshift({ name: item.name, link: item.link, likesCount: item.likes.length, likes: item.likes, owner: item.owner._id, id: item._id })
    });
    userId = userData._id;
    cards.renderItems(initialCards);
    userInfo.setUserInfo(userData.name, userData.about);
    userInfo.setUserPic(userData.avatar);
}).catch(err => console.log(err));