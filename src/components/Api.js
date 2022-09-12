export default class Api{
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
            //.then(res => res.json())
            .then((result) => {
                return result.json()
            })
    }

patchUserInfo({user_name_field, user_job_field}){
    return fetch(`${this._adress}/users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
            name: user_name_field,
            about:user_job_field,
        })
})
.then((res) => this.handleResp(res));
}

getDefaultCards(){
    return fetch(`${this._adress}/cards`,{
        method: "GET",
        headers: this._headers,
    })
    .then((res) => this.handleResp(res))
}

}


