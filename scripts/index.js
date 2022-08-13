 import {Card} from './Сard.js';
 import {FormValidator} from './FormValidator.js';

const profilePopup = document.querySelector('.profile-popup');
const popupFullSizeImg = document.querySelector('.popup_full-size-image');
const popupAddNewCard = document.querySelector('.popup_add-new-card');
const editProfileBtn = document.querySelector('.profile__edit-btn');
const openAddNewCardBtn = document.querySelector('.profile__add-btn');

const fullSizeImg = document.querySelector('.popup__fullsize-img-picture');
const fullSizeImgTitle = document.querySelector('.popup__fullsize-img-caption');

const closeButtons = document.querySelectorAll('.popup__close');
const closeOverlays = document.querySelectorAll('.popup');

const elementsGallery = document.querySelector('.elements');
const cardElementTemplate = document.querySelector('#element-card').content;

const submitBtn = profilePopup.querySelector('.form__save-btn');
const profileForm = profilePopup.querySelector('.form');
const submitAddCard = popupAddNewCard.querySelector('.form_add-new-card');
const userName = document.querySelector('.profile__title');
const userJob = document.querySelector('.profile__subtitle');
const userNameInput = profilePopup.querySelector('.form__input_type_name');
const userJobInput = profilePopup.querySelector('.form__input_type_job');
const cardTitle = popupAddNewCard.querySelector('.form__input_type_title');
const cardLink = popupAddNewCard.querySelector('.form__input_type_link');

const validateConfig = {
  form: 'form',
  button: '.form__save-btn',
  buttonValid: 'form__save-btn_valid',
  buttonInvalid: 'form__save-btn_invalid',
  formInput: '.form__input',
  inputErrorClass:'form__input-error-field'
}

const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//валидация форм
const formClassCheckValid = new FormValidator(validateConfig)
formClassCheckValid.enableValidation()

//функционал добавления карточки через «сохранить»
function handleNewCardViaSubmit(evt) {
  evt.preventDefault();

  const newCard =
      {
        name: cardTitle.value,
        link: cardLink.value
      }
  const card = new Card (newCard, "#element-card",handleCardClick);
  const cardElement = card.generateCardElement();
  elementsGallery.prepend(cardElement);
  closeAddingCard();
  evt.target.reset()
}

function handleCardClick(name, link){
  fullSizeImgTitle.textContent = name;
  fullSizeImg.src = link;
  fullSizeImg.alt = name;
  openPopup(popupFullSizeImg);
}

//функционал открытия попапа
const openPopup = function (item) {
  item.classList.add('popup_opened');
  document.addEventListener('keydown', closeViaEscapeKey);
};

//функционал закрытия попапа
const closePopup = function (item) {
  item.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeViaEscapeKey);
};

//выборка навешивание слушателя для каждого крестика
closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
})

//закрытие по оверлею
closeOverlays.forEach((button) => {button.addEventListener('mousedown', function closePopupViaOverlay(evt){
  const popup = button.closest('.popup');
  if(!evt.target.classList.contains('popup')){
    return
  }
  closePopup(popup);
 })
})

//Закрытие по Esc
function closeViaEscapeKey(evt){
  if(evt.code === 'Escape'){
    closePopup(document.querySelector('.popup_opened'));
  }
}

//очистка полей с ошибками
function clearErrors(){
  const inputErrors = document.querySelectorAll('.form__input-error');
  const errorsFields = document.querySelectorAll('.form__input-error-field');

  inputErrors.forEach((inputError) => {inputError.textContent=""});
  errorsFields.forEach((field) => {removeErrorBorder(field)})
}

//открыть добавить карточку
function openAddingCard() {
  clearErrors();
  openPopup(popupAddNewCard);
  submitAddCard.reset()
};

//закрыть добавить карточку
function closeAddingCard() {
  closePopup(popupAddNewCard);
};

//открыть редактировать профиль
function openProfileEdit(evt) {
  clearErrors();
  userNameInput.value = userName.textContent;
  userJobInput.value = userJob.textContent;  
  openPopup(profilePopup);
};

//закрыть редактировать профиль
function closeProfileEdit() {
  closePopup(profilePopup);
};

//открыть большую картинку
function openFullSizeImg() {
  openPopup(popupFullSizeImg);
};

//закрыть большую картинку
function closeFullSizeImg() {
  closePopup(popupFullSizeImg);
};

//функционал кнопки «сохранить» в редактировании профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  userName.textContent = userNameInput.value;
  userJob.textContent = userJobInput.value;
  closeProfileEdit();
}

//функция деактивации красного бордера
function removeErrorBorder(item){
  if(item.classList.contains('form__input-error-field')){
    item.classList.remove('form__input-error-field')
  }
}

editProfileBtn.addEventListener('click', openProfileEdit);

openAddNewCardBtn.addEventListener('click', openAddingCard);

profileForm.addEventListener('submit', handleProfileFormSubmit);
submitAddCard.addEventListener('submit', handleNewCardViaSubmit);

export {
  elementsGallery,
  cardElementTemplate,
  validateConfig,
  initialCards,
  handleCardClick,  
};