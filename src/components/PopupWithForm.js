import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor({ popupSelector, handleFormSubmit }) {
        super(popupSelector)
        this._handleFormSubmit = handleFormSubmit;
        this._inputList = this._popupElement.querySelectorAll('.popup__input');
        this._container = this._popupElement.querySelector('.popup__container');
    }

    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        })

        return this._formValues;
    };

    close() {
        super.close();
        this._container.reset();
    };

    setEventListeners() {
        super.setEventListeners();
        this._popupElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        })
    };
}
