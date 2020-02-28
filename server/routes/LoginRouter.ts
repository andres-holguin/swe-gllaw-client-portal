
//import {create, read, update} from "../controllers/UserController"
import {login, register} from "../user"
const express = require("express");
const loginRouter = express.Router();


loginRouter.post("/register", register);
loginRouter.post("/login", (req, res) => {
    login(req, res);
});

loginRouter.put("/update", (req, res) => {
 //   update(req, res);
});
module.exports = loginRouter;
export default loginRouter;