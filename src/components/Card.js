export default class Card {
    constructor({ data }, { handleCardClick, handleDeleteClick, cardSelector, deleteCardClassSelector, templateSelector, likeButtonActiveClass, inactiveDeleteButtonClass, cardTitleSelector, cardImageSelector, cardLikeButtonSelector, cardDeleteButtonSelector, cardLikeSelector, userId, api }) {
        this._name = data.name;
        this._src = data.link;
        this._id = userId;
        this._cardItem = data;
        this._api = api;
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

    _toggleLike(evt) {
        evt.target.classList.toggle(this._likeButtonActiveClass);
    };

    _addLike() {
        this._api.addLike(this._cardItem.id).then(() => {
            this._api.getInitialCards().then(data => {
                data.forEach(item => {
                    if (item._id === this._cardItem.id) {
                        this._checkLikesStatement(item);
                    };
                })
            }).catch(err => console.log(err));
            this._likeCounter.textContent++;
        }).catch(err => console.log(err));

    };

    _removeLike() {
        this._api.removeLike(this._cardItem.id).then(() => {
            this._api.getInitialCards().then(data => {
                data.forEach(item => {
                    if (item._id === this._cardItem.id) {
                        this._checkLikesStatement(item);
                    };
                })
            }).catch(err => console.log(err));
            this._likeCounter.textContent--;
        }).catch(err => console.log(err));

    };

    _setCardListeners() {
        this._likeButton.addEventListener('click', (evt) => { this._toggleLike(evt) });
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

    _checkLikesStatement(cardItem) {
        const idList = [];
        cardItem.likes.forEach(user => {
            idList.push(user._id)
        });
        if (idList.some(userId => userId === this._id)) {
            this._likeButton.classList.add(this._likeButtonActiveClass);
            this._likeButton.addEventListener('click', this._removeLike);
            this._likeButton.removeEventListener('click', this._addLike);
        } else if (!(idList.every(userId => userId == this._id)) || (idList.length === 0)) {
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
        this._likeCounter.textContent = +this._cardItem.likesCount;

        this._image.src = this._src;
        this._image.alt = 'На фотографии ' + this._name;
        this._title.textContent = this._name;
        this._setCardListeners();
        this._checkCardOwner();
        this._checkLikesStatement(this._cardItem);

        return this._card;
    };
}
