const initialCards = [
    {
        name: 'Сочи',
        link: './images/polyana.jpg'
    },
    {
        name: 'Казань',
        link: './images/kazan.jpg'
    },
    {
        name: 'Нижний Новгород',
        link: './images/nizhniy.jpg'
    },
    {
        name: 'Иваново',
        link: './images/ivanovo.jpg'
    },
    {
        name: 'Москва',
        link: './images/metro.jpg'
    },
    {
        name: 'Калининград',
        link: './images/kaliningrad.jpg'
    }
];

const cardTemplate = document.querySelector('.template').content;
const editButton = document.querySelector('.profile__edit-btn');
const addButton = document.querySelector('.profile__add-btn');
const popupElements = document.querySelectorAll('.popup');
const popupCloseButtons = document.querySelectorAll('.popup__close-btn');
const popupInputName = document.querySelector('.popup__input_type_name');
const popupInputJob = document.querySelector('.popup__input_type_job');
const popupInputTitle = document.querySelector('.popup__input_type_title');
const popupInputLink = document.querySelector('.popup__input_type_link');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const cards = document.querySelector('.cards');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
const editPopup = document.querySelector('.popup_type_edit-profile');
const addPopup = document.querySelector('.popup_type_add-card');
const imagePopup = document.querySelector('.popup_type_image');


const openPopup = function (popupElement) {
    popupElement.classList.add('popup_is-opened');
}

const closePopup = function (evt) {
    evt.target.closest('.popup').classList.remove('popup_is-opened');
}

const closeButtons = Array.from(popupCloseButtons);
closeButtons.forEach(function (item) {
    item.addEventListener('click', closePopup);
})

function setCardListeners(card) {
    card.querySelector('.card__like-btn').addEventListener('click', toggleLike);
    card.querySelector('.card__delete-btn').addEventListener('click', deleteCard);
    card.querySelector('.card__image').addEventListener('click', openImagePopup);
}

function createCard(item) {
    const card = cardTemplate.cloneNode(true);
    const image = card.querySelector('.card__image');
    const title = card.querySelector('.card__title');
    image.src = item.link;
    image.alt = 'На фотографии ' + item.name;
    title.textContent = item.name;

    setCardListeners(card);
    return card;
}

function addCard(item) {
    cards.prepend(createCard(item));
}

function renderCards(items) {
    items.forEach(addCard);
}

function openImagePopup(evt) {
    const card = evt.target.closest('.card');
    const image = card.querySelector('.card__image');
    const title = card.querySelector('.card__title');
    popupImage.src = image.src;
    popupImage.alt = 'На фотографии ' + title.textContent;
    popupCaption.textContent = title.textContent;
    openPopup(imagePopup);
}

function toggleLike(evt) {
    const likeButton = evt.target.closest('.card__like-btn');
    likeButton.classList.toggle('card__like-btn_is-active');
}

function deleteCard(evt) {
    const card = evt.target.closest('.card');
    card.remove();
}

const submitEditProfilePopup = function (evt) {
    evt.preventDefault();
    profileName.textContent = popupInputName.value;
    profileJob.textContent = popupInputJob.value;
    closePopup(evt);
}

const submitAddCardPopup = function (evt) {
    evt.preventDefault();
    const newCard = {
        name: popupInputTitle.value,
        link: popupInputLink.value
    };
    addCard(newCard);
    closePopup(evt);
}

addButton.addEventListener('click', () => {
    popupInputTitle.value = '';
    popupInputLink.value = '';
    openPopup(addPopup);
});

editButton.addEventListener('click', () => {
    popupInputName.value = profileName.textContent;
    popupInputJob.value = profileJob.textContent;
    openPopup(editPopup)
});

addPopup.addEventListener('submit', submitAddCardPopup);
editPopup.addEventListener('submit', submitEditProfilePopup);

renderCards(initialCards);