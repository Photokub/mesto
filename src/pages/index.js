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
    cardElementTemplate,
    popupConfirmDelete,
    likesCounter
} from '../utils/constants.js'
import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import Section from '../components/Section.js'
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import PopupConfirm from "../components/PopupConfirm.js";
//const counter = document.querySelector('.element__like-counter')

const popupImage = new PopupWithImage(popupFullSizeImg)




const api = new Api({
    baseUrl:  'https://nomoreparties.co/v1/cohort-50',
    headers:   {
        "content-type": "application/json",
        Authorization: "a923fc14-3b54-43fb-958c-955df8eb7a09",
    }
})

const popupConfirm = new PopupConfirm(
    popupConfirmDelete,
    (cardId, card) => {
        api
            .deleteMyCard(cardId)
            .then(() =>
                    card.remove(),
                popupConfirm.close())
            .catch((error) => console.log(error))
    }
)

const openPopupConfirm = (cardId, card) => {
    popupConfirm.open(cardId, card);
};

//функция создания карточки
function createCard(data) {
    const card = new Card(
        data,
        cardElementTemplate,
        () => {
        popupImage.open(
            {
                name: card._name,
                link: card._link
            }
        );
    },
        (cardId, card) =>
            openPopupConfirm(cardId, card),
         (likeArray, cardId) =>
    api.putLike(cardId)
        .then((res) => {
            likeArray.push[res]
            //likesCounter.textContent = res.likes.length
            //evt.resetLikes(likeArray, evt)
    }),

    //this._elementRemoveBtn.addEventListener('click', () => )

    )

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
    handleDataViaSubmit: (data) => {
        api.postCard(data).then((res)=>{
            console.log(res)
            cardList.addItem(createCard(res))
        })
    }
})

const userData = new UserInfo({
    userNameSelector: classSelectors.userName,
    userJobSelector: classSelectors.userJob
})

//добавление данных о пользователе с сервера
const user = api.getUserInfo()

    user.then (result => { userData.setUserInfo(result) })  
    //user.then (result => { console.log(result) })
    user.then (result => { localStorage.setItem("userId", result._id) }) 
   // user.then (result => { console.log(result._id) })
    user.catch(error => console.log(`Ошибка: ${error}`))


//добавление данных о полльзователе на сервер и в профиль
const popupWithFormProfile = new PopupWithForm({
    popupSelector: profilePopup,
    handleDataViaSubmit: (data) =>
    api.patchUserInfo(data).then((res) => {
        userData.setUserInfo({name: res.name, about: res.about});
    })
    .catch((error) => console.log(error))
})







//валидация форм
const formClassProfileCheckValid = new FormValidator(validateConfig, newProfileForm)
formClassProfileCheckValid.enableValidation()

const formClassNewCardCheckValid = new FormValidator(validateConfig, newCardForm)
formClassNewCardCheckValid.enableValidation()


popupWithFormCard.setEventListeners()
popupWithFormProfile.setEventListeners()
popupImage.setEventListeners()
popupConfirm.setEventListeners()

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



