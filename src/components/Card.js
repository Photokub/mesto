
export class Card {
    constructor(data,cardSelector, handleCardClick, handleLikeCounter) {
        this._name = data.name;
        this._link = data.link;
        this._handleCardClick = handleCardClick;
        this._cardSelector = cardSelector
    }

    _getTemplate() {
        const userElementCard = this._cardSelector.querySelector('.element').cloneNode(true);
        return userElementCard;
    }

    generateCardElement() {
        this._element = this._getTemplate();
        this._elementLike = this._element.querySelector('.element__like');
        this._likeCounter = this._element.querySelector('.element__like-counter')
        this._elementRemoveBtn = this._element.querySelector('.element__remove-btn');
        this._elementImage = this._element.querySelector('.element__image');
        this._setEventListeners();

        this._element.querySelector('.element__title').textContent = this._name;
        this._elementImage.src = this._link;
        this._elementImage.alt = this._name;

        return this._element;
    }

    resetLikes(number){
        this._likeCounter.textContent = number
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










