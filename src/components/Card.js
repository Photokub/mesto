
export class Card {
    constructor(data, cardSelector, handleCardClick, handlePopupConfirm ,handleLikeCounter) {
        this._name = data.name;
        this._link = data.link;
        this._cardId = data._id;
        this._handleCardClick = handleCardClick;
        this._handlePopupConfirm = handlePopupConfirm;
        this._handleLikeCounter = handleLikeCounter;
        this._cardSelector = cardSelector;
        this._owner = data.owner._id;
        this._currentUserId = localStorage.getItem("userId");
        this._likesArray = data.likes;
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

        if (!this._isOwner()) {
            this._elementRemoveBtn.classList.add('element__remove-btn_hidden')
        }

        return this._element;
    }

    _isOwner() {
        if (this._owner === this._currentUserId) {
            return true;
        }
        return false;
    };

     _setLikes(number)  {
        this._likeCounter.textContent = number
    };

    _setEventListeners() {
        this._elementLike.addEventListener('click', () => {
            this._handleLikeBtn();
            this._changeLikesArray();
            this._setLikes(this._likesArray.length)

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

    _changeLikesArray(){
        this._handleLikeCounter(this._likesArray, this._cardId)
        //this._likeCounter.textContent = 'Liked';
    }
    // _handleLikeCounter(){
    //     this._likeCounter(this._likesArray, this._element)
    // }

    _handleRemoveBtn() {
        this._handlePopupConfirm(this._cardId, this._element);
    }
}










