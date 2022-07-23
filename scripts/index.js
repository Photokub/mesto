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


//создание новой карточки
function createCard(item) {
  const userElementCard = cardElementTemplate.querySelector('.element').cloneNode(true);

  const elementImage = userElementCard.querySelector('.element__image');
  const elementTitle = userElementCard.querySelector('.element__title');

  const likeBtn = userElementCard.querySelector('.element__like');
  const removeBtn = userElementCard.querySelector('.element__remove-btn');

  elementTitle.textContent = item.name;
  elementImage.src = item.link;
  elementImage.alt = item.name;
  likeBtn.addEventListener('click', function () { likeBtn.classList.toggle('element__like_active') });
  removeBtn.addEventListener('click', function () { removeBtn.closest('.element').remove() })

  elementImage.addEventListener('click', function () {
    openFullSizeImg();
    fullSizeImg.src = elementImage.src;
    fullSizeImgTitle.textContent = elementTitle.textContent;
    fullSizeImg.alt = elementTitle.textContent;
  })

  return userElementCard;
}

//наполнение дефолтными карточками
for (let i = 0; i < initialCards.length; i++) {
  const userElementCard = createCard(initialCards[i]);
  elementsGallery.append(userElementCard);
}

//функционал добавления карточки через «сохранить» 
function handleNewCardViaSubmit(evt) {
  evt.preventDefault();

  if (cardTitle.value === '' || cardLink.value === '') {
    closeAddingCard();
  }
  else {
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
}

//функционал открытия попапа
const openPopup = function (item) {
  item.classList.add('popup_opened');
};

//функционал закрытия попапа
const closePopup = function (item) {
  item.classList.remove('popup_opened');
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
const closeAllPopups = () => {
  closePopup(profilePopup);
  closePopup(popupAddNewCard);
  closePopup(popupFullSizeImg);
};
document.addEventListener('keydown', function(evt){
  if(evt.code == 'Escape' ){
    closeAllPopups();
  }
})

//открыть добавить карточку
function openAddingCard() {
  openPopup(popupAddNewCard);
  submitAddCard.reset()
};

//закрыть добавить карточку
function closeAddingCard() {
  closePopup(popupAddNewCard);
};

//открыть редактировать профиль
function openProfileEdit(evt) {
  const inputErrors = document.querySelectorAll('.form__input_error');
  inputErrors.forEach((inputError) => {inputError.textContent=""})
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


editProfileBtn.addEventListener('click', openProfileEdit);

openAddNewCardBtn.addEventListener('click', openAddingCard);

profileForm.addEventListener('submit', handleProfileFormSubmit);
submitAddCard.addEventListener('submit', handleNewCardViaSubmit);