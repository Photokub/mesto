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
    closePopup,
    openFullSizeImg,
    closeFullSizeImg,
    handleCardClick,
    handleNewCardViaSubmit,
    } from './index.js';



//console.log (handleCardClick)
    

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
    constructor(data, handleCardClick){
        this._name = data.name;
        this._link = data.link;
        this._handleCardClick = handleCardClick;
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
       //this._element.querySelector('.element__image').addEventListener('click', () =>{
       //    this._handleElementImage();
       //})
        this._element.querySelector('.element__image').addEventListener('click' , () =>{
           this._handleCardClick(this._name, this._link)
       });

    }

    _handleLikeBtn(){
        this._element.querySelector('.element__like').classList.toggle('element__like_active')
    }

    _handleRemoveBtn(){
        this._element.querySelector('.element__remove-btn').closest('.element').remove()
    }

    _handleCardClick(name, link){
        this._element.querySelector('.popup__fullsize-img-picture').textContent = this._name;
        this._element.querySelector('.popup__fullsize-img-caption').textContent = this._name;
        this._element.querySelector('.popup_full-size-image').src = this._link;
        this.popupFullSizeImg.alt = this._name;
        //openPopup(popupFullSizeImg);
    }
}

const renderElements = () => {
    initialCards.forEach((item, handleNewCardViaSubmit) => {
        const card = new Card(item, handleNewCardViaSubmit);
        const cardElement = card.generateCardElement();

        elementsGallery.append(cardElement);
    })
}

renderElements();

export {
    Card,
    renderElements
 //   generateCardElement
}





