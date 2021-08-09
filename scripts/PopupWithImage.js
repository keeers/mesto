import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector, { name, src }) {
        super(popupSelector);
        this._name = name;
        this._src = src;
    }

    open() {
        super.open();
        this._popupImage = this._popupElement.querySelector('.popup__image');
        this._popupCaption = this._popupElement.querySelector('.popup__caption');
        this._popupImage.src = this._src;
        this._popupImage.alt = 'На фотографии ' + this._name;
        this._popupCaption.textContent = this._name;
    }
}