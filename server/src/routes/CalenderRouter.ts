import {update, updateCalender, getCalender,list, debugCreate,deleteFromCalender,assignAdmin} from "../controllers/UserController"
import * as user from "../controllers/UserController";
import {login, register} from "../user"
import * as express  from 'express'
const calenderRouter: express.Router = express.Router();


calenderRouter.get("/edit", (req, res) => {
    getCalender(req,res);
});

calenderRouter.post("/edit", (req, res) => {
    updateCalender(req, res);
});


calenderRouter.post("/debug", (req, res) => {
    //assignAdmin(req,res);
    //debugCreate(req,res);
});


calenderRouter.get("/debug", (req, res) => {
    //list(req,res);
});


calenderRouter.delete("/edit", (req, res) => {
    deleteFromCalender(req,res);
});

export default calenderRouter;