import * as express from 'express';
import multer from 'multer';
import mongoose from 'mongoose';
import GridFsStorage from 'multer-gridfs-storage';

import { GridFSBucket, ObjectID } from 'mongodb';

const documentRouter = express.Router();



const connection = mongoose.createConnection(process.env.DB_URI, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


let gfs;
connection.once('open', () => {
    gfs = new mongoose.mongo.GridFSBucket(connection.db);
})

const storage = new GridFsStorage({
    db: connection,
    bucketName: "uploads",
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            const fileInfo= {
                filename: file.originalname,
                bucketname: 'documents'
            };
            console.log(fileInfo)
            resolve(fileInfo);
        })
    }
});


let upload = multer({
    storage: storage
});


documentRouter.post('/upload', upload.single('doc'), (req: express.Request, res: express.Response) => {
  res.json({message: "file transfer successful"}); // if there is an error if will be caught before this.
});


documentRouter.get('/:document_id/', (req: express.Request, res: express.Response) => {
    const bucket = new GridFSBucket(storage.db);
    
    const stream = bucket.openDownloadStream(new ObjectID(req.params.document_id));
    stream.on('error', err => {
        if (err.message.toLowerCase().startsWith("filenotfound")) return res.status(404).json({error: "file not found"});

        return res.status(500).json({error: err.message});
    })

    stream.pipe(res); // This send back the file as a response.
});



export default documentRouter;