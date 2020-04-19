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
<<<<<<< HEAD
})
=======
});
>>>>>>> dev

caseRouter.put('/bar/increment', requireAdmin, (req: express.Request, res: express.Response) => {
    console.log("HELLO", req.body);
    cases.update_progress_bar(req, res, true); // Go to next
});

caseRouter.get('/:caseid/bar', (req: express.Request, res: express.Response) => {
    //case.progress();
    cases.getProgress(req, res);

})

caseRouter.put('/bar/decrement', requireAdmin, (req, res) => {
    cases.update_progress_bar(req, res, false); // Go to prev

});

export default caseRouter;