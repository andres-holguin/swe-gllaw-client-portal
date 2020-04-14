import { requireAdmin } from './util';
import * as express from 'express';
import Case from '../models/CaseModel'


export const create = (req: express.Request, res: express.Response) => {
   //Create the case.
   //let newUser:  = req.body;
   console.log("here");
           Case.create({ 
               Name: req.body.name,
               Description: req.body.description,
               isActive: true,
               progress: 0

           }).then( (d)  => {
               d.save();
               console.log("Saved");
               res.status(200).json({
                  id: d._id,
                  message: "Case Created"});
           });
       }


export const listCases = (req: express.Request, res: express.Response) => {

}
const update_progress_bar = (req, res, next: boolean) => {
   // userExist.fin
}


const increment_progress_bar = (req, res) => {

}
