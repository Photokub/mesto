const forms = {
    form: ".form_add-new-card[name = 'add_new_card']",
    formEditProfile:".form[name='user_data']",
    button: '.form__save-btn',
    buttonValid: 'form__save-btn_valid',
    buttonInvalid: 'form__save-btn_invalid',
    formInput: '.form__input'
}

function enableValidation(config) {
    // 1. Найти форму в документе
    const form = document.querySelector(config.form);
    const formEditProfile = document.querySelector(config.formEditProfile);

    // 2. Установить слушатьль сабмита
    form.addEventListener('submit', handleFormSubmit);
    form.addEventListener('input', (event) => handleFromInput(event, config));

    formEditProfile.addEventListener('submit', handleFormSubmit);
    formEditProfile.addEventListener('input', (event) => handleFromInput(event, config));
}

function handleFormSubmit(event){
    event.preventDefault();    
    const form = event.currentTarget;
    const isValid = form.checkValidity();

    if(isValid) {
        form.reset();
    }
}

function handleFromInput(event, config){
    const input = event.target;
    const form = event.currentTarget;

    //1. Установить кастомные тексты ошибок
    setCustomError(input);
    //2. Показать/скрыть ошибки 
    if(!input.validity.valid){
        showFieldError(input);
    } else {
        hideFieldError(input);
    }
    //3. Включить/отключить кнопку отправки формы
    setSubmitButtonState(form, config);
}

function setCustomError(input){
    const validity = input.validity; 
    input.setCustomValidity('');
}

function showFieldError(input){
    const span = input.nextElementSibling;
    span.textContent = input.validationMessage;
    input.classList.add("form__input_error-field"); 
}

function hideFieldError(input){
    const span = input.nextElementSibling;
    span.textContent='';
    input.classList.remove("form__input_error-field")
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