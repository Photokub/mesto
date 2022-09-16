export class Card {
    constructor(data, cardSelector, handleCardClick, handlePopupConfirm, handleLikeCounter) {
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

        this.setLikes(this._likesArray.length)
        this._findOwnLike(this._likesArray)

        if (!this._isOwner()) {
            this._elementRemoveBtn.classList.add('element__remove-btn_hidden')
        }

        this._counterNumber = Number(this._likeCounter.textContent)

        return this._element;
    }

    _isOwner() {
        if (this._owner === this._currentUserId) {
            return true;
        }
        return false;
    };

    _findOwnLike(arr) {
        arr.forEach(obj => {
            if (obj._id === this._currentUserId) {
                this._elementLike.classList.add('element__like_active')
            }
        })
    }

    setLikes(number) {
        this._likeCounter.textContent = number
    };

    // resetLikes(arr) {
    //     this._likeCounter.textContent = (arr.length)
    // }

    _setEventListeners() {
        this._elementLike.addEventListener('click', (evt) => {
            this._handleLikeBtn(evt);
            this._changeLikesArray();
        });
        this._elementRemoveBtn.addEventListener('click', () => {
            this._handleRemoveBtn();
        });
        this._elementImage.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link)
        });
    }

    _handleLikeBtn(evt) {
        if(evt.target.classList.contains('element__like_active')){
            this._elementLike.classList.remove('element__like_active')
            this._counterNumber = this._counterNumber - 1;
            this._likeCounter.textContent = this._counterNumber;
        } else {
            this._elementLike.classList.add('element__like_active')
            this._counterNumber = this._counterNumber + 1;
            this._likeCounter.textContent = this._counterNumber;
        }
    }

    _changeLikesArray() {
        this._handleLikeCounter(this._likesArray, this._cardId)
    }

    _handleRemoveBtn() {
        this._handlePopupConfirm(this._cardId, this._element);
    }
}










