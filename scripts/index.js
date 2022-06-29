const popup = document.querySelector('.popup');
const openPopupBtn = document.querySelector('.profile__edit-btn');
const closePopupBtn = popup.querySelector('.popup__close');

const submitBtn = popup.querySelector('.form__save-btn');
const submitForm = popup.querySelector('.form');
let userName = document.querySelector('.profile__title');
let userJob = document.querySelector('.profile__subtitle');
let userNameInput = popup.querySelector('.form__user-name');
let userJobInput = popup.querySelector('.form__user-job');

const likes = document.querySelectorAll('.element__like');

const openPopupVisibility = function(){
    userNameInput.value = userName.textContent;
    userJobInput.value = userJob.textContent;
    popup.classList.add('popup_is-opened');
};

const closePopupVisibility = function(){
    popup.classList.remove('popup_is-opened');
};

function formSubmit(evt){
    evt.preventDefault();
    userName.textContent = userNameInput.value;
    userJob.textContent = userJobInput.value;
    closePopupVisibility(evt);
}

openPopupBtn.addEventListener('click', openPopupVisibility);
closePopupBtn.addEventListener('click', closePopupVisibility);

submitForm.addEventListener('submit', formSubmit);