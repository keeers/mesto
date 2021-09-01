import Popup from "./Popup.js";

export default class PopupDeleteCard extends Popup {
    constructor({ popupSelector, deleteCardSelector, deleteCardClassSelector, handleFormSubmit }) {
        super(popupSelector)
        this._handleFormSubmit = handleFormSubmit;
        this._deleteCardSelector = deleteCardSelector;
        this._deleteCardClassSelector = deleteCardClassSelector;
        this._inputList = this._popupElement.querySelectorAll('.popup__input');
        this._container = this._popupElement.querySelector('.popup__container');
    }

    setCardId(cardId) {
        this._cardId = cardId;
    };

    getCardId() {
        return this._cardId;
    };

    deleteCard() {
        this._card.remove();
    };

    close() {
        super.close();
        this._card = document.querySelector(this._deleteCardSelector);
        this._card.classList.remove(this._deleteCardClassSelector);
    };

    setEventListeners() {
        super.setEventListeners();
        this._popupElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit();
        })
    };
}