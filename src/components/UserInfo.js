export default class UserInfo {
    constructor({ nameSelector, jobSelector, avatarSelector }) {
        this._nameSelector = nameSelector;
        this._jobSelector = jobSelector;
        this._avatarSelector = avatarSelector;
        this._profileName = document.querySelector(this._nameSelector);
        this._profileJob = document.querySelector(this._jobSelector);
        this._profilePic = document.querySelector(this._avatarSelector);
    }

    getUserInfo() {
        this._userInfo = { name: this._profileName.textContent, job: this._profileJob.textContent };
        return this._userInfo;
    }

    setUserInfo(name, job) {
        this._profileName.textContent = name;
        this._profileJob.textContent = job;
    }

    setUserPic(pic) {
        this._profilePic.src = pic;
    }
}