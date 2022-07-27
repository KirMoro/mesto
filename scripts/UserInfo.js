export default class UserInfo {
  constructor({ profileNameSelector, profileAboutSelector }) {
    this._profileNameSelector = document.querySelector(profileNameSelector);
    this._profileAboutSelector = document.querySelector(profileAboutSelector);
  }

  getUserInfo() {
    const userInfo = {
      name: this._profileNameSelector.textContent,
      job: this._profileAboutSelector.textContent,
    }

    return userInfo
  }

  setUserInfo({ name, job }) {
    this._newUserInfo = this.getUserInfo();

    this._newUserInfo.name = name;
    this._newUserInfo.job = job;

    this._profileNameSelector.textContent = this._newUserInfo.name;
    this._profileAboutSelector.textContent = this._newUserInfo.job;
  }
}
