class Card {
  constructor(cardInfo) {
    this.name = cardInfo.name;
    this.link = cardInfo.link;

    this.cardHolder = document.createElement('div');
    this.cardHolder.classList.add('place-card');
        //img
    this.cardImg = document.createElement('div');
    this.cardImg.classList.add('place-card__image');
    this.cardImg.style.backgroundImage = `url(${this.link})`;
    this.deleteButton = document.createElement('button');
    this.deleteButton.classList.add('place-card__delete-icon');
    this.deleteButton.addEventListener('click', this.remove);
    this.cardImg.appendChild(this.deleteButton);
        //name
    this.description = document.createElement('div');
    this.description.classList.add('place-card__description');
    this.cardName = document.createElement('h3');
    this.cardName.classList.add('place-card__name');
    this.cardName.textContent = this.name;
    this.likeButton = document.createElement('button');
    this.likeButton.classList.add('place-card__like-icon');

    this.likeButton.addEventListener('click', this.like);

    this.description.appendChild(this.cardName);
    this.description.appendChild(this.likeButton);
    this.cardHolder.appendChild(this.cardImg);
    this.cardHolder.appendChild(this.description);
  };

  like() {
    this.classList.toggle('place-card__like-icon_liked');
  };

  remove() {
    this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);
  };

  create(containers) {
    return containers.appendChild(this.cardHolder);
  };
};

class CardList {
  constructor(container, array) {
      array.forEach((n)=>{
        n = new Card(n);
        n.create(container);
      });
  };

  addCard () {

  };

  render () {

  };
};

class Popup {
  open () {

  };

  close () {

  };
}


const initialCards = [{
  name: 'Архыз',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
}, {
  name: 'Челябинская область',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
}, {
  name: 'Иваново',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
}, {
  name: 'Камчатка',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
}, {
  name: 'Холмогорский район',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
}, {
  name: 'Байкал',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
}, {
  name: 'Нургуш',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/khrebet-nurgush.jpg'
}, {
  name: 'Тулиновка',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/tulinovka.jpg'
}, {
  name: 'Остров Желтухина',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/zheltukhin-island.jpg'
}, {
  name: 'Владивосток',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/vladivostok.jpg'
}];

//card
const container = document.querySelector('.places-list');
//popup
const pop = document.querySelector('.popup__add-img');
const addButton = document.querySelector('.user-info__button');
const closeButton = pop.querySelector('.popup__close');
//form
const form = document.forms.new;
const nameOfUrl = form.elements.name;
const src = form.elements.link;
const btnImg = form.querySelector('.button__for-img');

let test = new CardList(container, initialCards);
/// for button at img popup///
function btnCheker() {
  if (!nameOfUrl.value.length == 0 && !src.value.length == 0 ) {
      btnImg.classList.add('button__active');
  } else {
    btnImg.classList.remove('button__active');
  }
};

// initialCards.forEach(function(n) {
//   let cardName = n.name;
//   let cardImg = n.link;

//   //generateCard(cardName, cardImg);
// });

function addCard() {
  event.preventDefault();
  const card = { name: nameOfUrl.value, link: src.value };
  generateCard(nameOfUrl.value, src.value);
  initialCards.push(card);
  pop.classList.remove('popup_is-opened');
  form.reset();
};

// function generateCard(name, img) {
//   const cardHolder = document.createElement('div');
//   cardHolder.classList.add('place-card');
//   //img
//   const cardImg = document.createElement('div');
//   cardImg.classList.add('place-card__image');
//   cardImg.style.backgroundImage = `url(${img})`;
//   const deleteButton = document.createElement('button');
//   deleteButton.classList.add('place-card__delete-icon');
//   cardImg.appendChild(deleteButton);
//   //name
//   const description = document.createElement('div');
//   description.classList.add('place-card__description');
//   const cardName = document.createElement('h3');
//   cardName.classList.add('place-card__name');
//   cardName.textContent = name;
//   const likeButton = document.createElement('button');
//   likeButton.classList.add('place-card__like-icon');
//   description.appendChild(cardName);
//   description.appendChild(likeButton);
//   cardHolder.appendChild(cardImg);
//   cardHolder.appendChild(description);

//   return container.appendChild(cardHolder);
// };

//form

form.addEventListener('submit', addCard);
nameOfUrl.addEventListener('input', btnCheker);
src.addEventListener('input', btnCheker);


//card like .
// container.addEventListener('click',   function(e) {
//     if (e.target.classList.contains('place-card__like-icon')) {
//       e.target.classList.toggle('place-card__like-icon_liked');
//     }
// });

