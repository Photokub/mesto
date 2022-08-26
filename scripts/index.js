import { Card} from './Сard.js';
import { FormValidator } from './FormValidator.js';
import { initialCards } from './initialCards.js';
import Section from './Section.js'

const profilePopup = document.querySelector('.profile-popup');
const popupFullSizeImg = document.querySelector('.popup_full-size-image');
const popupAddNewCard = document.querySelector('.popup_add-new-card');
const profileEditBtn = document.querySelector('.profile__edit-btn');
const newCardAddOpenBtn = document.querySelector('.profile__add-btn');

const imgZoom = document.querySelector('.popup__fullsize-img-picture');
const imgZoomTitle = document.querySelector('.popup__fullsize-img-caption');

const popupCloseButtons = document.querySelectorAll('.popup__close');
const popupCloseButton = document.querySelector('.popup__close');
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
  formInputError: '.form__input-error',
  inputErrorClass: 'form__input-error-field'
}

//добавление карточек из массива
const cardList = new Section({
  item: initialCards,
  renderer: (item) => {
    const card = new Card(item, handleCardClick)
    const cardElement = card.generateCardElement();
    cardList.addItem(cardElement)
  }
}, elementsGallery)

cardList.renderItems()

//функционал добавления карточки через «сохранить»
function handleNewCardViaSubmit(evt) {
  evt.preventDefault()

  const newCardViaSubmit = new Section({
  item:  [{
    name: cardTitle.value,
    link: cardLink.value
  }],
  renderer: (item) => {
    const card = new Card(item, handleCardClick)
    const cardElement = card.generateCardElement();   
    newCardViaSubmit.addItem(cardElement)
    console.log(cardElement)
    console.log(newCardViaSubmit)    
  }
}, elementsGallery)

  newCardViaSubmit.renderItems()
 // closeAddingCard();
  evt.target.reset();
}

function handleCardClick(name, link) {
  imgZoomTitle.textContent = name;
  imgZoom.src = link;
  imgZoom.alt = name;
 // openPopup(popupFullSizeImg);
}

//валидация форм
const formClassProfileCheckValid = new FormValidator(validateConfig, newProfileForm)
formClassProfileCheckValid.enableValidation()

const formClassNewCardCheckValid = new FormValidator(validateConfig, newCardForm)
formClassNewCardCheckValid.enableValidation()

class Popup{
  constructor(popupSelector){
    this._popupSelector = popupSelector;
   // определить оверлей
  // this._overlay = this._popupSelector.querySelector('.popup')
    this._closeViaEscapeKey = this._closeViaEscapeKey.bind(this)
    this._popupCloseButton = this._popupSelector.querySelector('.popup__close')
  }

  open() {
    this._popupSelector.classList.add('popup_opened');
    document.addEventListener('keydown', this._closeViaEscapeKey);
  };

  close() {
    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._closeViaEscapeKey);
  };

  _closeViaEscapeKey(evt) {
    if (evt.code === 'Escape') {
      this.close();
    }
  }

  setEventListeners(){
    this._popupCloseButton.addEventListener('click', () => {this.close()});
    this._popupSelector.addEventListener('click', () => {this.close()})
  }
}

class PopupWithForm extends Popup {
  constructor(popupSelector, handleNewCardViaSubmit){
    super(popupSelector);
    super.setEventListeners()
    this._handleNewCardViaSubmit = handleNewCardViaSubmit
  }
}

const popupWithForm = new PopupWithForm(popupAddNewCard, handleNewCardViaSubmit)


console.log(popupWithForm)



//функционал открытия попапа
// const openPopup = function (item) {
//   item.classList.add('popup_opened');
//   document.addEventListener('keydown', closeViaEscapeKey);
// };

//функционал закрытия попапа
// const closePopup = function (item) {
//   item.classList.remove('popup_opened');
//   document.removeEventListener('keydown', closeViaEscapeKey);
// };

//выборка навешивание слушателя для каждого крестика
// popupCloseButtons.forEach((button) => {
//   const popup = button.closest('.popup');
//   button.addEventListener('click', () => closePopup(popup));
// })

//закрытие по оверлею
// overlaysClose.forEach((button) => {
//   button.addEventListener('mousedown', function closePopupViaOverlay(evt) {
//     const popup = button.closest('.popup');
//     if (!evt.target.classList.contains('popup')) {
//       return
//     }
//     closePopup(popup);
//   })
// })

//Закрытие по Esc
// function closeViaEscapeKey(evt) {
//   if (evt.code === 'Escape') {
//     closePopup(document.querySelector('.popup_opened'));
//   }
// }

//открыть добавить карточку
// function openAddingCard() {
//   formClassNewCardCheckValid.resetValidation();
//   openPopup(popupAddNewCard);
// };

//закрыть добавить карточку
// function closeAddingCard() {
//   closePopup(popupAddNewCard);
// };

//открыть редактировать профиль
// function openProfileEdit(evt) {
//   formClassProfileCheckValid.resetValidation()
//   userNameInput.value = userName.textContent;
//   userJobInput.value = userJob.textContent;
//   openPopup(profilePopup);
// };

//закрыть редактировать профиль
// function closeProfileEdit() {
//   closePopup(profilePopup);
// };

//открыть большую картинку
// function openFullSizeImg() {
//   openPopup(popupFullSizeImg);
// };

//закрыть большую картинку
// function closeFullSizeImg() {
//   closePopup(popupFullSizeImg);
// };

//функционал кнопки «сохранить» в редактировании профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  userName.textContent = userNameInput.value;
  userJob.textContent = userJobInput.value;
  closeProfileEdit();
}

//profileEditBtn.addEventListener('click', openProfileEdit);

newCardAddOpenBtn.addEventListener('click', () => {popupWithForm.open()});

profileForm.addEventListener('submit', handleProfileFormSubmit);
cardAddSubmitBtn.addEventListener('submit', handleNewCardViaSubmit);

export {
  cardElementTemplate,
  validateConfig,  
};