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

const classSelectors = {
    userName: '.profile__title',
    userJob: '.profile__subtitle',
    profilePopup: '.profile-popup',
    addCardPopup: '.popup_add-new-card',
    imgZoomPopup: '.popup__fullsize-img-picture',
    gallery: '.elements',
}

console.log(classSelectors.userName)

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
// function handleProfileFormSubmit(item) {
//     //evt.preventDefault();
//     // userName.textContent = objData.value;
//      //userJob.textContent = objData.value;
//     // userName.textContent = userData.setUserInfo;
//     // userJob.textContent = userJobInput.value;
//     //closeProfileEdit();
//     //(v) => userInfo.setUserInfo(v)
//     userData.setUserInfo(item)
//
//     // userData.setUserInfo()
// }

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
        this._profileForm = newProfileForm
        //this._profileValue = {_userName: userNameInput.value, _userJob: userJobInput.value }
    }

    open() {
        this._profileForm.reset()
        this._popupSelector.classList.add('popup_opened');
        document.addEventListener('keydown', this._closeViaEscapeKey);
        // userNameInput.value = userName.textContent;
        // userJobInput.value = userJob.textContent
        //this._profileValue = getUserInfo(userData)
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
        this._profileForm = document.querySelector('.form_profile')
        this._form = this._popupSelector.querySelector('.form')
        this._inputFormList = this._popupSelector.querySelectorAll('.form__input')
        this._handleDataViaSubmit = handleDataViaSubmit
    }

    // _findInput(key) {
    //     return Array.from(this._profileForm).find((i) => i.name === key);
    //   }

    setDefaultlValues(initialValues) {
        Object.keys(initialValues).forEach(
          (key) => (console.log(key))
        );
      }

    // setDefaultlValues(initialValues) {
    //     Object.keys(initialValues).forEach(
    //         (key) => (this._findInput(key).value = initialValues[key])
    //     );
    // }

    
    _getInputValues() {
        this._inputFormList.forEach((input) => {
            this._inputValues[input.name] = input.value
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
        this._form.addEventListener('submit', (evt) => {
           if(evt.target === cardAddSubmitBtn) {evt.preventDefault()
            this._handleDataViaSubmit(this._getInputValues)
            this.close()}
            else{
                evt.preventDefault()
                this._handleDataViaSubmit()
            this.close()
            }
        })

    // setEventListeners() {
    //     super.setEventListeners()
    //     this._profileForm.addEventListener('submit', (evt) => {
    //        if(evt.target === cardAddSubmitBtn) {evt.preventDefault()
    //         this._handleDataViaSubmit(this._getInputValues)
    //         this.close()}
    //         else{
    //             evt.preventDefault()
    //             this._handleDataViaSubmit()
    //         this.close()
    //         }
    //     })
    }


}

class UserInfo {
    constructor({userNameSelector, userJobSelector}) {
        this._userName = document.querySelector(userNameSelector);
        this._userJob = document.querySelector(userJobSelector);
    }

    getUserInfo() {
        return{
            name:this._userName.textContent,
            job:this._userJob.textContent,
        }
    }

    setUserInfo({userNameSelector,userJobSelector}){
        this._userName.textContent = userNameSelector;
        this._userJob.textContent = userJobSelector
    }
}


const userData = new UserInfo({
    userNameSelector: classSelectors.userName,
    userJobSelector: classSelectors.userJob
})


const popupWithFormCard = new PopupWithForm(popupAddNewCard, handleNewCardViaSubmit)


//const popupWithFormProfile = new PopupWithForm(profilePopup, handleProfileFormSubmit)
const popupWithFormProfile = new PopupWithForm(profilePopup,  (item) => userData.setUserInfo(item))

popupWithFormCard.setEventListeners()
popupWithFormProfile.setEventListeners()


newCardAddOpenBtn.addEventListener('click', () => {
    formClassNewCardCheckValid.resetValidation()
    popupWithFormCard.open()
});

profileEditBtn.addEventListener('click', () => {
    // userNameInput.value = userName.textContent;
    // userJobInput.value = userJob.textContent;
    formClassProfileCheckValid.resetValidation()
    popupWithFormProfile.setDefaultlValues(userData.getUserInfo());
    popupWithFormProfile.open();
});

console.log(popupWithFormCard)
console.log(cardAddSubmitBtn)
console.log(userData.getUserInfo())
console.log(userData)

//console.log(userDataHandle)


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



// console.log(userNameInput.value)
// console.log(userName.textContent)


//profileForm.addEventListener('submit', handleProfileFormSubmit);
//cardAddSubmitBtn.addEventListener('submit', handleNewCardViaSubmit);

export {
    cardElementTemplate,
    validateConfig,
};