export default class Api {
    constructor(setting) {
        this._adress = setting.baseUrl;
        this._headers = setting.headers;
    }

    handleResp(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status} - ${res.statusText}`);
        }
        return res.json();
    }

    getUserInfo() {
        return fetch(`${this._adress}/users/me`, {
            method: "GET",
            headers: this._headers,
        })
            .then((res) => this.handleResp(res))
    }

    patchUserInfo({user_name_field, user_job_field}) {
        return fetch(`${this._adress}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: user_name_field,
                about: user_job_field,
            })
        })
            .then((res) => this.handleResp(res));
    }

    getDefaultCards() {
        return fetch(`${this._adress}/cards`, {
            method: "GET",
            headers: this._headers,
        })
            .then((res) => this.handleResp(res))
    }

    postCard({name, link}) {
        return fetch(`${this._adress}/cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                link: link,
            })
        })
            .then((res) => this.handleResp(res))
    }

    putLike(id) {
        return fetch(`${this._adress}/cards/${id}/likes`, {
            method: "PUT",
            headers: this._headers,
        })
            .then((res) => this.handleResp(res))
    }

    deleteLike(id) {
        return fetch(`${this._adress}/cards/${id}/likes`, {
            method: "DELETE",
            headers: this._headers,
        })
            .then((res) => this.handleResp(res))
    }

    deleteMyCard(id) {
        return fetch(`${this._adress}/cards/${id}`, {
            method: "DELETE",
            headers: this._headers,
        })
            .then((res) => this.handleResp(res))
    }

    patchAvatar(avatar) {
        return fetch(`${this._adress}/users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                avatar,
            }),
        }).then((res) => this.handleResp(res));
    }


}


