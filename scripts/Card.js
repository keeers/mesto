export default class Card {
    constructor({ name, link, handleCardClick, templateSelector }) {
        this._name = name;
        this._src = link;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
    };

    _getTemplate() {
        const cardElement = document.querySelector(this._templateSelector).content.cloneNode(true);
        return cardElement;
    };

    _openImagePopup() {
        this._handleCardClick();
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

    createCard() {
        this._card = this._getTemplate();
        this._image = this._card.querySelector('.card__image');
        this._title = this._card.querySelector('.card__title');

        this._image.src = this._src;
        this._image.alt = 'На фотографии ' + this._name;
        this._title.textContent = this._name;

        this._setCardListeners();
        return this._card;
    };
};



