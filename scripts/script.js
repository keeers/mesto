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

const template = document.querySelector('.template').content;
const editButton = document.querySelector('.profile__edit-btn');
const addButton = document.querySelector('.profile__add-btn');
const popupElements = document.querySelectorAll('.popup');
const popupCloseButtons = document.querySelectorAll('.popup__close-btn');
const popupInputName = document.querySelector('.popup__input_type_name');
const popupInputJob = document.querySelector('.popup__input_type_job');
const popupInputTitle = document.querySelector('.popup__input_type_title');
const popupInputLink = document.querySelector('.popup__input_type_link');
const name = document.querySelector('.profile__name');
const job = document.querySelector('.profile__job');
const popupForms = document.querySelectorAll('.popup__container');
const cards = document.querySelector('.cards');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
const editPopup = document.querySelector('.popup_type_edit-profile');
const addPopup = document.querySelector('.popup_type_add-card');
const viewPopup = document.querySelector('.popup_type_image');


const openPopup = function (popupElement) {
    popupElement.classList.add('popup_is-opened');
}

const choosePopup = function (item) {
    if (item.target === editButton) {
        openPopup(editPopup);
        /* popupInputName.value = name.textContent;
        popupInputJob.value = job.textContent; 
        <--- Это было требование в прошлой проектной работе и ничего про изменения работы данного попапа в новой работе было не сказано --->
        */
    } else if (item.target === addButton) {
        openPopup(addPopup);
    } else openPopup(viewPopup);
}

const closePopup = function (popupElement) {
    popupElement.target.closest('.popup').classList.remove('popup_is-opened');
}

const closeButtons = Array.from(popupCloseButtons);
closeButtons.forEach(function (item) {
    item.addEventListener('click', closePopup);
})

function setCardListeners(card) {
    card.querySelector('.card__like-btn').addEventListener('click', toggleLike);
    card.querySelector('.card__delete-btn').addEventListener('click', deleteCard);
    card.querySelector('.card').addEventListener('click', cardView);
}

function createCard(item) {
    const card = template.cloneNode(true);
    card.querySelector('.card__image').src = item.link;
    card.querySelector('.card__image').alt = 'На фотографии ' + item.name;
    card.querySelector('.card__title').textContent = item.name;

    setCardListeners(card);
    return card;
}

function addCard(item) {
    cards.prepend(createCard(item));

}

function renderCards(items) {
    items.forEach(addCard);
}

function cardView(evt) {
    const card = evt.target.closest('.card');
    popupImage.src = card.querySelector('.card__image').src;
    popupImage.alt = 'На фотографии ' + card.querySelector('.card__title').textContent;
    popupCaption.textContent = card.querySelector('.card__title').textContent;
    if (evt.target === card.querySelector('.card__image')) {
        choosePopup(evt.target);
    }
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
    name.textContent = popupInputName.value;
    job.textContent = popupInputJob.value;
    popupInputName.value = '';
    popupInputJob.value = '';
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

addButton.addEventListener('click', choosePopup);
editButton.addEventListener('click', choosePopup);
addPopup.addEventListener('submit', submitAddCardPopup);
editPopup.addEventListener('submit', submitEditProfilePopup);

renderCards(initialCards);