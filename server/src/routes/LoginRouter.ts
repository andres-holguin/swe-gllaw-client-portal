
import {update, updateCalender, getCalender,list, debugCreate} from "../controllers/UserController"
import {login, register} from "../user"
import express  from 'express'
const loginRouter = express.Router();

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
        res.status(403).send();
    }
});

loginRouter.put("/:id/reset_password", (req, res) => { //The user id should be sent along with with the old and new password
    console.log("nice");
    res.status(401).send();
});

loginRouter.put("/update", (req, res) => {
    update(req, res);
});


loginRouter.get("/Selector", (req, res) => {
    list(req,res);
});

loginRouter.post("/Selector", (req, res) => {
    register(req, res);
});


loginRouter.get("/Calender", (req, res) => {
    getCalender(req,res);
});

loginRouter.post("/Calender", (req, res) => {
    updateCalender(req, res);
});

loginRouter.post("/debug", (req, res) => {
    debugCreate(req,res);
});

loginRouter.get("/debug", (req, res) => {
    list(req,res);
});

loginRouter.delete("/Calender", (req, res) => {
});

module.exports = loginRouter;
export default loginRouter;
