import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor({popupSelector, handleDataViaSubmit, api}) {
        super(popupSelector);
        this._submitBtn = popupSelector.querySelector('.form__save-btn')
        this._profileForm = document.querySelector('.form_profile')
        this._form = this._popupSelector.querySelector('.form')
        this._handleDataViaSubmit = handleDataViaSubmit
        this._userNameInput = this._popupSelector.querySelector('.form__input_type_name')
        this._userJobInput = this._popupSelector.querySelector('.form__input_type_job')
        this._inputFormList = this._popupSelector.querySelectorAll('.form__input')
        this._api = api
        this._profileTitle=document.querySelector('.profile__title')
        this._profileSubtitle=document.querySelector('.profile__subtitle')
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
        const formValues = {};
        this._inputFormList.forEach((input) => {

            formValues[input.name] = input.value

        })
        return formValues;
    }

    _saveUserInfo = (data) => {
        this._api
            .patchUserInfo({
                name: data.name,
                about: data.about
            })
            //.then(this.setInputValues(data))
    }

    close() {
        super.close()
        this._profileForm.reset()
    }

    setEventListeners() {
        super.setEventListeners()
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault()
            //this._handleDataViaSubmit(this._saveUserInfo({ name: this._userNameInput.value, about: this._userJobInput.value }))
            this._handleDataViaSubmit(this._getInputValues())
            this._saveUserInfo({ name: this._userNameInput.value, about: this._userJobInput.value })
            this.close()
        })
    }
}