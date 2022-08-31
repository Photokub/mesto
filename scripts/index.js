import {Card} from './Сard.js';
import {FormValidator} from './FormValidator.js';
import {initialCards} from './initialCards.js';
import Section from './Section.js'


const profilePopup = document.querySelector('.profile-popup');
const popupFullSizeImg = document.querySelector('.popup_full-size-image');
const popupAddNewCard = document.querySelector('.popup_add-new-card');
const profileEditBtn = document.querySelector('.profile__edit-btn');
const newCardAddOpenBtn = document.querySelector('.profile__add-btn');
const openFullSizeImgBtn = document.querySelector('.element__image')

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
    popupFullSizeImgSelector: '.popup_full-size-image',
    gallery: '.elements',
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

function handleCardClick() {
    const popupImage = new PopupWithImage(popupFullSizeImg)
    popupImage.setEventListeners()
    // imgZoomTitle.textContent = name;
    // imgZoom.src = link;
    // imgZoom.alt = name;
    popupImage.open();
}

//валидация форм
const formClassProfileCheckValid = new FormValidator(validateConfig, newProfileForm)
formClassProfileCheckValid.enableValidation()

const formClassNewCardCheckValid = new FormValidator(validateConfig, newCardForm)
formClassNewCardCheckValid.enableValidation()

class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;        
        this._overlay = this._popupSelector;    
        this._closeViaEscapeKey = this._closeViaEscapeKey.bind(this)
        this._popupCloseButton = this._popupSelector.querySelector('.popup__close')
        this._profileForm = newProfileForm
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

class PopupWithImage extends Popup{
    constructor(popupSelector){
        super(popupSelector)
        this._imageElement = this._popupSelector.querySelector('.popup__fullsize-img-picture')
        this._titleElement = this._popupSelector.querySelector('.popup__fullsize-img-caption')
    }
        open(name, link) {
            this._titleElement.textContent = name;
            this._imageElement.src = link;
            this._titleElement = name;
        }
    }


class PopupWithForm extends Popup {
    constructor({popupSelector, handleDataViaSubmit}) {
        super(popupSelector);
        this._submitBtn = popupSelector.querySelector('.form__save-btn')
        this._profileForm = document.querySelector('.form_profile')
        this._form = this._popupSelector.querySelector('.form')        
        this._handleDataViaSubmit = handleDataViaSubmit
        this._userNameInput = this._popupSelector.querySelector('.form__input_type_name')
        this._userJobInput = this._popupSelector.querySelector('.form__input_type_job')
    }

    setInputValues(){
        this._userNameInput.value = 'tesst'
        this._userJobInput.value = 'test'
    }

    // setInputValues(initialValues) {
    //     Object.keys(initialValues).forEach(
    //         (key) => (this._findInput(key).value = initialValues[key])
    //     );
    // }


    _getInputValues() {
        this._inputFormList = this._popupSelector.querySelectorAll('.form__input')        

        const formValues = {};
        this._inputFormList.forEach((input) => {    
          
            formValues[input.name] = input.value
           
        })
        console.log(formValues)
        return formValues;
    }

    
    close(evt) {
        this._popupSelector.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._closeViaEscapeKey);
        //this._profileForm.reset()
    }


    setEventListeners() {
        super.setEventListeners()
        this._form.addEventListener('submit', (evt) => {
           evt.preventDefault()
            this._handleDataViaSubmit(this._getInputValues())
            this.close()
        })
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


const popupWithFormCard = new PopupWithForm({
    popupSelector: popupAddNewCard, 
    handleDataViaSubmit: (formData) => {
    const cardSubmitted = new Card (formData, handleCardClick)
    const cardElement = cardSubmitted.generateCardElement();
    cardList.addItem(cardElement)
    console.log(cardSubmitted)
}
})



//const popupWithFormProfile = new PopupWithForm(profilePopup)
// const popupWithFormProfile = new PopupWithForm(profilePopup, handleProfileFormSubmit)
 //const popupWithFormProfile = new PopupWithForm(profilePopup,  handleNewCardViaSubmit)
  //const popupWithFormProfile = new PopupWithForm(profilePopup,  (userData) => userData.setUserInfo(userData))


popupWithFormCard.setEventListeners()
//popupWithFormProfile.setEventListeners()


newCardAddOpenBtn.addEventListener('click', () => {
    formClassNewCardCheckValid.resetValidation()
    popupWithFormCard.open()
});

profileEditBtn.addEventListener('click', () => { 
    popupWithFormProfile.open();
    popupWithFormProfile.setInputValues(userData.getUserInfo());
});

// openFullSizeImgBtn.addEventListener('click', () => {
//     popupImage.open();
// })

// document.addEventListener('click', function(evt){
//     if(!evt.target.classList.contains('element__image')) return
//     else{
//         popupImage.open();
//     }
//   })


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