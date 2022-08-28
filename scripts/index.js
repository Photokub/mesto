import {Card} from './Сard.js';
import {FormValidator} from './FormValidator.js';
import {initialCards} from './initialCards.js';
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
function handleNewCardViaSubmit() {

    const newCardViaSubmit = new Section({
        item: [{
            name: cardTitle.value,
            link: cardLink.value
        }],
        renderer: (item) => {
            const card = new Card(item, handleCardClick)
            const cardElement = card.generateCardElement();
            newCardViaSubmit.addItem(cardElement);
        }
    }, elementsGallery)

    newCardViaSubmit.renderItems()

    //evt.target.reset();
}

function handleCardClick(name, link) {
    imgZoomTitle.textContent = name;
    imgZoom.src = link;
    imgZoom.alt = name;
    // openPopup(popupFullSizeImg);
}

//функционал кнопки «сохранить» в редактировании профиля
function handleProfileFormSubmit() {
    //evt.preventDefault();
    // userName.textContent = userNameInput.value;
    // userJob.textContent = userJobInput.value;
    //closeProfileEdit();

    userData.setUserInfo()
}

//валидация форм
const formClassProfileCheckValid = new FormValidator(validateConfig, newProfileForm)
formClassProfileCheckValid.enableValidation()

const formClassNewCardCheckValid = new FormValidator(validateConfig, newCardForm)
formClassNewCardCheckValid.enableValidation()

class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
        this._overlay = this._popupSelector.closest('.popup')
        this._closeViaEscapeKey = this._closeViaEscapeKey.bind(this)
        this._popupCloseButton = this._popupSelector.querySelector('.popup__close')
        this._profileForm = popupSelector.querySelector('.form')
    }

    open() {
        this._profileForm.reset()
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

    setEventListeners() {
        this._popupCloseButton.addEventListener('click', () => {
            this.close()
        });
        this._overlay.addEventListener('mousedown', (evt) => {
            if (evt.target === this._overlay) {
                this.close()
            }
        })
    }
}

class PopupWithForm extends Popup {
    constructor(popupSelector, handleDataViaSubmit) {
        super(popupSelector);
        this._submitBtn = popupSelector.querySelector('.form__save-btn')
        this._profileForm = popupSelector.querySelector('.form')
        this._inputFormList = this._profileForm.querySelectorAll('.form__input')
        this._handleDataViaSubmit = handleDataViaSubmit
    }

    _getInputValues() {
        this._inputFormList.forEach((input) => {
            this._inputValues = input.value
        })
        return this._inputValues;
    }

    close(evt) {
        this._popupSelector.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._closeViaEscapeKey);
        //this._profileForm.reset()
    }


    setEventListeners() {
        super.setEventListeners()
        this._profileForm.addEventListener('submit', (evt) => {
            evt.preventDefault()
            this._handleDataViaSubmit(this._getInputValues)
            this.close()
        })
    }
}

class UserInfo {
    constructor({userNameInput, userJobInput}) {
        this._userName = userNameInput
        this._userJob = userJobInput
    }

    getUserInfo() {
        return{
            name:this._userName.textContent,
            job:this._userJob.textContent
        }
    }

    setUserInfo(item){
        this._userName.textContent = item.name;
        this._userJob.textContent = item.job;
    }
}



const popupWithFormCard = new PopupWithForm(popupAddNewCard, handleNewCardViaSubmit)

const userData = new UserInfo({userNameInput, userJobInput})

const popupWithFormProfile = new PopupWithForm(profilePopup, handleProfileFormSubmit)

// const popupWithFormProfile = new PopupWithForm(profilePopup, handleProfileFormSubmit)

// const user = new UserInfo.getUserInfo()
//
// console.log(user)


popupWithFormCard.setEventListeners()
popupWithFormProfile.setEventListeners()


console.log(popupWithFormCard)
console.log(cardAddSubmitBtn)
console.log(userData)


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


//profileEditBtn.addEventListener('click', openProfileEdit);

newCardAddOpenBtn.addEventListener('click', () => {
    formClassNewCardCheckValid.resetValidation()
    popupWithFormCard.open()
});

profileEditBtn.addEventListener('click', () => {
    // userNameInput.value = userName.textContent;
    // userJobInput.value = userJob.textContent;
    formClassProfileCheckValid.resetValidation()
    popupWithFormProfile.open();
});

console.log(userNameInput.value)
console.log(userName.textContent)


//profileForm.addEventListener('submit', handleProfileFormSubmit);
//cardAddSubmitBtn.addEventListener('submit', handleNewCardViaSubmit);

export {
    cardElementTemplate,
    validateConfig,
};