export default class UserInfo {
  constructor({ profileNameSelector, profileAboutSelector, profileAvatar }) {
    this._profileName = document.querySelector(profileNameSelector);
    this._profileAbout = document.querySelector(profileAboutSelector);
    this._profileAvatar = document.querySelector(profileAvatar)
  }

  getUserInfo() {
    const userInfo = {
      name: this._profileName.textContent,
      about: this._profileAbout.textContent,
    };

    return userInfo;
  }

  setUserInfo(data) {
      this._profileName.textContent = data.name;
      this._profileAbout.textContent = data.about;
  }

  setUserAvatar(data) {
    this._profileAvatar.src = data.avatar;
  }
}
