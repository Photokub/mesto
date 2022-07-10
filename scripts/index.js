const popup = document.querySelector('.popup');
const popupAddNewCard = document.querySelector('.popup_add-new-card');
const openPopupBtn = document.querySelector('.profile__edit-btn');
const openAddNewCardBtn = document.querySelector('.profile__add-btn');
const closePopupBtn = popup.querySelector('.popup__close');
const closeAddCardBtn = document.querySelector('.popup__close_add-new-card')


const elementsGallery = document.querySelector('.elements');
//const removeItemBtn = document.querySelectorAll('.element__remove-btn');

const cardElementTemplate = document.querySelector('#element-card').content;


const submitBtn = popup.querySelector('.form__save-btn');
const submitForm = popup.querySelector('.form');
const submitAddCard = popupAddNewCard.querySelector('.form_add-new-card');
let userName = document.querySelector('.profile__title');
let userJob = document.querySelector('.profile__subtitle');
let userNameInput = popup.querySelector('.form__input_type_name');
let userJobInput = popup.querySelector('.form__input_type_job');

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

// //кнопка удалить
// elementsGallery.addEventListener('click', function(evt){
//   if(!evt.target.classList.contains('element__remove-btn')) return
//   else if(evt.target.classList.contains('element__like_active')){
//     evt.target.classList.remove('element__like_active')
//   }else{evt.target.classList.add('element__like_active')}
// }
// );

//открытие попапа
const openPopupVisibility = function(item){
    userNameInput.value = userName.textContent;
    userJobInput.value = userJob.textContent;
    item.classList.add('popup_opened');
};

//закрытие попапа
const closePopupVisibility = function(item){
  item.classList.remove('popup_opened');
};

//открыть добавить карточку
function openAddingCard(){
  openPopupVisibility(popupAddNewCard);
};

//закрыть добавить карточку
function closeAddingCard(){
  closePopupVisibility(popupAddNewCard);
};

//открыть редактировать профиль
function openProfileEdit(){
  openPopupVisibility(popup);
};

//закрыть редактировать профиль
function closeProfileEdit(){
  closePopupVisibility(popup);
};

//функционал кнопки «сохранить» в редактировании профиля
function formSubmit(evt){
    evt.preventDefault();
    userName.textContent = userNameInput.value;
    userJob.textContent = userJobInput.value;
    closePopupVisibility(closeProfileEdit());
}

//создание новой карточки
function createCard(){
  const userElementCard = cardElementTemplate.querySelector('.element').cloneNode(true);
  userElementCard.querySelector('.element__title').textContent = popupAddNewCard.querySelector('.form__input_type_title').value;
  userElementCard.querySelector('.element__image').src = popupAddNewCard.querySelector('.form__input_type_link').value;
  userElementCard.querySelector('.element__image').alt = userElementCard.querySelector('.element__title').textContent;
  return userElementCard;
}

//функционал кнопки «сохранить» в добавлении карточки
function formSubmit(evt){
  evt.preventDefault();
 elementsGallery.append(createCard());
  closePopupVisibility(closeAddingCard());
}



openPopupBtn.addEventListener('click', openProfileEdit);
openAddNewCardBtn.addEventListener('click', openAddingCard);

closePopupBtn.addEventListener('click', closeProfileEdit);
closeAddCardBtn.addEventListener('click', closeAddingCard);

submitForm.addEventListener('submit', formSubmit);
submitAddCard.addEventListener('submit', formSubmit);







// let likes = document.querySelectorAll('.element__like');

// function activeLike(evt){
//   evt.target.classList.toggle('element__like_active')
// }

// likes.forEach((like) => {like.addEventListener('click', activeLike)});





