import {requireAdmin} from '../controllers/util';''
import * as express from 'express';
import * as cases from '../controllers/CaseController';
const caseRouter = express.Router();


caseRouter.post('/new', requireAdmin, (req: express.Request, res: express.Response) => {
    cases.create(req, res);
});

caseRouter.get('/list', requireAdmin, (req: express.Request, res: express.Response) => {
    cases.listCases(req, res);
})

caseRouter.get('/:caseid', (req: express.Request, res: express.Response) => {
    cases.getCaseByID(req, res);
})

caseRouter.put('/bar/increment', requireAdmin, (req, res) => {
    //Test
    cases.update_progress_bar(req, res, true); // Go to next
    //res.status(200).json({message: "successful"});
});

caseRouter.get('/bar', (req, res) => {
    //case.progress();
})

caseRouter.put('/bar/decrement', requireAdmin, (req, res) => {
    //Test
    cases.update_progress_bar(req, res, false); // Go to next

   // res.status(200).json({message: "successful"});
});

export default caseRouter;