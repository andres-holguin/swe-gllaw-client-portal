import { extendObservable } from 'mobx';

class Userinfo {
    constructor() {
        extendObservable(this, {

            loading: false,
            isLoggedIn: false,
            username: ''


            })


    }

}

export default new Userinfo();