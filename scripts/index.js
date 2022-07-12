const popup = document.querySelector('.profile-popup');
const popupFullSizeImg = document.querySelector('.popup_full-size-image');
const popupAddNewCard = document.querySelector('.popup_add-new-card');
const openPopupBtn = document.querySelector('.profile__edit-btn');
const openAddNewCardBtn = document.querySelector('.profile__add-btn');
const closePopupBtn = popup.querySelector('.popup__close');
const closeAddCardBtn = document.querySelector('.popup__close_add-new-card')
//const openFullSizeImgBtn = document.querySelector('.element__image')
const closeFullSizeImgBtn = popupFullSizeImg.querySelector('.popup__close_full-size-image')

const elementsGallery = document.querySelector('.elements');

const cardElementTemplate = document.querySelector('#element-card').content;

// const elementLikeBtn = document.querySelector('.element__like')

const submitBtn = popup.querySelector('.form__save-btn');
const profileForm = popup.querySelector('.form');
const submitAddCard = popupAddNewCard.querySelector('.form_add-new-card');
const userName = document.querySelector('.profile__title');
const userJob = document.querySelector('.profile__subtitle');
const userNameInput = popup.querySelector('.form__input_type_name');
const userJobInput = popup.querySelector('.form__input_type_job');
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

//создаются дефолтные карточки
const renderInitialCards = function(arr){
  for(let i=0; i<initialCards.length; i++){
      const userElementCard = cardElementTemplate.querySelector('.element').cloneNode(true);
      const likeBtn = userElementCard.querySelector('.element__like');
      const removeBtn = userElementCard.querySelector('.element__remove-btn');

      // const fullSizeImg = userElementCard.querySelector('.popup__fullsize-img-picture');
      // const fullSizeImgTitle = userElementCard.querySelector('.popup__fullsize-img-caption');
      const openFullSizeImgBtn = userElementCard.querySelector('.element__image');      

      userElementCard.querySelector('.element__title').textContent = initialCards[i].name;
      openFullSizeImgBtn.src = initialCards[i].link;
      openFullSizeImgBtn.alt = userElementCard.querySelector('.element__title').textContent;    
      
      likeBtn.addEventListener('click', function(){likeBtn.classList.toggle('element__like_active')})
      removeBtn.addEventListener('click', function(){removeBtn.closest('.element').remove()})

      //починить полноразмерное фото
      // openFullSizeImgBtn.addEventListener('click', function(evt){ 
      //   openFullSizeImg()       
      //   fullSizeImg.src = evt.target.src;
      //   fullSizeImgTitle.textContent = openFullSizeImgBtn.parentNode.textContent        
      // })

      elementsGallery.append(userElementCard);
  }
};

//добавляются дефолтные карточки
renderInitialCards(initialCards); 

// //лайки
// elementsGallery.addEventListener('click', function(evt){
//   if(!evt.target.classList.contains('element__like')) return
//   else if(evt.target.classList.contains('element__like_active')){
//     evt.target.classList.remove('element__like_active')
//   }else{evt.target.classList.add('element__like_active')}
// }
// );

// //кнопка удалить
// elementsGallery.addEventListener('click', function(evt){
//   if(!evt.target.classList.contains('element__remove-btn')) return
//   else if(evt.target.classList.contains('element__remove-btn')){
//     evt.target.parentNode.remove();
//   }
// }
// ); 

// //клик на изображение
// const fullSizeImg = document.querySelector('.popup__fullsize-img-picture');
// const fullSizeImgTitle = document.querySelector('.popup__fullsize-img-caption');

// document.addEventListener('click', function(evt){
//   if(!evt.target.classList.contains('element__image')) return
//   else{
//     openFullSizeImg();
//     fullSizeImg.src = evt.target.src;
//     fullSizeImgTitle.textContent = evt.target.parentNode.textContent;
//   }
// }
// );

//функционал открытия попапа
const openPopup = function(item){
    item.classList.add('popup_opened');
};

//функционал закрытия попапа
const closePopup = function(item){
  item.classList.remove('popup_opened');
};

//открыть добавить карточку
function openAddingCard(){
  openPopup(popupAddNewCard);
};

//закрыть добавить карточку
function closeAddingCard(){
  closePopup(popupAddNewCard);
};

//открыть редактировать профиль
function openProfileEdit(){
  userNameInput.value = userName.textContent;
  userJobInput.value = userJob.textContent;
  openPopup(popup);
};

//закрыть редактировать профиль
function closeProfileEdit(){
  closePopup(popup);
};

//открыть большую картинку
function openFullSizeImg(){
  openPopup(popupFullSizeImg);
};

//закрыть большую картинку
function closeFullSizeImg(){
  closePopup(popupFullSizeImg);
};

//функционал кнопки «сохранить» в редактировании профиля
function handleProfileFormSubmit(evt){
    evt.preventDefault();
    userName.textContent = userNameInput.value;
    userJob.textContent = userJobInput.value;
    closeProfileEdit();
}

//создание новой карточки
function createCard(){
  const userElementCard = cardElementTemplate.querySelector('.element').cloneNode(true);
  const elementImage = userElementCard.querySelector('.element__image');
  const likeBtn = userElementCard.querySelector('.element__like');
  const removeBtn = userElementCard.querySelector('.element__remove-btn');

  userElementCard.querySelector('.element__title').textContent = cardTitle.value;
  elementImage.src = cardLink.value;
  elementImage.alt = userElementCard.querySelector('.element__title').textContent;
  likeBtn.addEventListener('click', function(){likeBtn.classList.toggle('element__like_active')});
  removeBtn.addEventListener('click', function(){removeBtn.closest('.element').remove()})

  return userElementCard;
}

//функционал кнопки «сохранить» в добавлении карточки
function cardSubmit(evt){
  evt.preventDefault();
  if(cardTitle.value === '' || cardLink.value === ''){    
    closeAddingCard();
  }
  else{
  elementsGallery.prepend(createCard());  
  closeAddingCard();
}
}

openPopupBtn.addEventListener('click', openProfileEdit);
closePopupBtn.addEventListener('click', closeProfileEdit);

openAddNewCardBtn.addEventListener('click', openAddingCard);
closeAddCardBtn.addEventListener('click', closeAddingCard);

closeFullSizeImgBtn.addEventListener('click', closeFullSizeImg);

profileForm.addEventListener('submit', handleProfileFormSubmit);
submitAddCard.addEventListener('submit', cardSubmit);