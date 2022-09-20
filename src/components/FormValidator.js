export class FormValidator {
    constructor(config, formType) {
        //this._validationData = validationData;
        this._config = config
        this._form = formType
        //this._buttonElement = this._config.button;
        this._inputErrorClass = this._config.inputErrorClass;
        // this._form = validationData.form
        // this._buttonElement = validationData.button;
        // this._inputErrorClass = validationData.inputErrorClass;
        //this._formType = formType;
        this._input = this._config.formInput
        this._formInputError = this._config.formInputError
        // this._input = validationData.formInput
        // this._formInputError = validationData.formInputError
        this._inputErrorList = this._form.querySelectorAll('.form__input-error')
        this._inputList = this._form.querySelectorAll('.form__input')
        this._submitBtn = this._form.querySelector('.form__save-btn')
    }

    enableValidation() {
        this._form.addEventListener('input', (event) => this._handleFromInput(event))
    }

    // enableValidation(config) {
    //     this._formType.addEventListener('input', (event) => this._handleFromInput(event, config))
    // }

    _handleFromInput(event) {
        this._input = event.target;
        //this._form = event.currentTarget;
        //this._buttonElement = this._form.querySelector(this._config.button)

        //1. Показать/скрыть ошибки
        if (!this._input.validity.valid) {
            this._showFieldError(this._input, this._input.validationMessage);
        } else {
            this._hideFieldError(this._input);
        }
        //2. Включить/отключить кнопку отправки формы
        this._setSubmitButtonState();
    }

    _showFieldError(inputElement, errorMessage) {
       // const errorElement = this._form.querySelector(`#${this._input.name}-error`);
        this._spanError = this._form.querySelector(`#${this._input.name}-error`);
        this._spanError.textContent = errorMessage;
       // errorElement.textContent = errorMessage;
        inputElement.classList.add(this._inputErrorClass);
    }

    _hideFieldError(inputElement) {
        this._spanError = this._form.querySelector(`#${this._input.name}-error`);
        this._spanError.textContent = "";
        inputElement.classList.remove(this._inputErrorClass);
    }

    _setSubmitButtonState() {
        //this._button = buttonElement;
        this._isValid = this._form.checkValidity();

        if (this._isValid) {
            this._submitBtn.removeAttribute('disabled');
            this._submitBtn.classList.remove(this._config.buttonInvalid);
            this._submitBtn.classList.add(this._config.buttonValid);
        } else {
            this._submitBtn.setAttribute('disabled', true);
            this._submitBtn.classList.add(this._config.buttonInvalid);
            this._submitBtn.classList.remove(this._config.buttonValid);
        }
    }

//     resetValidation() {
//         this._inputList.forEach((inputListElement) => {
//             this._hideFieldError(inputListElement);
//         })
//         this._submitBtn.classList.remove(this._config.buttonValid)
//         this._submitBtn.classList.add(this._config.buttonInvalid)
//         this._setSubmitButtonState()
//     }
// }

    resetValidation() {
        this._inputErrorList.forEach((inputErrorElement) => {
            inputErrorElement.textContent = '';
            if (inputErrorElement.classList.contains(this._formErroeField)) {
                this._hideFieldError(inputErrorElement)
            }
        })

        this._inputList.forEach((inputListElement) => {
            inputListElement.value = ''
            if (inputListElement.classList.contains(this._inputErrorClass)) {
                inputListElement.classList.remove(this._inputErrorClass)
            }
        })

        this._submitBtn.classList.remove(this._config.buttonValid)
        this._submitBtn.classList.add(this._config.buttonInvalid)
        this._setSubmitButtonState()
    }
}