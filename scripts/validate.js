const formsAndInputs = {
    form: ".form_add-new-card[name = 'add_new_card']"
}

function enableValidation(config) {
    // 1. Найти форму в документе
    const form = document.querySelector(config.form)
    console.log(form)
    // 2. Установить слушатьль сабмита
    form.addEventListener('submit', handleFormSubmit);
    form.addEventListener('input', handleFromInput);
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

function handleFromInput(event){
    const input = event.target;
    const form = event.currentTarget;

    //1. Установить кастомные тексты ошибок
    setCustomError(input);
    //2. Показать ошибки в контейнере под полем
    showFieldError(input);
    //3. Включить/отключить кнопку отправки формы
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

enableValidation(formsAndInputs)