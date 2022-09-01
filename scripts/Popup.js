import {newProfileForm} from "../utils/constants.js";

export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
        this._overlay = this._popupSelector;
        this._closeViaEscapeKey = this._closeViaEscapeKey.bind(this)
        this._popupCloseButton = this._popupSelector.querySelector('.popup__close')
        this._profileForm = newProfileForm
    }

    open() {
        this._profileForm.reset()
        this._popupSelector.classList.add('popup_opened');
        document.addEventListener('keydown', this._closeViaEscapeKey);
    };

    close() {
        this._popupSelector.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._closeViaEscapeKey);
    };

    _closeViaEscapeKey(evt) {
        if (evt.code === 'Escape') {
            this.close();
        }
    }

    setEventListeners() {
        this._popupCloseButton.addEventListener('click', () => {
            this.close()
        });
        this._overlay.addEventListener('mousedown', (evt) => {
            if (evt.target === this._overlay) {
                this.close()
            }
        })
    }
}

