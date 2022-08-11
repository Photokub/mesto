const profilePopup = document.querySelector('.profile-popup');
const popupFullSizeImg = document.querySelector('.popup_full-size-image');
const popupAddNewCard = document.querySelector('.popup_add-new-card');
const editProfileBtn = document.querySelector('.profile__edit-btn');
const openAddNewCardBtn = document.querySelector('.profile__add-btn');

const fullSizeImg = document.querySelector('.popup__fullsize-img-picture');
const fullSizeImgTitle = document.querySelector('.popup__fullsize-img-caption');

const closeButtons = document.querySelectorAll('.popup__close');
const closeOverlays = document.querySelectorAll('.popup');

const elementsGallery = document.querySelector('.elements');
const cardElementTemplate = document.querySelector('#element-card').content;

const submitBtn = profilePopup.querySelector('.form__save-btn');
const profileForm = profilePopup.querySelector('.form');
const submitAddCard = popupAddNewCard.querySelector('.form_add-new-card');
const userName = document.querySelector('.profile__title');
const userJob = document.querySelector('.profile__subtitle');
const userNameInput = profilePopup.querySelector('.form__input_type_name');
const userJobInput = profilePopup.querySelector('.form__input_type_job');
const cardTitle = popupAddNewCard.querySelector('.form__input_type_title');
const cardLink = popupAddNewCard.querySelector('.form__input_type_link');

export {
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
cardLink
};

//создание новой карточки
// function createCard(item) {
//   const userElementCard = cardElementTemplate.querySelector('.element').cloneNode(true);

//   const elementImage = userElementCard.querySelector('.element__image');
//   const elementTitle = userElementCard.querySelector('.element__title');

//   const likeBtn = userElementCard.querySelector('.element__like');
//   const removeBtn = userElementCard.querySelector('.element__remove-btn');

//   elementTitle.textContent = item.name;
//   elementImage.src = item.link;
//   elementImage.alt = item.name;
//   likeBtn.addEventListener('click', function () { likeBtn.classList.toggle('element__like_active') });
//   removeBtn.addEventListener('click', function () { removeBtn.closest('.element').remove() })

//   elementImage.addEventListener('click', function () {
//     openFullSizeImg();
//     fullSizeImg.src = elementImage.src;
//     fullSizeImgTitle.textContent = elementTitle.textContent;
//     fullSizeImg.alt = elementTitle.textContent;
//   })

//   return userElementCard;
// }

//наполнение дефолтными карточками
// for (let i = 0; i < initialCards.length; i++) {
//   const userElementCard = createCard(initialCards[i]);
//   elementsGallery.append(userElementCard);
// }

//функционал добавления карточки через «сохранить» 
function handleNewCardViaSubmit(evt) {
  evt.preventDefault();

  const newCard =
      {
        name: cardTitle.value,
        link: cardLink.value
      }
  const card = createCard(newCard);
  elementsGallery.prepend(card)
  closeAddingCard();
  evt.target.reset()
}

//функционал открытия попапа
export const openPopup = function (item) {
  item.classList.add('popup_opened');
  document.addEventListener('keydown', closeViaEscapeKey);
};

//функционал закрытия попапа
export const closePopup = function (item) {
  item.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeViaEscapeKey);
};

//выборка навешивание слушателя для каждого крестика
closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
})

//закрытие по оверлею
closeOverlays.forEach((button) => {button.addEventListener('mousedown', function closePopupViaOverlay(evt){
  const popup = button.closest('.popup');
  if(!evt.target.classList.contains('popup')){
    return
  }
  closePopup(popup);
 })
})

//Закрытие по Esc
function closeViaEscapeKey(evt){
  if(evt.code === 'Escape'){
    closePopup(document.querySelector('.popup_opened'));
  }
}

//очистка полей с ошибками
function clearErrors(){
  const inputErrors = document.querySelectorAll('.form__input-error');
  const errorsFields = document.querySelectorAll('.form__input-error-field');

  inputErrors.forEach((inputError) => {inputError.textContent=""});
  errorsFields.forEach((field) => {removeErrorBorder(field)})
}

//открыть добавить карточку
function openAddingCard() {
  clearErrors();
  openPopup(popupAddNewCard);
  submitAddCard.reset()
};

//закрыть добавить карточку
function closeAddingCard() {
  closePopup(popupAddNewCard);
};

//открыть редактировать профиль
function openProfileEdit(evt) {
  clearErrors();
  userNameInput.value = userName.textContent;
  userJobInput.value = userJob.textContent;  
  openPopup(profilePopup);
};

//закрыть редактировать профиль
function closeProfileEdit() {
  closePopup(profilePopup);
};

//открыть большую картинку
function openFullSizeImg() {
  openPopup(popupFullSizeImg);
};

//закрыть большую картинку
function closeFullSizeImg() {
  closePopup(popupFullSizeImg);
};

//функционал кнопки «сохранить» в редактировании профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  userName.textContent = userNameInput.value;
  userJob.textContent = userJobInput.value;
  closeProfileEdit();
}

//функция деактивации красного бордера
function removeErrorBorder(item){
  if(item.classList.contains('form__input-error-field')){
    item.classList.remove('form__input-error-field')
  }
}


editProfileBtn.addEventListener('click', openProfileEdit);

openAddNewCardBtn.addEventListener('click', openAddingCard);

profileForm.addEventListener('submit', handleProfileFormSubmit);
submitAddCard.addEventListener('submit', handleNewCardViaSubmit);