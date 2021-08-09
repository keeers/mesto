export default class UserInfo {
    constructor(nameSelector, jobSelector) {
        this._nameSelector = nameSelector;
        this._jobSelector = jobSelector;
        this._profileName = document.querySelector(this._nameSelector);
        this._profileJob = document.querySelector(this._jobSelector);
    }

    getUserInfo() {
        this._userInfo = { name: this._profileName.textContent, job: this._profileJob.textContent };
        return this._userInfo;
    }

    setUserInfo(name, job) {
        this._profileName.textContent = name;
        this._profileJob.textContent = job;
    }
}