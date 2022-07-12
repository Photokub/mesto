const popup = document.querySelector('.popup');
const popupFullSizeImg = document.querySelector('.popup_full-size-image');
const popupAddNewCard = document.querySelector('.popup_add-new-card');
const openPopupBtn = document.querySelector('.profile__edit-btn');
const openAddNewCardBtn = document.querySelector('.profile__add-btn');
const closePopupBtn = popup.querySelector('.popup__close');
const closeAddCardBtn = document.querySelector('.popup__close_add-new-card')
const openFullSizeImgBtn = document.querySelector('.element__image')
const closeFullSizeImgBtn = popupFullSizeImg.querySelector('.popup__close_full-size-image')

const elementsGallery = document.querySelector('.elements');

const cardElementTemplate = document.querySelector('#element-card').content;

const submitBtn = popup.querySelector('.form__save-btn');
const submitForm = popup.querySelector('.form');
const submitAddCard = popupAddNewCard.querySelector('.form_add-new-card');
let userName = document.querySelector('.profile__title');
let userJob = document.querySelector('.profile__subtitle');
let userNameInput = popup.querySelector('.form__input_type_name');
let userJobInput = popup.querySelector('.form__input_type_job');
let cardTitle = popupAddNewCard.querySelector('.form__input_type_title');
let cardLink = popupAddNewCard.querySelector('.form__input_type_link');

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


//создаются дефолтные карточки
const addCardDefault = function(arr){
  for(let i=0; i<initialCards.length; i++){
      const userElementCard = cardElementTemplate.querySelector('.element').cloneNode(true);
      userElementCard.querySelector('.element__title').textContent = initialCards[i].name;
      userElementCard.querySelector('.element__image').src = initialCards[i].link;
      userElementCard.querySelector('.element__image').alt = userElementCard.querySelector('.element__title').textContent;

      elementsGallery.append(userElementCard);
  }
};

//добавляются дефолтные карточки
addCardDefault(initialCards); 

//лайки
elementsGallery.addEventListener('click', function(evt){
  if(!evt.target.classList.contains('element__like')) return
  else if(evt.target.classList.contains('element__like_active')){
    evt.target.classList.remove('element__like_active')
  }else{evt.target.classList.add('element__like_active')}
}
);

//кнопка удалить
elementsGallery.addEventListener('click', function(evt){
  if(!evt.target.classList.contains('element__remove-btn')) return
  else if(evt.target.classList.contains('element__remove-btn')){
    evt.target.parentNode.remove();
  }
}
); 

//клик на изображение
const fullSizeImg = document.querySelector('.popup__fullsize-img-picture');
const fullSizeImgTitle = document.querySelector('.popup__fullsize-img-caption');

document.addEventListener('click', function(evt){
  if(!evt.target.classList.contains('element__image')) return
  else{
    openFullSizeImg();
    fullSizeImg.src = evt.target.src;
    fullSizeImgTitle.textContent = evt.target.parentNode.textContent;
  }
}
);

//функционал открытия попапа
const openPopupVisibility = function(item){
    userNameInput.value = userName.textContent;
    userJobInput.value = userJob.textContent;
    item.classList.add('popup_opened');
};

//функционал закрытия попапа
const closePopupVisibility = function(item){
  item.classList.remove('popup_opened');
};

//открыть добавить карточку
function openAddingCard(){
  cardTitle.value = "Название";
  cardLink.value = "Ссылка на картинку";
  openPopupVisibility(popupAddNewCard);
};

//закрыть добавить карточку
function closeAddingCard(){
  closePopupVisibility(popupAddNewCard);
};

//открыть редактировать профиль
function openProfileEdit(){
  userNameInput.value = userName.textContent;
  userJobInput.value = userJob.textContent;
  openPopupVisibility(popup);
};

//закрыть редактировать профиль
function closeProfileEdit(){
  closePopupVisibility(popup);
};

//открыть большую картинку
function openFullSizeImg(){
  openPopupVisibility(popupFullSizeImg);
};

//закрыть большую картинку
function closeFullSizeImg(){
  closePopupVisibility(popupFullSizeImg);
};

//функционал кнопки «сохранить» в редактировании профиля
function formSubmit(evt){
    evt.preventDefault();
    userName.textContent = userNameInput.value;
    userJob.textContent = userJobInput.value;
    closeProfileEdit();
}

//создание новой карточки
function createCard(){
  const userElementCard = cardElementTemplate.querySelector('.element').cloneNode(true);
  userElementCard.querySelector('.element__title').textContent = cardTitle.value;
  userElementCard.querySelector('.element__image').src = cardLink.value;
  userElementCard.querySelector('.element__image').alt = userElementCard.querySelector('.element__title').textContent;
  return userElementCard;
}

//функционал кнопки «сохранить» в добавлении карточки
function cardSubmit(evt){
  evt.preventDefault();
  if(cardTitle.value === 'Название' || cardLink.value === 'Ссылка на картинку'){    
    closeAddingCard();
  }
  else{
  elementsGallery.append(createCard());  
  closeAddingCard();
}
}

openPopupBtn.addEventListener('click', openProfileEdit);
closePopupBtn.addEventListener('click', closeProfileEdit);

openAddNewCardBtn.addEventListener('click', openAddingCard);
closeAddCardBtn.addEventListener('click', closeAddingCard);

closeFullSizeImgBtn.addEventListener('click', closeFullSizeImg);

submitForm.addEventListener('submit', formSubmit);
submitAddCard.addEventListener('submit', cardSubmit);