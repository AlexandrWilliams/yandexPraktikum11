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

//server URL
const serverUrl = NODE_ENV === 'development' ? 'http://praktikum.tk/cohort4/' : 'https://praktikum.tk/cohort4/';

const api = new API({
  //Access to server 
  baseUrl : serverUrl,
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

export {api, serverUrl};