import {requireAdmin} from '../controllers/util';''
import * as express from 'express';

const caseRouter = express.Router();


caseRouter.post('/bar/increment', requireAdmin, (req, res) => {
    //Test
    res.status(200).json({message: "successful"});
});

caseRouter.post('/bar/decrement', requireAdmin, (req, res) => {
    //Test
    res.status(200).json({message: "successful"});
});

export default caseRouter;