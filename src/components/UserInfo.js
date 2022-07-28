export default class UserInfo {
  constructor({ profileNameSelector, profileAboutSelector }) {
    this._profileName = document.querySelector(profileNameSelector);
    this._profileAbout = document.querySelector(profileAboutSelector);
  }

  getUserInfo() {
    const userInfo = {
      name: this._profileName.textContent,
      job: this._profileAbout.textContent,
    };

    return userInfo;
  }

  setUserInfo({ name, job }) {
    this._profileName.textContent = name;
    this._profileAbout.textContent = job;
  }
}
