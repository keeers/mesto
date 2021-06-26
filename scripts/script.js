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




const openPopup = function (evt) {
    if (evt.target == editButton) {
        const popupElement = popupElements[0];
        popupInputName.value = name.textContent;
        popupInputJob.value = job.textContent;
        popupElement.classList.add('popup_is-opened');
    } else if (evt.target == addButton) {
        const popupElement = popupElements[1];
        popupElement.classList.add('popup_is-opened');
    } else {
        const popupElement = popupElements[2];
        popupElement.classList.add('popup_is-opened');
    }

}

const savePopup = function (evt) {
    evt.preventDefault();
    const popupElement = evt.target.closest('.popup');
    if (popupElement == popupElements[0]) {
        name.textContent = popupInputName.value;
        job.textContent = popupInputJob.value;
    } else if (popupElement == popupElements[1]) {
        const card = template.cloneNode(true);
        card.querySelector('.card__image').src = popupInputLink.value;
        card.querySelector('.card__title').textContent = popupInputTitle.value;

        setEventListeners(card);
        cards.prepend(card);
    }

    popupElement.classList.remove('popup_is-opened');
}


const closePopup = function (evt) {
    const popupElement = evt.target.closest('.popup');
    popupElement.classList.remove('popup_is-opened');
}


arrCloseButtons = Array.from(popupCloseButtons);
arrCloseButtons.forEach(function (item) {
    item.addEventListener('click', closePopup);
})

arrPopupForms = Array.from(popupForms);
arrPopupForms.forEach(function (item) {
    item.addEventListener('submit', savePopup);
})

function setEventListeners(card) {
    card.querySelector('.card__like-btn').addEventListener('click', cardLike);
    card.querySelector('.card__delete-btn').addEventListener('click', cardDelete);
    card.querySelector('.card').addEventListener('click', cardView);
}

function renderCard(item) {
    const card = template.cloneNode(true);
    card.querySelector('.card__image').src = item.link;
    card.querySelector('.card__title').textContent = item.name;

    setEventListeners(card);
    cards.prepend(card);
}

function renderCards(items) {
    items.forEach(renderCard);
}

function cardView(evt) {
    const card = evt.target.closest('.card');
    popupImage.src = card.querySelector('.card__image').src;
    popupCaption.textContent = card.querySelector('.card__title').textContent;
    if (evt.target == card.querySelector('.card__image')) {
        openPopup(evt.target);
    }
}

function cardLike(evt) {
    const likeButton = evt.target.closest('.card__like-btn');
    likeButton.classList.toggle('card__like-btn_is-active');
}

function cardDelete(evt) {
    const card = evt.target.closest('.card');
    card.remove();
}

function cardCreate() {
    const card = template.cloneNode(true);
    card.querySelector('.card__image').src = popupInputLink.value;
    card.querySelector('.card__title').textContent = popupInputName.value;

    setEventListeners(card);
    cards.append(card);
}

addButton.addEventListener('click', openPopup);
editButton.addEventListener('click', openPopup);


renderCards(initialCards);