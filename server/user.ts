import {create, read, UserRequest} from "./controllers/UserController";

export const login = (req, res) => {
    let u_req = req.body.u_req;
    console.log(u_req);
    verify(u_req);
    req.user = req.body.u_req;
    read(req, res);
}

export const register = (req, res) => {
    let u_req = req.body.u_req;
    console.log(u_req);

    create(req, res);
    res.send("User created");
}

    /* Verify function */
const verify = (user: UserRequest) => {
    let err:any;
    if (!user) {
        console.log("aaa");
        err.user = 'No request was made.';
    }

    if (err) throw err;
}
export {}