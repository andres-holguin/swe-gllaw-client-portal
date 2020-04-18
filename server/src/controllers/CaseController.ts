import { requireAdmin } from './util';
import * as express from 'express';
import Case from '../models/CaseModel'
import * as user from '../controllers/UserController';
import { rejects } from 'assert';

export const create = async (req: express.Request, res: express.Response) => {
   //Create the case.
   let newCase;
   let id = await user.findNameId(req, res);
   console.log(id);
   console.log("here");
           Case.create({ 
               Name: req.body.name,
               Description: req.body.description,
               userIDS: id,
               isActive: true,
               progress: 0

           }).then( (d)  => {
               d.save();
               console.log("Saved");

               if (req.body.user != undefined) {
                  user.assignCaseByID(id, d._id,  res);
               } 

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

interface Case  {
   name: string,
   description: String,
   progress: Number,
   active: Boolean
}

export const findFromIDS = async (ids: [string])=> {
   var cases = [];


      return new Promise((resolve, reject) => 
         Case.find({}).where('_id').in(ids).exec((err, documents) => {
         if (err) reject("Error");
         for (let i = 0; i < documents.length; ++i) {
            //  console.log(documents[i]);
              let d = documents[i].toObject();
              let nextCase: Case = {
                 name: d.Name,
                 description: d.Description,
                 progress: d.progress,
                 active: d.isActive
     
              };
              cases.push(nextCase);
            }
         resolve(cases);
      })
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
