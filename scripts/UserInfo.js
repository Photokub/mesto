export default class UserInfo {
    constructor({userNameSelector, userJobSelector}) {
        this._userName = document.querySelector(userNameSelector);
        this._userJob = document.querySelector(userJobSelector);
    }

    getUserInfo() {
        return {
            user_name_field: this._userName.textContent,
            user_job_field: this._userJob.textContent,
        }
    }

    setUserInfo(data) {
        this._userName.textContent = data.user_name_field;
        this._userJob.textContent = data.user_job_field
    }
}