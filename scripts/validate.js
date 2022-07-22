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
    console.log(form)
    const formEditProfile = document.querySelector(config.formEditProfile);
    console.log(formEditProfile)
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
        alert('форма валидна');
        form.reset();
    }else{
        alert('форма НЕ валидна');
    }
}

function handleFromInput(event, config){
    const input = event.target;
    const form = event.currentTarget;

    //1. Установить кастомные тексты ошибок
    setCustomError(input);
    //2. Показать ошибки в контейнере под полем
    showFieldError(input);
    //3. Включить/отключить кнопку отправки формы
    setSubmitButtonState(form, config);
}

function setCustomError(input){
    const validity = input.validity; 
    input.setCustomValidity('');

    if(validity.tooShort){
        input.setCustomValidity('Введите минимум 3 символа!')
    } if (validity.tooLong){
        input.setCustomValidity('Достигнут лимит символов!')
    }
}

function showFieldError(input){
    const span = input.nextElementSibling;
    span.textContent = input.validationMessage;
}

function hideFieldError(input){
    const span = input.nextElementSibling;
    span.textContent='';
}

funuction checkValidity(input) = {
    if(input.validity.valid){
        hideFieldError(input)
    }
}

// const formElement = document.querySelector('.form');
// const formInput = formElement.querySelector('.form__input');
// const formError = formElement.querySelector(`.${formInput.id}-error`);

// const checkInputValidity = () => {
//     if (!formInput.validity.valid) {
//       showError(formInput, formInput.validationMessage);
//     } else {
//       hideError(formInput);
//     }
//   };

function setSubmitButtonState(form, config){
    const button = form.querySelector(config.button);
    const isValid = form.checkValidity();
    console.log(button)    

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