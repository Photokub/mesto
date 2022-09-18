import './index.css'

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
    popupAvatar,
    avatarEditBtn,
    avatarChangeForm,
} from '../utils/constants.js'
import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import Section from '../components/Section.js'
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import PopupConfirm from "../components/PopupConfirm.js";

const api = new Api({
    baseUrl: 'https://nomoreparties.co/v1/cohort-50',
    headers: {
        "content-type": "application/json",
        Authorization: "a923fc14-3b54-43fb-958c-955df8eb7a09",
    }
})

//добавление карточек из массива с сервера
const cardsServerArr = []

const cardList = new Section({
    item: cardsServerArr,
    renderer: (item) => {
        cardList.addItem(createCard(item))
    }
}, elementsGallery)

// API с дефолтными карточками с сервера
function getCardsFromServer() {
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

        (cardId) => {
            const action = card.isLiked() ? api.deleteLike(cardId) : api.putLike(cardId)

            action
                .then((res) => {
                    card.setLikes(res.likes.length);
                    card._likesArray = res.likes
                })
                .catch((error) => console.log(error));
        }
    )
    const cardElement = card.generateCardElement();
    return cardElement
}

//добавление карточек по сабмиту
const popupWithFormCard = new PopupWithForm({
    popupSelector: popupAddNewCard,
    handleDataViaSubmit: (data) => {
        api.postCard(data).then((res) => {
            popupWithFormCard.handleSubmitButton({isLoading: false})
            cardList.addItem(createCard(res))
        })
            .catch((error) => console.log(error))
    }
})

const userData = new UserInfo({
    userNameSelector: classSelectors.userName,
    userJobSelector: classSelectors.userJob,
    userAvatarSelector: classSelectors.userAvatar,
})

const popupAvatarEdit = new PopupWithForm({
    popupSelector: popupAvatar,
    handleDataViaSubmit: (data) => {
        api.patchAvatar(data.ava_link_field)
            .then((res) => {
                userData.setUserInfo({name: res.name, about: res.about, avatar: res.avatar})
            })
            .catch((error) => console.log(error))
    }
})

//добавление данных о пользователе с сервера
const user = api.getUserInfo()
user.then(result => {
    userData.setUserInfo(result)
})
user.then(result => {
    localStorage.setItem("userId", result._id)
})
user.catch(error => console.log(`Ошибка: ${error}`))


//добавление данных о пользователе на сервер и в профиль
const popupWithFormProfile = new PopupWithForm({
    popupSelector: profilePopup,
    handleDataViaSubmit: (data) =>
        api.patchUserInfo(data).then((res) => {
            userData.setUserInfo({name: res.name, about: res.about, avatar: res.avatar});
            popupWithFormProfile.handleSubmitButton({isLoading: false})
        })
            .catch((error) => console.log(error))
})

const popupImage = new PopupWithImage(popupFullSizeImg)

const openPopupConfirm = (cardId, card) => {
    popupConfirm.open(cardId, card);
};

//валидация форм
const formClassProfileCheckValid = new FormValidator(validateConfig, newProfileForm)
formClassProfileCheckValid.enableValidation()

const formClassNewCardCheckValid = new FormValidator(validateConfig, newCardForm)
formClassNewCardCheckValid.enableValidation()

const formClassChangeAvatar = new FormValidator(validateConfig, avatarChangeForm)
formClassChangeAvatar.enableValidation()


popupWithFormCard.setEventListeners()
popupWithFormProfile.setEventListeners()
popupImage.setEventListeners()
popupConfirm.setEventListeners()
popupAvatarEdit.setEventListeners()

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

avatarEditBtn.addEventListener('click', () => {
    formClassChangeAvatar.resetValidation()
    popupAvatarEdit.open()
})



