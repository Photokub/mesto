const forms = {
    form: 'form',
    button: '.form__save-btn',
    buttonValid: 'form__save-btn_valid',
    buttonInvalid: 'form__save-btn_invalid',
    formInput: '.form__input',
    inputErrorClass:'form__input-error-field'
}

function enableValidation(config) {
    const formList = Array.from(document.querySelectorAll('.form'));
    formList.forEach((item) => {item.addEventListener('input', (event) => handleFromInput(event, config))})
}

function handleFromInput(event, config){
    const input = event.target;
    const form = event.currentTarget;

    //1. Показать/скрыть ошибки
    if(!input.validity.valid){
        showFieldError(input);
    } else {
        hideFieldError(input);
    }
    //2. Включить/отключить кнопку отправки формы
    setSubmitButtonState(form, config);
}

function showFieldError(input){
    const span = input.nextElementSibling;
    span.textContent = input.validationMessage;
    input.classList.add(forms.inputErrorClass);
}

function hideFieldError(input){
    const span = input.nextElementSibling;
    span.textContent='';
    input.classList.remove(forms.inputErrorClass)
}

function setSubmitButtonState(form, config){
    const button = form.querySelector(config.button);
    const isValid = form.checkValidity();

    if (isValid) {
        button.removeAttribute('disabled');
        button.classList.remove(config.buttonInvalid);
        button.classList.add(config.buttonValid);
    }else{
        button.setAttribute('disabled', true);
        button.classList.add(config.buttonInvalid);
        button.classList.remove(config.buttonValid);
    }
}

enableValidation(forms)