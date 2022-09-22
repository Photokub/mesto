import Popup from "./Popup.js";

export default class PopupConfirm extends Popup {
    constructor(popupselector) {
        super(popupselector);
        this._confirmBtn = document.querySelector(`.${popupselector}`).querySelector('.popup__confirm-delete-button')
    }

    submitHandler(submitAction) {
        this._handleSubmit = submitAction;
    }

    close() {
        super.close()
    }

    setEventListeners() {
        super.setEventListeners();
        this._confirmBtn.addEventListener('click', () => {
            this._handleSubmit()
        })
    }
}