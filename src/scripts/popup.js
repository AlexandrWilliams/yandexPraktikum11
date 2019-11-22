//Popup caller
class Popup {
  constructor(popup, caller, integrateContent) {
    this.popup = popup;
    this.openButton = caller;
    this.openCall = this.open.bind(this);
    this.closeCall = this.close.bind(this);
    this.closeButton = this.popup.querySelector('.popup__close');
    this.form = this.popup.querySelector('.popup__form');
    this.integrateContent = integrateContent;

    this.setEventListener();
  };

  generateInputValue() {
    if (this.integrateContent) {
        this.form.elements[0].value = name.textContent;
        this.form.elements[1].value = aboutMe.textContent;
        this.form.elements[2].classList.add('button__active');
    }
  }

  setEventListener(){
    this.openButton.addEventListener('click', this.openCall);
    this.closeButton.addEventListener('click', this.closeCall);
  }

  open () {
    this.popup.classList.add('popup_is-opened');
    this.generateInputValue();
  };

  close () {
    this.popup.classList.remove('popup_is-opened');
  };
};

/// Profile ///
const profile = document.querySelector('.profile');

///value for edit form ///

const name = profile.querySelector('.user-info__name');
const aboutMe = profile.querySelector('.user-info__job');

/*/// Edit btn  ///*/
const editBtn = profile.querySelector('.user-info__edit-btn');

const popEdit = document.querySelector('.popup__for-edit');
const popEditOpenClose = new Popup(popEdit, editBtn, true);

export {Popup, name, aboutMe, popEdit};