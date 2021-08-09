export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
        this._popupElement = document.querySelector(this._popupSelector);
        this._closeButton = this._popupElement.querySelector('.popup__close-btn');
    }

    open() {
        this._popupElement.classList.add('popup_is-opened');
    }

    close() {
        this._popupElement.classList.remove('popup_is-opened');
        this._removeClosePopupListeners();
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        };
    }

    _handleCloseOnClick(evt) {
        if (evt.target.classList.contains('popup')) {
            this.close();
        };
    }

    setEventListeners() {
        this._addClosePopupListeners();
        this._closeButton.addEventListener('click', this.close.bind(this));
    };

    _addClosePopupListeners() {
        this._popupElement.addEventListener('click', this._handleCloseOnClick.bind(this));
        document.addEventListener('keydown', this._handleEscClose.bind(this));
    };

    _removeClosePopupListeners() {
        this._popupElement.removeEventListener('click', this._handleCloseOnClick.bind(this));
        document.removeEventListener('keydown', this._handleEscClose.bind(this));
    };
}