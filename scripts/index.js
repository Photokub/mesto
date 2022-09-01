import {initialCards} from '../utils/initialCards.js';
import {
    profilePopup,
    popupFullSizeImg,
    popupAddNewCard,
    profileEditBtn,
    newCardAddOpenBtn,
    newCardForm,
    newProfileForm,
    validateConfig,
    classSelectors,
    elementsGallery
} from '../utils/constants.js'
import {Card} from './Сard.js';
import {FormValidator} from './FormValidator.js';
import Section from './Section.js'
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";

//добавление карточек из массива
const cardList = new Section({
    item: initialCards,
    renderer: (item) => {
        const card = new Card(item, () => {

            const popupImage = new PopupWithImage(popupFullSizeImg)
            popupImage.setEventListeners()

            popupImage.open(
                {
                    name: card._name,
                    link: card._link
                }
            );
        })
        const cardElement = card.generateCardElement();
        cardList.addItem(cardElement)
    }
}, elementsGallery)

cardList.renderItems()

//добавление карточек по сабмиту
const popupWithFormCard = new PopupWithForm({
    popupSelector: popupAddNewCard,
    handleDataViaSubmit: (formData) => {
        const cardSubmitted = new Card(formData, () => {

            const popupImage = new PopupWithImage(popupFullSizeImg)
            popupImage.setEventListeners()

            popupImage.open(
                {
                    name: cardSubmitted._name,
                    link: cardSubmitted._link
                }
            );

        })
        const cardElement = cardSubmitted.generateCardElement();
        cardList.addItem(cardElement)
    }
})

//валидация форм
const formClassProfileCheckValid = new FormValidator(validateConfig, newProfileForm)
formClassProfileCheckValid.enableValidation()

const formClassNewCardCheckValid = new FormValidator(validateConfig, newCardForm)
formClassNewCardCheckValid.enableValidation()


const userData = new UserInfo({
    userNameSelector: classSelectors.userName,
    userJobSelector: classSelectors.userJob
})

const popupWithFormProfile = new PopupWithForm({
    popupSelector: profilePopup,
    handleDataViaSubmit: (data) => {
        userData.setUserInfo(data)
    }
})

popupWithFormCard.setEventListeners()
popupWithFormProfile.setEventListeners()

newCardAddOpenBtn.addEventListener('click', () => {
    formClassNewCardCheckValid.resetValidation()
    popupWithFormCard.open()
});

profileEditBtn.addEventListener('click', () => {
    formClassProfileCheckValid.resetValidation()
    popupWithFormProfile.open()
    const initialData = userData.getUserInfo()
    console.log(initialData)
    popupWithFormProfile.setInputValues(initialData)
})

