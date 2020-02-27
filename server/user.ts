import {read, UserRequest} from "./controllers/UserController";


export const login = (req, res) => {
    /* Verify function */
    let u_req = req.u_req;
    verify(u_req);
}

export const register = (req, res) => {

}

const verify = (user: UserRequest) => {
    let err:any = {};
    if (!user) {
        err.user = 'No request was made.'
    }
    

    if (err) throw err;
}