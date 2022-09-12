//import './index.css'

//import {initialCards} from '../utils/initialCards.js';
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
    elementsGallery,
    cardElementTemplate
} from '../utils/constants.js'
import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import Section from '../components/Section.js'
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";

const popupImage = new PopupWithImage(popupFullSizeImg)

const api = new Api({
    baseUrl:  'https://nomoreparties.co/v1/cohort-50',
    headers:   {
        "content-type": "application/json",
        Authorization: "a923fc14-3b54-43fb-958c-955df8eb7a09",
    }
})

//функция создания карточки
function createCard(item) {
    const card = new Card(item,cardElementTemplate, () => {
        popupImage.open(
            {
                name: card._name,
                link: card._link
            }
        );
    })
    const cardElement = card.generateCardElement();
    return cardElement
}

//добавление карточек из массива с сервера
const cardsServerArr =[]
console.log( cardsServerArr)

const cardList = new Section({
    item: cardsServerArr,
    renderer: (item) => {
        cardList.addItem(createCard(item))
    }
}, elementsGallery)

// API с дефолтными карточками с сервера
function getCardsFromServer(){
    // popupImage.open(
    //     {
    //         name: card._name,
    //         link: card._link
    //     })
    api
    .getDefaultCards()
    .then((cards) => {
        cards.reverse().map((element) => {
            cardsServerArr.push(element);
        });
        cardsServerArr.forEach((card) => {
            const cardElement = createCard(card)
            cardList.addItem(cardElement);
        })
      })
      .catch((error) => console.log(error))
}
getCardsFromServer()


//добавление карточек по сабмиту
const popupWithFormCard = new PopupWithForm({
    popupSelector: popupAddNewCard,
    handleDataViaSubmit: (item) => {
        cardList.addItem(createCard(item))
    }
})

const userData = new UserInfo({
    userNameSelector: classSelectors.userName,
    userJobSelector: classSelectors.userJob
})

//добавление данных о пользователе с сервера
const user = api.getUserInfo()
    user.then(result => { userData.setUserInfo(result) })
    user.catch(error => console.log(`Ошибка: ${error}`))

//добавление данных о полльзователе на сервер и в профиль
const popupWithFormProfile = new PopupWithForm({
    popupSelector: profilePopup,
    handleDataViaSubmit: (data) => 
    api.patchUserInfo(data).then((res) => {
        userData.setUserInfo({name: res.name, about: res.about})     
    }),
})

//валидация форм
const formClassProfileCheckValid = new FormValidator(validateConfig, newProfileForm)
formClassProfileCheckValid.enableValidation()

const formClassNewCardCheckValid = new FormValidator(validateConfig, newCardForm)
formClassNewCardCheckValid.enableValidation()


popupWithFormCard.setEventListeners()
popupWithFormProfile.setEventListeners()
popupImage.setEventListeners()

newCardAddOpenBtn.addEventListener('click', () => {
    formClassNewCardCheckValid.resetValidation()
    popupWithFormCard.open()
});

profileEditBtn.addEventListener('click', () => {
    formClassProfileCheckValid.resetValidation()
    popupWithFormProfile.open()
    const initialData = userData.getUserInfo()
    popupWithFormProfile.setInputValues(initialData)
})

