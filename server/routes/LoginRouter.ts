
import {create, read, update} from "../controllers/UserController"
import {login, register} from "../user"
import express  from 'express'
const loginRouter = express.Router();

loginRouter.post("/register", register);

loginRouter.post("/:Login", (req, res) => {
    login(req, res);
   // res.json(req.body);
});

loginRouter.put("/update", (req, res) => {
    update(req, res);
});






module.exports = loginRouter;
export default loginRouter;
