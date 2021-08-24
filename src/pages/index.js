import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupDeleteCard from '../components/PopupDeleteCard';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import Api from '../components/Api.js';
import { config, templateSelector, editButton, addButton, popupInputName, popupInputJob, imagePopupSelector, addCardPopupSelector, editProfilePopupSelector, editAvatarPopupSelector, deletePopupSelector, cardListSelector, cardSelector, cardLikeSelector, cardLikeButtonSelector, likeButtonActiveClass, deleteButtonSelector, deleteCardSelector, deleteCardClassSelector, inactiveDeleteButtonSelector, profileNameSelector, profileJobSelector, profileAvatarBox, submitEditSelector, submitAddSelector, submitAvatarSelector } from '../utils/constants.js';
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

const userInfo = new UserInfo({ nameSelector: profileNameSelector, jobSelector: profileJobSelector });

const addPopup = new PopupWithForm({
    popupSelector: addCardPopupSelector,
    handleFormSubmit: (formData) => {
        const cardInfo = {
            name: formData.titleInput,
            link: formData.linkInput,
            likes: [],
            likesCount: 0,
        };
        const button = document.querySelector(submitAddSelector);
        api.getUserId().then(id => {
            cardInfo.owner = id;
            cards.addElement(createCard(cardInfo));
        }).then(() => {
            api.getInitialCards().then(data => { cardInfo.id = data[data.length - 1].id }).catch(err => console.log(err));
        }).catch(err => console.log(err));
        api.addNewCard(formData).then(() => {
            button.textContent += '...';
        }).catch(err => console.log(err)).finally(() => {
            button.textContent = button.textContent.slice(0, -3);
        });
        addPopup.close();
    }
});

const editPopup = new PopupWithForm({
    popupSelector: editProfilePopupSelector,
    handleFormSubmit: (formData) => {
        userInfo.setUserInfo(formData.nameInput, formData.jobInput);
        const button = document.querySelector(submitEditSelector);
        api.setUserInfo(formData).then(() => {
            button.textContent += '...';
        }).catch(err => console.log(err)).finally(() => {
            button.textContent = button.textContent.slice(0, -3);
        });
        editPopup.close();
    }
});

const imagePopup = new PopupWithImage({ popupSelector: imagePopupSelector });

const deletePopup = new PopupDeleteCard({
    popupSelector: deletePopupSelector, handleFormSubmit: () => {
        const card = document.querySelector(deleteCardSelector);
        const deleteCardId = (deletePopup.getCardId());
        api.deleteCard(deleteCardId).catch(err => console.log(err));
        deletePopup.deleteCard(card);
        deletePopup.close();
    }
});

const editAvatarPopup = new PopupWithForm({
    popupSelector: editAvatarPopupSelector, handleFormSubmit: (formData) => {
        const button = document.querySelector(submitAvatarSelector);
        userInfo.setUserPic(formData.linkInput);
        api.setAvatar(formData.linkInput).then(() => {
            button.textContent += '...';
        }).catch(err => console.log(err)).finally(() => {
            button.textContent = button.textContent.slice(0, -3);
        });
        editAvatarPopup.close();
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
        }
        , templateSelector: templateSelector
    }).createCard()

    const deleteButton = card.querySelector(deleteButtonSelector);
    const likeButton = card.querySelector(cardLikeButtonSelector);
    const likeCounter = card.querySelector(cardLikeSelector);
    likeCounter.textContent = +cardItem.likesCount;

    api.getUserId().then(id => {

        function removingLike() {
            api.removeLike(cardItem.id).then(() => {
                api.getInitialCards().then(data => {
                    data.forEach(item => {
                        if (item.id === cardItem.id) {
                            checkLikesStatement(item);
                        };
                    })
                }).catch(err => console.log(err));
            }).catch(err => console.log(err));
            likeCounter.textContent--;
        }

        function addingLike() {
            api.setLike(cardItem.id).then(() => {
                api.getInitialCards().then(data => {
                    data.forEach(item => {
                        if (item.id === cardItem.id) {
                            checkLikesStatement(item);
                        };
                    })
                }).catch(err => console.log(err));;
            }).catch(err => console.log(err));;;
            likeCounter.textContent++;
        };

        function checkLikesStatement(cardItem) {
            const idList = [];
            cardItem.likes.forEach(user => {
                idList.push(user._id)
            });
            if (idList.some(userId => userId === id)) {
                likeButton.classList.add(likeButtonActiveClass);
                likeButton.addEventListener('click', removingLike);
                likeButton.removeEventListener('click', addingLike);
            } else if (!(idList.every(userId => userId == id)) || (idList.length === 0)) {
                likeButton.addEventListener('click', addingLike);
                likeButton.removeEventListener('click', removingLike);
            };
        };

        if (!(cardItem.owner === id)) {
            deleteButton.classList.add(inactiveDeleteButtonSelector);
            deleteButton.setAttribute('disabled', true);
        };

        checkLikesStatement(cardItem);
    }).catch(err => console.log(err));

    deleteButton.addEventListener('click', () => {
        deletePopup.open();
        deletePopup.setCardId(cardItem.id);
        deleteButton.closest(cardSelector).classList.add(deleteCardClassSelector);
    });
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

api.getInitialCards().then(initialCards => cards.renderItems(initialCards)).catch(err => console.log(err));
api.getUserInfo().then(data => {
    userInfo.setUserInfo(data.name, data.about);
    userInfo.setUserPic(data.avatar);
}).catch(err => console.log(err));
