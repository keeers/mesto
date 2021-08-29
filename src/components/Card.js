export default class Card {
    constructor({ data }, { handleCardClick, handleDeleteClick, handleAddLike, handleRemoveLike, cardSelector, deleteCardClassSelector, templateSelector, likeButtonActiveClass, inactiveDeleteButtonClass, cardTitleSelector, cardImageSelector, cardLikeButtonSelector, cardDeleteButtonSelector, cardLikeSelector, userId }) {
        this._name = data.name;
        this._src = data.link;
        this._id = userId;
        this._cardItem = data;
        this._cardSelector = cardSelector;
        this._templateSelector = templateSelector;
        this._deleteCardClassSelector = deleteCardClassSelector;
        this._inactiveDeleteButtonClass = inactiveDeleteButtonClass;
        this._likeButtonActiveClass = likeButtonActiveClass;
        this._cardLikeSelector = cardLikeSelector;
        this._cardTitleSelector = cardTitleSelector;
        this._cardImageSelector = cardImageSelector;
        this._cardDeleteButtonSelector = cardDeleteButtonSelector;
        this._cardLikeButtonSelector = cardLikeButtonSelector;
        this._handleCardClick = handleCardClick;
        this._handleDeleteClick = handleDeleteClick;
        this._handleAddLike = handleAddLike;
        this._handleRemoveLike = handleRemoveLike;
        this._addLike = this._addLike.bind(this);
        this._removeLike = this._removeLike.bind(this);
    };

    _getTemplate() {
        const cardElement = document.querySelector(this._templateSelector).content.cloneNode(true);
        return cardElement;
    };

    _openImagePopup() {
        this._handleCardClick();
    };

    _addLike() {
        this._handleAddLike();
    };

    _removeLike() {
        this._handleRemoveLike();
    };

    _setCardListeners() {
        this._image.addEventListener('click', () => { this._openImagePopup() });
        this._deleteButton.addEventListener('click', () => {
            this._handleDeleteClick();
            this._deleteButton.closest(this._cardSelector).classList.add(this._deleteCardClassSelector);
        })
    };

    _checkCardOwner() {
        if (!(this._cardItem.owner === this._id)) {
            this._deleteButton.classList.add(this._inactiveDeleteButtonClass);
            this._deleteButton.setAttribute('disabled', true);
        };
    };

    updateLikesInfo(cardItem) {
        this._idList = [];
        cardItem.likes.forEach(user => {
            this._idList.push(user._id)
        });
        this._likeCounter.textContent = cardItem.likes.length;
        if (this._idList.some(userId => userId === this._id)) {
            this._likeButton.classList.add(this._likeButtonActiveClass);
            this._likeButton.addEventListener('click', this._removeLike);
            this._likeButton.removeEventListener('click', this._addLike);
        } else if (!(this._idList.every(userId => userId == this._id)) || (this._idList.length === 0)) {
            this._likeButton.classList.remove(this._likeButtonActiveClass);
            this._likeButton.addEventListener('click', this._addLike);
            this._likeButton.removeEventListener('click', this._removeLike);
        };
    };

    createCard() {
        this._card = this._getTemplate();
        this._image = this._card.querySelector(this._cardImageSelector);
        this._title = this._card.querySelector(this._cardTitleSelector);
        this._likeButton = this._card.querySelector(this._cardLikeButtonSelector);
        this._deleteButton = this._card.querySelector(this._cardDeleteButtonSelector);
        this._likeCounter = this._card.querySelector(this._cardLikeSelector);

        this._image.src = this._src;
        this._image.alt = 'На фотографии ' + this._name;
        this._title.textContent = this._name;
        this._setCardListeners();
        this._checkCardOwner();
        this.updateLikesInfo(this._cardItem);

        return this._card;
    };
}
