import Popup from "./Popup.js";

export default class PopupDeleteCard extends Popup {
    constructor({ popupSelector, handleFormSubmit }) {
        super(popupSelector)
        this._handleFormSubmit = handleFormSubmit;
        this._inputList = this._popupElement.querySelectorAll('.popup__input');
        this._container = this._popupElement.querySelector('.popup__container');
    }

    setCardId(cardId) {
        this._cardId = cardId;
    }

    getCardId() {
        return this._cardId;
    }

    deleteCard(card) {
        card.remove();
    };

    setEventListeners() {
        super.setEventListeners();
        this._popupElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit();
        })
    }
}