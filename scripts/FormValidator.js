export class FormValidator{    
    constructor(validationData, formType){
        this._validationData = validationData;
        this._form = validationData.form
        //this._buttonElement = validationData.button;
        this._inputErrorClass = validationData.inputErrorClass;
        this._formType = formType;
        this._input = validationData.formInput
    }

enableValidation(config) {
    this._formType.addEventListener('input', (event) => this._handleFromInput(event, config))
}    

_handleFromInput(event){
    this._input = event.target;
    this._form = event.currentTarget;
    this._buttonElement = this._form.querySelector(this._validationData.button)

    //1. Показать/скрыть ошибки
    if(!this._input.validity.valid){
        this._showFieldError(this._input, this._form);
    } else {
        this._hideFieldError(this._input, this._form);
    }
    //2. Включить/отключить кнопку отправки формы
    this._setSubmitButtonState(this._buttonElement);
}    

_showFieldError(inputElement){
    const errorElement = this._form.querySelector(`#${this._input.name}-error`); 
    errorElement.textContent = this._input.validationMessage;
    inputElement.classList.add(this._inputErrorClass);
}     

_hideFieldError(inputElement){
    const errorElement = this._form.querySelector(`#${this._input.name}-error`);
    errorElement.textContent = '';
    inputElement.classList.remove(this._inputErrorClass);
}

_setSubmitButtonState(buttonElement){
    this._button = buttonElement;   
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

//очистка полей с ошибками
function clearErrors(){
    const inputErrors = document.querySelectorAll('.form__input-error');
    const errorsFields = document.querySelectorAll('.form__input-error-field');
  
    inputErrors.forEach((inputError) => {inputError.textContent=""});
    errorsFields.forEach((field) => {removeErrorBorder(field)})
  }

//функция деактивации красного бордера
function removeErrorBorder(item){
    if(item.classList.contains('form__input-error-field')){
      item.classList.remove('form__input-error-field')
    }
  } 

 export{ clearErrors, removeErrorBorder } 
