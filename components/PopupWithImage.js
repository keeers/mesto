import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor({ popupSelector }) {
        super(popupSelector);
        this._popupImage = this._popupElement.querySelector('.popup__image');
        this._popupCaption = this._popupElement.querySelector('.popup__caption');
    }

    open(name, src) {
        super.open();
        this._popupImage.src = src;
        this._popupImage.alt = 'На фотографии ' + name;
        this._popupCaption.textContent = name;
    }
}