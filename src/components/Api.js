export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
    this._token = options.headers.authorization;
    this._content_type ='application/json';
    this._fetch = (link, method = 'GET', body = undefined) => fetch(`${this._baseUrl}/${link}`, {
      method: method,
      headers: {
        authorization: this._token
      }
    })
      .then(res => {
        if (res.ok) {
            return res.json();

        }
          return Promise.reject(`Ошибка: ${res.status}`);
        }
        )
      .then((result) => {
          return result
      });
  }

  getInitialCards() {
  }

 // Запрос информации о профиле
  getProfileInfo(link) {
   return this._fetch(link);
  }

  getInfo() {
    console.log(this._baseUrl);
    console.log(this._headers);
    console.log(this._token)
  }
  // другие методы работы с API
}
