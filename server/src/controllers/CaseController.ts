import { requireAdmin } from './util';
import * as express from 'express';
import Case from '../models/CaseModel'
import * as user from '../controllers/UserController';

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
   id: string,
   name: string,
   description: String,
   progress: Number,
   active: Boolean,
   documents: any,
}

export const findFromIDS = async (ids: [string])=> {
   var cases = [];


      return new Promise((resolve, reject) => 
         Case.find({}).where('_id').in(ids).exec((err, documents) => {
         if (err) reject("Error");
         if (!documents) reject("No cases provided");
         for (let i = 0; i < documents.length; ++i) {
            //  console.log(documents[i]);
              let d = documents[i].toObject();
              let nextCase: Case = {
                 id: d._id,
                 name: d.Name,
                 description: d.Description,
                 progress: d.progress,
                 active: d.isActive,
                 documents: d.documents,
     
              };
              cases.push(nextCase);
            }
         resolve(cases);
      }));
}
interface document {
   name: string,
   id: string
}

export const getCaseByID = (req: express.Request, res: express.Response) => {
   Case.findById(req.body.id, (err, d) => {
      if (err) 
         return res.status(500).json({error: "An error occured."});
      
      if (!d) {
         return res.status(404).json({error: "No case by that id exist."});
      }

      return res.status(200).json(d);
   })
}

export const getProgress = (req: express.Request, res: express.Response) => {
   Case.findById(req.params.caseid, (err, c) => {
      if (err) res.status(500).json({error: "An error occured"});
      if (!c)
         return res.status(404).json({error: 'Case not found'});

      return res.status(200).json({progress: c.toObject().progress});
   } )
}

export const addDocument = (caseID: string, fileName: string, fileID: string) => {


   Case.findByIdAndUpdate(caseID, 
      { $push: {
         documents: {
         Name: fileName,
         fileID: fileID
      }}}, (err, success) => {
            if (err) throw err;
            console.log("done");
      })   
}


const update_case = (id: string, change: any) => {
   //Case.findByIdAndUpdate()
}
export const update_progress_bar = (req, res, next: boolean) => {
   // userExist.fin
   let caseName = req.body.id;
   
   let updateFile = next ? {$inc: {progress: 1}} : {$inc: {progress: -1}};
   Case.findByIdAndUpdate(caseName, updateFile, {new: true}, (err, document) => {
   //   console.log(document);
   });
   res.send(updateFile);
 //  update_case(id, {})

}


const increment_progress_bar = (req, res) => {

}
