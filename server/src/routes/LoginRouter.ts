
import {update,list,fetchIsAdmin} from "../controllers/UserController"
import * as user from "../controllers/UserController";
import {login, register} from "../user"
import * as express  from 'express'
import * as util from '../controllers/util';
const loginRouter: express.Router = express.Router();

loginRouter.post("/register", register);

loginRouter.post("/login", (req, res) => {
    login(req, res);
   // res.json(req.body);
});

loginRouter.post("/logout", (req, res) => {
    res.clearCookie("_uid").clearCookie("jwt").json({loggedout: "Logged out"}); // Removes token from client logging them out.
});

loginRouter.get("/me", (req, res) => {

    console.log(req.cookies["jwt"]);
    if (req.cookies["jwt"] !== undefined) { //Change this to check if the jwt is expired.
        
        res.status(200).send();
    } else {
        res.status(401).send();
    }
});

loginRouter.put("/:id/change_password", (req: express.Request, res: express.Response) => { //The user id should be sent along with with the old and new password
    user.changePassword(req, res, req.params.id);
});

loginRouter.post("/reset_password", (req: express.Request, res: express.Response) => {
    // I will need to send an email from the mail server
    res.json({});
})

loginRouter.put("/update", (req, res) => {
    update(req, res);
});

loginRouter.get('/cases', (req: express.Request, res: express.Response) => {
    user.listCases(req, res);
})

loginRouter.post('/cases', (req: express.Request, res: express.Response) => 
{
    user.assignCase(req, res);
});

loginRouter.get("/Selector", (req, res) => {
    //list(req,res);
});

loginRouter.get("/isAdmin", (req, res) => {
    fetchIsAdmin(req,res);
});

loginRouter.post("/Selector", (req, res) => {
    register(req, res);
});


//module.exports = loginRouter;
export default loginRouter;
