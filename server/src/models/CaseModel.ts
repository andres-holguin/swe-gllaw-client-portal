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
    documentIDS: [Document],
    progress: {type: String, required: true}
});

export default mongoose.model('Case', caseSchema);