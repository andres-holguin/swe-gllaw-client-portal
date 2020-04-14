import {update, updateCalender, getCalender,list, debugCreate} from "../controllers/UserController"
import * as user from "../controllers/UserController";
import {login, register} from "../user"
import * as express  from 'express'
const calenderRouter: express.Router = express.Router();


calenderRouter.get("/Calender", (req, res) => {
    getCalender(req,res);
});

calenderRouter.post("/Calender", (req, res) => {
    updateCalender(req, res);
});

calenderRouter.post("/debug", (req, res) => {
    debugCreate(req,res);
});

calenderRouter.get("/debug", (req, res) => {
    list(req,res);
});

calenderRouter.delete("/Calender", (req, res) => {
});

export default calenderRouter;