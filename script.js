// API //
class API {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers =  options.headers;

    /* Можно лучше: т.к. теперь класс API не работает со страницей а только возвращает результат,
    передавать в его конструктор элементы страницы не требуется */
    // Person
    this.name = options.name;
    this.job = options.job;
    this.avatar = options.avatar;
    // Card
    this.cardHolder = options.cardHolder;
    this.builder;
  }

  getInitialCards() {
     return fetch(`${this.baseUrl}cards`, {
        headers: this.headers
      })
        .then( (res) => { 
          if (res.ok) {
            return res.json();
          } 
          return Promise.reject(`Ошибка: ${res.status}`);
        });
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}users/me`, {
      headers: this.headers
    })
      .then( (res) => { 
        if (res.ok) {
          return res.json();
        } 
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  upDateUserInfo(name, job) {
    return fetch(`${this.baseUrl}users/me`, {
      method: 'PATCH',
      /* Можно лучше: в конструктор класса передаются заголовки вместе с ключом авторизации
      нужно использовать this.headers*/
      headers: {
        authorization: '7533633d-b209-410b-9d86-b742b3e4e013',
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify({
        name: `${name}`,
        about: `${job}`,
      })
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } return Promise.reject(`Error:${res.status}`);
      });
  };

}

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

const api = new API({
  //Access to server 
  baseUrl : 'http://95.216.175.5/cohort4/',
  headers :  {
      authorization: '7533633d-b209-410b-9d86-b742b3e4e013',
      'Content-Type': 'application/json'
    } ,
  //Person
  name: document.querySelector('.user-info__name'),
  job: document.querySelector('.user-info__job'),
  avatar: document.querySelector('.user-info__photo'),
  //Card
  cardHolder: document.querySelector('.places-list'),
});

api.getUserInfo() 
  .then((res) => {
    /* Можно лучше: нет смысла передавать в класс api ссылки на DOM элементы, а затем брать их из класса
    api для вставки в них данные. Здесь можно просто напрямую обращаться к элементам, классу Api не нужно ничего знать
    о элементах на странице - он просто посылает запрос и возвращает ответ, что будет с этими данными не его задача  */
        api.name.textContent = res.name;
        api.job.textContent = res.about;
        api.avatar.style.backgroundImage = `url('${res.avatar}')`;
      })
  .catch((err) => console.log(err));

api.getInitialCards()
          .then((res) => {
          /* Можно лучше:  api.builder больше нигде не используется в программе, можно убрать присвоение ему списка карточек */  
           api.builder = new CardList(api.cardHolder, res);
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
    // Можно лучше: Пракрасно, что вы создаете попап в качетсве шаблона, но некоторые вещи можно оптимизировать, например,
    // перенести в css стили, а при создании добавлять класс
    // done
    container.classList.add('popup-img__container');

    const popupImg = document.createElement('img');
    popupImg.classList.add('popup-img__image');
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



/// Profile ///
const profile = document.querySelector('.profile');

///value for edit form ///

const name = profile.querySelector('.user-info__name');
const aboutMe = profile.querySelector('.user-info__job');
/*/// Edit btn  ///*/
const editBtn = profile.querySelector('.user-info__edit-btn');

const popEdit = document.querySelector('.popup__for-edit');
const popEditOpenClose = new Popup(popEdit, editBtn, true);
//const closeButtonEdit = popEdit.querySelector('.popup__close');
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

/// Validation ///
const langRu = { 
  validationLenght: 'Должно быть от 2 до 30 символов',
  required: 'Это обязательное поле'
  }

function validator (e) {
  const error = document.querySelector(`#error-${e.id}`);

  if (!e.checkValidity()) {
      if (e.value.length === 0) {
        error.textContent = langRu.required;
      } else {
        error.textContent = langRu.validationLenght;
      }
      return false;
  }

  error.textContent = '';

  return true;
};

function profileEditorHandler(e) {
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
      api.upDateUserInfo(editName.value, editAboutMe.value)
          .then((res) => {
            name.textContent = res.name;
            aboutMe.textContent = res.about;
            saveAboutMe.classList.remove('button__active');
            popEdit.classList.remove('popup_is-opened');    
          })
          .catch(err => {
            console.log(err);
          });
    }

    editForm.reset();
}


/// listener for edit ///

saveAboutMe.setAttribute('style', 'font-size: 18px;');

editForm.addEventListener('input', activeBtn)

saveAboutMe.addEventListener('click', profileEditorHandler);



/*
  По работе 9:
  
  Хорошая работа, большинство замечаний исправлено верно, но также лучше было 
  убрать из класса Api ссылки на DOM элементы, они не относятся к функционалу запроса на сервер.
  Так же есть замечание по использованию innerHTML, которое по всей видимости было пропущено на прошлых
  ревью, в т.ч. на моем первом ревью. Вставлять данные приходящие с сервера через innerHTML не безопасно.

  Для закрепления полученных знаний советую сделать и оставшуюся часть задания.
  Так же если у Вас будет свободное время попробуйте переписать работу с сервером
  применив async/await для работы с асинхронными запросами.
  https://learn.javascript.ru/async-await
  https://habr.com/ru/company/ruvds/blog/414373/
  Это часто используется в реальной работе

*/









/*
  По работе 9:

  Обязательная часть работы выполнена и работает не вызывая ошибок, это отлично.
  Но к организации кода есть некоторые замечания:
  
  Места где надо исправить:
  - при отправке данных пользователя на сервер, данные должны обновляться на 
  странице только после ответа сервера, попап закрываться должен тоже после ответа сервера
  //done

  Где можно сделать лучше:
  - не хардкодить адрес сервера в каждом методе, а передавать его в конструктор класса
  - вынести работу с DOM из класса API, оставив в нем только обмен с сервером
  //done? +

*/

















/**
 * 
 * Здравствуйте. 
 * Вам ревьювер написал как сделать лучше, Вынести все стили в css и добавить добавлять в класс
 * Это сделано для того чтобы при верстке не мешать логику и стили. Это важный момент //done
 * 
 *Можно лучше. То что находится в addEventListener необходимо вынести в отдельный метод класса
 *Вы в будущем можете переиспользовать эти методы по необходимости //done right???
 *  
 * Можно лучше: обычно названия, для примера 'Должно быть от 2 до 30 символов' 
 * выносят в отдельный объект. Допустим может появится задача сделать многоязычный сайт
 * Для примера : const lang = { validationLenght: 'Должно быть от 2 до 30 символов' } //done
 *  
 * initialCards в отдельный файл, меньше строк, больше понимание, 
 * подключить его можно через  <script src="js/initialCards.js"></script> //done

 * В классе class Card вы используете конструктор не по назначению. Конструктор предназначен в первую очередь для инициализации переменных
 * и только в крайнем случаи для действий. //done
 * 
 * Не очень хорошая идея создавать виртуальный DOM при создании карточки, используйте лучше шаблон. 
 * Для примера можете посмотреть здесь https://wesbos.com/template-strings-html/ //done???
 * 
 *  * Можно лучше: принято называть обработчики событий c приставкой handle или со словом handler
 * например handleCardSubmit, onSubmitCardHandler, так из названия сразу понятно, что это 
 * обработчик события, а не просто функция которую можно вызвать
 * В первую очередь это каcается функций, которые принимаю параметр event //done???
 * 
 * 
 * Работу я принимаю, так как сам проект работчий ;)
 * 
 * Надеюсь вы учтёте мои рекомендации и доведёте проект до логического конца
 * 
 */