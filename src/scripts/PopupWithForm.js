import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor({popupSelector, handleDataViaSubmit}) {
        super(popupSelector);
        this._submitBtn = popupSelector.querySelector('.form__save-btn')
        this._profileForm = document.querySelector('.form_profile')
        this._form = this._popupSelector.querySelector('.form')
        this._handleDataViaSubmit = handleDataViaSubmit
        this._userNameInput = this._popupSelector.querySelector('.form__input_type_name')
        this._userJobInput = this._popupSelector.querySelector('.form__input_type_job')
    }

    _initInput(key) {
        return Array.from(this._form).find((i) => i.name === key);
    }

    setInputValues(initialValues) {
        Object.keys(initialValues).forEach(
            (key) => (this._initInput(key).value = initialValues[key])
        );
    }

    _getInputValues() {
        this._inputFormList = this._popupSelector.querySelectorAll('.form__input')

        const formValues = {};
        this._inputFormList.forEach((input) => {

            formValues[input.name] = input.value

        })
        return formValues;
    }


    close() {
        this._popupSelector.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._closeViaEscapeKey);
    }


    setEventListeners() {
        super.setEventListeners()
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault()
            this._handleDataViaSubmit(this._getInputValues())
            this.close()
        })
    }
}