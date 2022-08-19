import {
    cardElementTemplate
} from './index.js';

export class Card {
    constructor(data, templateSelector, handleCardClick) {
        this._name = data.name;
        this._link = data.link;
        this._card = templateSelector;
        this._handleCardClick = handleCardClick;

    }

    _getTemplate() {
        const userElementCard = cardElementTemplate.querySelector('.element').cloneNode(true);
        return userElementCard;
    }

    generateCardElement() {
        this._element = this._getTemplate();
        this._elementLike = this._element.querySelector('.element__like');
        this._elementRemoveBtn = this._element.querySelector('.element__remove-btn');
        this._elementImage = this._element.querySelector('.element__image');
        this._setEventListeners();

        this._element.querySelector('.element__title').textContent = this._name;
        this._elementImage.src = this._link;
        this._elementImage.alt = this._name;

        return this._element;
    }

    _setEventListeners() {
        this._elementLike.addEventListener('click', () => {
            this._handleLikeBtn();
        });
        this._elementRemoveBtn.addEventListener('click', () => {
            this._handleRemoveBtn();
        });
        this._elementImage.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link)
        });

    }

    _handleLikeBtn() {
        this._elementLike.classList.toggle('element__like_active')
    }

    _handleRemoveBtn() {
        this._elementRemoveBtn.closest('.element').remove()
        this._element = null;
    }
}








