export default class Api{
    constructor(setting) {
        this._adress = setting.baseUrl;
        this._headers = setting.headers;
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

patchUserInfo(data){
    fetch(`${this._adress}/users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify(data)
})


}

}


