export class FormValidator {
    constructor(validationData, formType) {
        this._validationData = validationData;
        this._form = validationData.form
        this._buttonElement = validationData.button;
        this._inputErrorClass = validationData.inputErrorClass;
        this._formType = formType;
        this._input = validationData.formInput
    }

    enableValidation(config) {
        this._formType.addEventListener('input', (event) => this._handleFromInput(event, config))
    }

    _handleFromInput(event) {
        this._input = event.target;
        this._form = event.currentTarget;
        this._buttonElement = this._form.querySelector(this._validationData.button)

        //1. Показать/скрыть ошибки
        if (!this._input.validity.valid) {
            this._showFieldError(this._input, this._input.validationMessage);
        } else {
            this._hideFieldError(this._input);
        }
        //2. Включить/отключить кнопку отправки формы
        this._setSubmitButtonState(this._buttonElement);
    }

    _showFieldError(inputElement, errorMessage) {
        const errorElement = this._form.querySelector(`#${this._input.name}-error`);
        errorElement.textContent = errorMessage;
        inputElement.classList.add(this._inputErrorClass);
    }

    _hideFieldError(inputElement) {
        const errorElement = this._form.querySelector(`#${this._input.name}-error`);
        errorElement.textContent = '';
        inputElement.classList.remove(this._inputErrorClass);
    }

    _setSubmitButtonState(buttonElement) {
        this._button = buttonElement;
        this._isValid = this._form.checkValidity();

        if (this._isValid) {
            this._button.removeAttribute('disabled');
            this._button.classList.remove(this._validationData.buttonInvalid);
            this._button.classList.add(this._validationData.buttonValid);
        } else {
            this._button.setAttribute('disabled', true);
            this._button.classList.add(this._validationData.buttonInvalid);
            this._button.classList.remove(this._validationData.buttonValid);
        }
    }

    resetValidation() {
        this._inputErrorList = this._formType.querySelectorAll('.form__input-error')
        this._inputList = this._formType.querySelectorAll('.form__input')
        this._submitBtn = this._formType.querySelector('.form__save-btn')

        this._inputErrorList.forEach((inputErrorElement) => {
            inputErrorElement.textContent = '';
            if (inputErrorElement.classList.contains('form__input-error-field')) {
                this._hideFieldError(inputErrorElement)
            }
        })

        this._inputList.forEach((inputListElement) => {
            inputListElement.value = ''
            if (inputListElement.classList.contains('form__input-error-field')) {
                inputListElement.classList.remove('form__input-error-field')
            }
        })

        this._submitBtn.classList.remove('form__save-btn_valid')
        this._submitBtn.classList.add('form__save-btn_invalid')
        this._submitBtn.setAttribute('disabled', true)

    }
}