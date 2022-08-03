export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
    this._token = options.headers.authorization;
  }

  getInitialCards() {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-48/cards', {
      headers: {
        authorization: '6dcd6a5f-9295-4e62-a1cd-62fe426f6415'
      },
    })
      .then(res => {
        if (res.ok) {
          return res.json();
          console.log(res);

        }
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

 // Запрос информации о профиле
  getProfileInfo(link) {
    fetch(`${this._baseUrl}/${link}`, {
      headers: {
        authorization: '6dcd6a5f-9295-4e62-a1cd-62fe426f6415'
      }
    })
      .then(res => res.json())
      .then((result) => {
        console.log(result);
      });
  }

  getInfo() {
    console.log(this._baseUrl);
    console.log(this._headers);
    console.log(this._token)
  }
  // другие методы работы с API
}
