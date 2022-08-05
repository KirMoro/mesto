export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
    this._token = options.headers.authorization;
    this._content_type = 'application/json';
    this._fetch = (link, method = 'GET', body = undefined) => fetch(`${this._baseUrl}/${link}`, {
      method: method,
      headers: {
        authorization: this._token,
        'content-type': this._content_type
      },
      body: JSON.stringify(body)
    })
      .then(res => {
          if (res.ok) {
            return res.json();

          }
          return Promise.reject(`Ошибка: ${res.status}`);
        }
      )
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getInitialCards(link) {
    return this._fetch(link);
  }

  getProfileInfo(link) {
    return this._fetch(link);
  }

  setProfileInfo(link, method, body) {
    return this._fetch(link, method, body);
  }

  setProfileAvatar(link, method, { avatar }) {
    return this._fetch(link, method, { avatar });
  }

  setNewCard(link, method, body) {
    return this._fetch(link, method, body);
  }

  deleteCard(link, method) {
    return this._fetch(link, method);
  }

  addLike(link, method) {
    return this._fetch(link, method);
  }

  removeLike(link, method) {
    return this._fetch(link, method);
  }
}
