import {requireAdmin} from '../controllers/util';''
import * as express from 'express';
import * as cases from '../controllers/CaseController';
const caseRouter = express.Router();


caseRouter.post('/new', requireAdmin, (req: express.Request, res: express.Response) => {
    cases.create(req, res);
});

caseRouter.post('/bar/increment', requireAdmin, (req, res) => {
    //Test
    res.status(200).json({message: "successful"});
});

caseRouter.post('/bar/decrement', requireAdmin, (req, res) => {
    //Test
    res.status(200).json({message: "successful"});
});

export default caseRouter;