import * as users from "./controllers/UserController";

const bcrypt  = require("bcrypt");
export const login = async (req, res) =>  {
    users.verifyUser(req, res);
  //  console.log("Password valid: ", valid);
}

export const register = (req, res) => {
    let u_req = req.body.u_req;
    console.log(u_req);
    users.create(req, res, false);
}

export const registerAdmin = (req, res) => {
    let u_req = req.body.u_req;
    console.log(u_req);
    users.create(req, res, true);
    res.send("Admin created");
}

export const removeUser = (req, res) => {
    let pass: string = req.body.u_req.password;
    let u= users.getUserID(req.body.u_req.userName);
   /* let hash: String = u.toObject().password;
    console.log("Remove user", hash);
    bcrypt.compare(pass, hash, (err, result) => {
        res.send("User removed: ", result);
        users.remove(req, res);
    }) */
}
export {}