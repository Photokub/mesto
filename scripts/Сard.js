import {
    profilePopup,
    popupFullSizeImg,
    popupAddNewCard,
    editProfileBtn,
    openAddNewCardBtn,
    fullSizeImg,
    fullSizeImgTitle,
    closeButtons,
    closeOverlays,
    elementsGallery,
    cardElementTemplate,
    submitBtn,
    profileForm,
    submitAddCard,
    userName,
    userJob,
    userNameInput,
    userJobInput,
    cardTitle,
    cardLink,
    openPopup,
    closePopup
    } from './index.js';

    

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

class Card {
    constructor(data){
        this._name = data.name;
        this._link = data.link;
    }

    _getTemplate(){
        const userElementCard = cardElementTemplate.querySelector('.element').cloneNode(true);
        return userElementCard;
    }

    generateCardElement(){
        this._element = this._getTemplate();
        this._setEventListeners();

        this._element.querySelector('.element__title').textContent = this._name;
        this._element.querySelector('.element__image').src = this._link;
        this._element.querySelector('.element__image').alt = this._name;

        return this._element;
    }

    _setEventListeners(){
        this._element.querySelector('.element__like').addEventListener('click', () => {
            this._handleLikeBtn();
        });
       this._element.querySelector('.element__remove-btn').addEventListener('click', () =>{
            this._handleRemoveBtn();
       });
        // document.querySelector('.popup__fullsize-img-picture').addEventListener('click', () => {
        //     this.openFullSizeImg();
        // })
    }

    _handleLikeBtn(){
        this._element.querySelector('.element__like').classList.toggle('element__like_active')
    }

    _handleRemoveBtn(){
        this._element.querySelector('.element__remove-btn').closest('.element').remove()
    }
 

    // _handleOpenFullSizeImg(){
    //     this._element.document.querySelector('.popup__fullsize-img-picture').classList.add('popup_opened')
    // }

}



initialCards.forEach((item) => {
    const card = new Card(item);
    const cardElement = card.generateCardElement();

    elementsGallery.append(cardElement);
})
