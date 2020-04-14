import { requireAdmin } from './util';
import * as express from 'express';
import Case from '../models/CaseModel'
import { userExist } from './UserController';


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
   Case.find({}, (err, cases) => {
      if (!cases) {
         return res.status(404).json({error: "No cases available."});
      }
      res.status(200).json(cases);
   });
}

const update_case = (id: string, change: any) => {
   //Case.findByIdAndUpdate()
}
export const update_progress_bar = (req, res, next: boolean) => {
   // userExist.fin
   let caseName = req.body.id;
   
   let updateFile = next ? {$inc: {progress: 1}} : {$dec: {progress: 1}};
   Case.findByIdAndUpdate(caseName, updateFile, {new: true}, (err, document) => {
      console.log(document);
   });
   res.send(updateFile);
 //  update_case(id, {})

}


const increment_progress_bar = (req, res) => {

}
