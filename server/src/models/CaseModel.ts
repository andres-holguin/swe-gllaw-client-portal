import  mongoose from "mongoose";

const Document = new mongoose.Schema({
    name: String,
    access_ID: [String]
});

const Calendar = new mongoose.Schema({

})

const caseSchema = new mongoose.Schema({
   // calendarID: String, 
    Name: {type: String, required: true},
    Description: {type: String, required: true},
    isActive: {type: Boolean, required: true},
    documents: [
        {
            Name: {type: String},
            fileID: {type: String, required: true}
        }
    ],
    userIDS: [String],
    progress: {type: Number, default: 0,  required: true}
});

export default mongoose.model('Case', caseSchema);