
import {update} from "../controllers/UserController"
import * as user from "../controllers/UserController";
import {login, register} from "../user"
import * as express  from 'express'
const loginRouter: express.Router = express.Router();

loginRouter.post("/register", register);

loginRouter.post("/login", (req, res) => {
    login(req, res);
   // res.json(req.body);
});

loginRouter.get("/me", (req, res) => {
    //This makes sure that the user is logged in.
    console.log(req.cookies["jwt"]);
    if (req.cookies["jwt"] !== undefined) {
        res.status(200).send();
    } else {
        res.status(401).send();
    }
});

loginRouter.put("/:id/change_password", (req: express.Request, res: express.Response) => { //The user id should be sent along with with the old and new password
    console.log("nice");
    user.changePassword(req, res, req.params.id);
});

loginRouter.put("/update", (req, res) => {
    update(req, res);
});


//module.exports = loginRouter;
export default loginRouter;