//card trash can
// container.addEventListener('click', function(e) {
//   if (e.target.classList.contains('place-card__delete-icon')) {
//     const img = e.target.parentNode;
//     const card = img.parentNode;
//     container.removeChild(card);
//   }
// });

/*/// img pop ///*/
container.addEventListener('click', function(e) {
  if(e.target.classList.contains('place-card__image')) {
    const img = e.target;

    const root = document.querySelector('.root');

    const popup = document.createElement('div');
    popup.classList.add('popup_is-opened');
    popup.classList.add('popup');

    const container = document.createElement('div');
    // Можно лучше: Пракрасно, что вы создаете попап в качетсве шаблона, но некоторые вещи можно оптимизировать, например,
    // перенести в css стили, а при создании добавлять класс
    container.setAttribute('style', 'display: flex;');

    const popupImg = document.createElement('img');
    popupImg.setAttribute('style', 'max-width: 80vw; max-height: 80vh;');
    let a = img.style.backgroundImage;
    a = a.substring(5, (a.length - 2));
    popupImg.setAttribute('src', a);
    container.appendChild(popupImg);

    const button = document.createElement('img');
    button.classList.add('popup__close');
    button.setAttribute('src', './images/close.svg');
    button.setAttribute('style', 'position: relative; align-self: baseline; right: 0px;')
    container.appendChild(button);

    popup.appendChild(container);
    root.appendChild(popup);

    button.addEventListener('click', () => {popup.classList.remove('popup_is-opened');});
  }
})

//popup

addButton.addEventListener('click', function() {
  pop.classList.add('popup_is-opened');
});
closeButton.addEventListener('click', function() {
  pop.classList.remove('popup_is-opened');
});

/*/// Edit btn  ///*/

const profile = document.querySelector('.profile');
const editBtn = profile.querySelector('.user-info__edit-btn');

const popEdit = document.querySelector('.popup__for-edit');
const closeButtonEdit = popEdit.querySelector('.popup__close');
const saveAboutMe = document.querySelector('.popup__button');

///edit form elements///
const editForm = document.forms.edit;

const editName = editForm.elements.name;
const editAboutMe = editForm.elements.about;

///value for edit form ///

const name = profile.querySelector('.user-info__name');
const aboutMe = profile.querySelector('.user-info__job');

/// form active ///
function activeBtn () {
  if (validator(editName) && validator(editAboutMe)) {
    saveAboutMe.removeAttribute('disabled');
    saveAboutMe.classList.add('button__active');
  } else {    
      saveAboutMe.setAttribute('disabled', true);
      saveAboutMe.classList.remove('button__active');
  }
}

/// Validation ///

function validator (e) {
  const error = document.querySelector(`#error-${e.id}`);

  if (!e.checkValidity()) {
      if (e.value.length === 0) {
        error.textContent = 'Это обязательное поле';
      } else {
        error.textContent = 'Должно быть от 2 до 30 символов'
      }
      return false;
  }

  error.textContent = '';

  return true;
};

function profileEditor(e) {
    event.preventDefault();

    const inputs = Array.from(editForm.elements);    
   
    let valid = true;

    inputs.forEach((e) => {
      if (e.id !== saveAboutMe.id) {
        if (!validator(e)) { 
          valid = false;
        }
      } 
    });

    if (valid) {
      name.textContent = editName.value;
      aboutMe.textContent = editAboutMe.value;

      saveAboutMe.classList.remove('button__active');
      popEdit.classList.remove('popup_is-opened'); 
    }

    editForm.reset();
}


/// listener for edit ///

editBtn.addEventListener('click', () => {
  editName.value = name.textContent;
  editAboutMe.value = aboutMe.textContent;
  saveAboutMe.classList.add('button__active');
  popEdit.classList.add('popup_is-opened');
});

closeButtonEdit.addEventListener('click', () => {
  popEdit.classList.remove('popup_is-opened');
});

saveAboutMe.setAttribute('style', 'font-size: 18px;');

editForm.addEventListener('input', activeBtn)

saveAboutMe.addEventListener('click', profileEditor);

/* В целом по работе:

Отлично!

    Весь функционал работает корректно
    Код чистый и хорошо читается
    Вы используете логические группировки операций
    У вас нет дублирование кода
    Вы не используете небезопасный innerHtml
    Вы используете делегирование
    Вы валидируете ввод пользователя

    Принято

*/

