import {create, read, UserRequest} from "./controllers/UserController";

export const login = (req, res) => {
    //u_req is ?
    let u_req = req.body.u_req;
    console.log(u_req);
    if(verify(u_req))
    {
        res.send(1);
    }
    else
    {
        res.send(0);
    }
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
    //password verifcation goes on in here
    let err:any;
    if (!user) {
        console.log("aaa");
        err.user = 'No request was made.';
    }
    if (err) throw err;
    return true;
}
export {}