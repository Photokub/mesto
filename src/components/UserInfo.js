export default class UserInfo {
    constructor({userNameSelector, userJobSelector}) {
        this._name = document.querySelector(userNameSelector);
        this._about = document.querySelector(userJobSelector);
        // this._userName = document.querySelector(userNameSelector);
        // this._userJob = document.querySelector(userJobSelector);
    }

    getUserInfo() {
        return {
            user_name_field: this._name.textContent,
            user_job_field: this._about.textContent,
            // user_name_field: this._userName.textContent,
            // user_job_field: this._userJob.textContent,
        }
    }

    setUserInfo(data) {
        this._name.textContent = data.name;
        this._about.textContent = data.about
        // this._userName.textContent = data.user_name_field;
        // this._userJob.textContent = data.user_job_field
    }
}