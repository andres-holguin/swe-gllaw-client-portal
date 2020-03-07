import {create, read, UserRequest, verifyUser} from "./controllers/UserController";
import { MongooseDocument } from "mongoose";

export const login = async (req, res) =>  {
    //u_req is ?
    let u_req = req.body.u_req;
    //const result = await read(req, verify);
    console.log("result, ", res.result);
    verifyUser(req, res);
}

export const register = (req, res) => {
    let u_req = req.body.u_req;
    console.log(u_req);
    create(req, res);
    res.send("User created");
}

/* Verify function */
const verify = (user: UserRequest, found) => {
    //password verifcation goes on in here
    let err:any;
    if (!user) {
        console.log("aaa");
        err.user = 'No request was made.';
    }
    if (err) throw err;
    console.log(user.password);
    if (user.password === found.password) {
        console.log("User confiremed");
        return true;
    } else {
        return false;
    }
}
export {}