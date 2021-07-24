import openPopup from './index.js'

export default class Card {
    constructor(data, templateSelector) {
        this._name = data.name;
        this._src = data.link;
        this._templateSelector = templateSelector;
    };

    _getTemplate() {
        const cardElement = document.querySelector(this._templateSelector).content.cloneNode(true);
        return cardElement;
    };

    _openImagePopup() {
        const popupImage = document.querySelector('.popup__image');
        const popupCaption = document.querySelector('.popup__caption');
        const imagePopup = document.querySelector('.popup_type_image');
        popupImage.src = this._image.src;
        popupImage.alt = 'На фотографии ' + this._title.textContent;
        popupCaption.textContent = this._title.textContent;

        openPopup(imagePopup);
    };

    _toggleLike(evt) {
        evt.target.classList.toggle('card__like-btn_is-active');
    };

    _deleteCard(evt) {
        const card = evt.target.closest('.card');
        card.remove();
    };

    _setCardListeners() {
        this._card.querySelector('.card__like-btn').addEventListener('click', (evt) => { this._toggleLike(evt) });
        this._card.querySelector('.card__delete-btn').addEventListener('click', (evt) => { this._deleteCard(evt) });
        this._card.querySelector('.card__image').addEventListener('click', () => { this._openImagePopup() });
    };

    _createCard() {
        this._card = this._getTemplate();
        this._image = this._card.querySelector('.card__image');
        this._title = this._card.querySelector('.card__title');

        this._image.src = this._src;
        this._image.alt = 'На фотографии ' + this._name;
        this._title.textContent = this._name;

        this._setCardListeners();
        return this._card;
    };

    addCard() {
        const cards = document.querySelector('.cards');
        cards.prepend(this._createCard());
    };
};



