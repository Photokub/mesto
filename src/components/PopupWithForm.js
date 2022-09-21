import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor({popupSelector, handleDataViaSubmit}) {
        super(popupSelector);
        this._submitBtn = popupSelector.querySelector('.form__save-btn')
        this._defaultBtnText = this._submitBtn.textContent;
        this._form = this._popup.querySelector('.form')
        this._handleDataViaSubmit = handleDataViaSubmit
        this._inputFormList = this._popup.querySelectorAll('.form__input')
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

    close() {
        super.close()
    }

    handleSubmitButton({ isLoading }) {
        if (isLoading) {
            this._submitBtn.disabled = true;
            this._submitBtn.classList.add(".form__save-btn_loading");
            this._submitBtn.textContent = "Сохранение...";
        } else {
            this._submitBtn.disabled = false;
            this._submitBtn.classList.remove(".form__save-btn_loading");
            this._submitBtn.textContent = this._defaultBtnText;
        }
    }

    setEventListeners() {
        super.setEventListeners()
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault()            
            this._handleDataViaSubmit(this._getInputValues())
            this.handleSubmitButton({ isLoading: true })
        })
    }
}