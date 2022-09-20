export default class Popup {
    constructor(popupSelector) {
        this._popup = popupSelector;
        this._closeViaEscapeKey = this._closeViaEscapeKey.bind(this);
        this._popupCloseButton = this._popup.querySelector('.popup__close');
    }

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._closeViaEscapeKey);
    };

    close() {
        this._popup.classList.remove('popup_opened');
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
        this._popup.addEventListener('mousedown', (evt) => {
            if (evt.target === this._popup) {
                this.close()
            }
        })
    }
}

