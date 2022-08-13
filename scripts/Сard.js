import {
    elementsGallery,
    cardElementTemplate,
    handleCardClick,
    initialCards
    } from './index.js';



export class Card {
    constructor(data, templateSelector, handleCardClick){
        this._name = data.name;
        this._link = data.link;
        this._card = templateSelector;
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
}

const renderElements = () => {
    initialCards.forEach((item) => {
        const card = new Card(item, '#element-card', handleCardClick);
        const cardElement = card.generateCardElement();

        elementsGallery.append(cardElement);
    })
}

renderElements();





