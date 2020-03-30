
import {update, updateCalender, getCalender} from "../controllers/UserController"
import {login, register} from "../user"
import express  from 'express'
const loginRouter = express.Router();

loginRouter.post("/register", register);

loginRouter.post("/login", (req, res) => {
    login(req, res);
   // res.json(req.body);
});

loginRouter.put("/update", (req, res) => {
    update(req, res);
});




loginRouter.get("/Calender", (req, res) => {
    

});

loginRouter.post("/Calender", (req, res) => {
    updateCalender(req, res);

});

loginRouter.delete("/Calender", (req, res) => {
    getCalender(req,res);
});

module.exports = loginRouter;
export default loginRouter;
