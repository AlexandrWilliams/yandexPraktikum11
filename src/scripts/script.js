import {api, serverUrl} from "./api.js";//api
import {Card, CardList} from "./card.js";//card builder
import {Popup} from "./popup.js";//popup
import {validator, profileEditorHandler} from "./validationAndEdit.js";//Profile edit And Validation

//asking for card
api.getInitialCards()
          .then((res) => {
          new CardList(api.cardHolder, res);
        })
        .catch((err) => {console.log(err)});
//card
const container = document.querySelector('.places-list');
//popup
const pop = document.querySelector('.popup__add-img');
const addButton = document.querySelector('.user-info__button');

const formPic = new Popup(pop, addButton, false);

//form
const form = document.forms.new;
const nameOfUrl = form.elements.name;
const src = form.elements.link;
const btnImg = form.querySelector('.button__for-img');

const buildContent = new CardList(container, []);
/// for button at img popup///
function btnCheker() {
  if (!nameOfUrl.value.length == 0 && !src.value.length == 0 ) {
      btnImg.classList.add('button__active');
  } else {
    btnImg.classList.remove('button__active');
  }
};

//form

form.addEventListener('submit', buildContent.addCard);
nameOfUrl.addEventListener('input', btnCheker);
src.addEventListener('input', btnCheker);

/*/// img pop ///*/
container.addEventListener('click', function(e) {
  if(e.target.classList.contains('place-card__image')) {
    const img = e.target;

    const root = document.querySelector('.root');

    const popup = document.createElement('div');
    popup.classList.add('popup_is-opened');
    popup.classList.add('popup');

    const container = document.createElement('div');
    container.classList.add('popup-img__container');

    const popupImg = document.createElement('img');
    popupImg.classList.add('popup-img__image');
    let a = img.style.backgroundImage;
    a = a.substring(5, (a.length - 2));
    popupImg.setAttribute('src', a);
    container.appendChild(popupImg);

    const button = document.createElement('img');
    button.classList.add('popup__close');
    button.setAttribute('src', require('../images/close.svg'));
    button.setAttribute('style', 'position: relative; align-self: baseline; right: 0px;');
    container.appendChild(button);

    popup.appendChild(container);
    root.appendChild(popup);

    button.addEventListener('click', () => {popup.classList.remove('popup_is-opened');});
  }
})


const saveAboutMe = document.querySelector('.popup__button');

// ///edit form elements///
const editForm = document.forms.edit;

const editName = editForm.elements.name;
const editAboutMe = editForm.elements.about;

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

/// listener for edit ///

saveAboutMe.setAttribute('style', 'font-size: 18px;');

editForm.addEventListener('input', activeBtn)

saveAboutMe.addEventListener('click', profileEditorHandler);