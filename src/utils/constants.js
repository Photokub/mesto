export const profileEditBtn = document.querySelector('.profile__edit-btn');
export const newCardAddOpenBtn = document.querySelector('.profile__add-btn');
export const elementsGallery = document.querySelector('.elements');
export const newCardForm = document.querySelector('.form_add-new-card');
export const newProfileForm = document.querySelector('.form_profile');
export const avatarEditBtn = document.querySelector('.profile__avatar-container')
export const avatarChangeForm = document.querySelector('.form_change-avatar')

export const validateConfig = {
    form: 'form',
    button: '.form__save-btn',
    buttonValid: 'form__save-btn_valid',
    buttonInvalid: 'form__save-btn_invalid',
    formInput: '.form__input',
    formInputError: '.form__input-error',
    inputErrorClass: 'form__input-error-field'
}

export const classSelectors = {
    userName: '.profile__title',
    userJob: '.profile__subtitle',
    profilePopup: 'profile-popup',
    addCardPopup: 'popup_add-new-card',
    imgZoomPopup: 'popup__fullsize-img-picture',
    popupFullSizeImgSelector: 'popup_full-size-image',
    gallery: 'elements',
    zoomPicLink: 'popup__fullsize-img-picture',
    zoomPicName: 'popup__fullsize-img-caption',
    likesCounter: 'element__like-counter',
    userAvatar: '.profile__avatar',
    changeAvatarPopup: 'popup_change-avatar',
    cardTemplate: '#element-card',
    popupConfirm: 'popup_confirm-delete',
}
