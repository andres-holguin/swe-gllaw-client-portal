
import {create, read, update} from "../controllers/UserController"
import {login, register} from "../user"
import express  from 'express'
const loginRouter = express.Router();
loginRouter.post("/register", register);
loginRouter.post("/", (req, res) => {
    login(req, res);
});

loginRouter.put("/update", (req, res) => {
 //   update(req, res);
});

module.exports = loginRouter;
export default loginRouter;
