import { Card, createNewCardElement } from './Сard.js';

import { FormValidator,
  clearErrors,
  removeErrorBorder,
  resetBtnState
} from './FormValidator.js';

const profilePopup = document.querySelector('.profile-popup');
const popupFullSizeImg = document.querySelector('.popup_full-size-image');
const popupAddNewCard = document.querySelector('.popup_add-new-card');
const profileEditBtn = document.querySelector('.profile__edit-btn');
const newCardAddOpenBtn = document.querySelector('.profile__add-btn');

const imgZoom = document.querySelector('.popup__fullsize-img-picture');
const imgZoomTitle = document.querySelector('.popup__fullsize-img-caption');

const popupCloseButtons = document.querySelectorAll('.popup__close');
const overlaysClose = document.querySelectorAll('.popup');

const elementsGallery = document.querySelector('.elements');
const cardElementTemplate = document.querySelector('#element-card').content;

const formSubmitBtn = profilePopup.querySelector('.form__save-btn');
const profileForm = profilePopup.querySelector('.form');
const cardAddSubmitBtn = popupAddNewCard.querySelector('.form_add-new-card');
const userName = document.querySelector('.profile__title');
const userJob = document.querySelector('.profile__subtitle');
const userNameInput = profilePopup.querySelector('.form__input_type_name');
const userJobInput = profilePopup.querySelector('.form__input_type_job');
const cardTitle = popupAddNewCard.querySelector('.form__input_type_title');
const cardLink = popupAddNewCard.querySelector('.form__input_type_link');

const newCardForm = document.querySelector('.form_add-new-card');
const newProfileForm = document.querySelector('.form_profile');

const validateConfig = {
  form: 'form',
  button: '.form__save-btn',
  buttonValid: 'form__save-btn_valid',
  buttonInvalid: 'form__save-btn_invalid',
  formInput: '.form__input',
  inputErrorClass: 'form__input-error-field'
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

//рендер карточек из массива
const renderNewCardFromArray = () => {
  initialCards.forEach((item) => {
    elementsGallery.append(createNewCardElement(item));
  })
}
renderNewCardFromArray()

//валидация форм
const formClassProfileCheckValid = new FormValidator(validateConfig, newProfileForm)
formClassProfileCheckValid.enableValidation()

const formClassNewCardCheckValid = new FormValidator(validateConfig, newCardForm)
formClassNewCardCheckValid.enableValidation()

//функционал добавления карточки через «сохранить»
function handleNewCardViaSubmit(evt) {
  evt.preventDefault();

  const newCard =
  {
    name: cardTitle.value,
    link: cardLink.value
  }
  const card = new Card(newCard, "#element-card", handleCardClick);
  const cardElement = card.generateCardElement();
  elementsGallery.prepend(cardElement);
  closeAddingCard();
 //resetBtnState();
  evt.target.reset();
  //newCardForm.reset()
}

function handleCardClick(name, link) {
  imgZoomTitle.textContent = name;
  imgZoom.src = link;
  imgZoom.alt = name;
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
popupCloseButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
})

//закрытие по оверлею
overlaysClose.forEach((button) => {
  button.addEventListener('mousedown', function closePopupViaOverlay(evt) {
    const popup = button.closest('.popup');
    if (!evt.target.classList.contains('popup')) {
      return
    }
    closePopup(popup);
  })
})

//Закрытие по Esc
function closeViaEscapeKey(evt) {
  if (evt.code === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
}

//открыть добавить карточку
function openAddingCard() {
  //newCardForm.reset()
  clearErrors();

  openPopup(popupAddNewCard);
  //resetBtnState();
  //cardAddSubmitBtn.reset()
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

//  function renderNewCardFromArray(){
//      const card = handleCardElement
//      elementsGallery.append(card);
//  }
//  renderNewCardFromArray()

//добавление карточки
//console.log(handleCardElement)
//const cardElement = handleCardElement
//elementsGallery.append(cardElement);



profileEditBtn.addEventListener('click', openProfileEdit);

newCardAddOpenBtn.addEventListener('click', openAddingCard);

profileForm.addEventListener('submit', handleProfileFormSubmit);
cardAddSubmitBtn.addEventListener('submit', handleNewCardViaSubmit);

export {
  cardElementTemplate,
  validateConfig,
  initialCards,
  handleCardClick,
  elementsGallery
};