export default class UserInfo {
    constructor({userNameSelector, userJobSelector, userAvatarSelector}) {
        this._name = document.querySelector(userNameSelector);
        this._about = document.querySelector(userJobSelector);
        this._avatar = document.querySelector(userAvatarSelector)
    }

    getUserInfo() {
        return {
            user_name_field: this._name.textContent,
            user_job_field: this._about.textContent,
        }
    }

    setUserInfo(data) {
        this._name.textContent = data.name;
        this._about.textContent = data.about;
        this.setAvatar(data.avatar);
    }

    setAvatar(avaLink) {
        this._avatar.src = avaLink
    }
}