import {buildContent, form, nameOfUrl, src, pop} from "./script.js";

//card Creator//
class Card {
  constructor(cardInfo) {
    this.name = cardInfo.name;
    this.link = cardInfo.link;
  };

  like() {
    this.classList.toggle('place-card__like-icon_liked');
  };

  remove() {
    this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);
  };

  create(containers) {
    this.cardHolder = document.createElement('div');
    this.cardHolder.classList.add('place-card');
    /* Замечания по прошлому спринту: данные приходящие с сервера вставляются на страницу
    с помощью innerHTML, а это не безопасно. 
    Подробнее https://developer.mozilla.org/ru/docs/Web/API/Element/innerHTML см. раздел Соображения безопасности
    */
    this.card = `
        <div class="place-card__image" style="background-image: url(${this.link})">
          <button class="place-card__delete-icon"></button>
        </div>
        <div class="place-card__description">
          <h3 class="place-card__name">${this.name}</h3>
          <button class="place-card__like-icon"></button>
        </div>
    `;
    this.cardHolder.innerHTML = this.card;
    this.deleteButton = this.cardHolder.querySelector('.place-card__delete-icon');
    this.likeButton = this.cardHolder.querySelector('.place-card__like-icon');
    
    this.deleteButton.addEventListener('click', this.remove);
    this.likeButton.addEventListener('click', this.like);

    return containers.appendChild(this.cardHolder);
  };
};
//generator Card//
class CardList {
  constructor(container, array) {
      this.container = container;
      this.array = array;
      this.array.forEach((n)=>{
        this.render(n);
      });
  };
  //add card from form
  addCard () {
    event.preventDefault();
    let n = new Card({ name: nameOfUrl.value, link: src.value});
    buildContent.array.push({ name: nameOfUrl.value, link: src.value});
    buildContent.render(n);
    pop.classList.remove('popup_is-opened');
    form.reset();
  };

  render (n) {
        const newCard = new Card(n);
        newCard.create(this.container);
  };
};

export {Card, CardList};