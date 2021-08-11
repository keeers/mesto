export const initialCards = [
    {
        name: 'Сочи',
        link: '../images/polyana.jpg'
    },
    {
        name: 'Казань',
        link: '../images/kazan.jpg'
    },
    {
        name: 'Нижний Новгород',
        link: '../images/nizhniy.jpg'
    },
    {
        name: 'Иваново',
        link: '../images/ivanovo.jpg'
    },
    {
        name: 'Москва',
        link: '../images/metro.jpg'
    },
    {
        name: 'Калининград',
        link: '../images/kaliningrad.jpg'
    }
];


export const config = {
    formSelector: '.popup__container',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-btn',
    inactiveButtonClass: 'popup__save-btn_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
};

export const templateSelector = '.template';
export const editButton = document.querySelector('.profile__edit-btn');
export const addButton = document.querySelector('.profile__add-btn');
export const popupInputName = document.querySelector('.popup__input_type_name');
export const popupInputJob = document.querySelector('.popup__input_type_job');
export const imagePopupSelector = '.popup_type_image';
export const addCardPopupSelector = '.popup_type_add-card';
export const editProfilePopupSelector = '.popup_type_edit-profile';
export const cardListSelector = '.cards';
export const profileNameSelector = '.profile__name';
export const profileJobSelector = '.profile__job';