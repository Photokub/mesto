export class FormValidator{    
    constructor(validationData){
        this._validationData  = validationData;
    }

enableValidation(config) {
    const formList = Array.from(document.querySelectorAll(this._validationData.form));
    formList.forEach((item) => {item.addEventListener('input', (event) => this._handleFromInput(event, config))})
}    

_handleFromInput(event, config){
    this._input = event.target;
    this._form = event.currentTarget;

    //1. Показать/скрыть ошибки
    if(!this._input.validity.valid){
        this._showFieldError(this._input, this._form);
    } else {
        this._hideFieldError(this._input, this._form);
    }
    //2. Включить/отключить кнопку отправки формы
    this._setSubmitButtonState(this._form, config);
}    

_showFieldError(input, form){
    this._span = this._form.querySelector(`#${this._input.name}-error`);
    this._span.textContent = this._input.validationMessage;
}    
    
_hideFieldError(input, form){
    this._span = this._form.querySelector(`#${this._input.name}-error`);
    this._span.textContent='';
}

_setSubmitButtonState(form, config){
    this._button = this._form.querySelector(this._validationData.button);   
    this._isValid = this._form.checkValidity();

    if (this._isValid) {
        this._button.removeAttribute('disabled');
        this._button.classList.remove(this._validationData.buttonInvalid);
        this._button.classList.add(this._validationData.buttonValid);
    }else{
        this._button.setAttribute('disabled', true);
        this._button.classList.add(this._validationData.buttonInvalid);
        this._button.classList.remove(this._validationData.buttonValid);
    }
}
}
