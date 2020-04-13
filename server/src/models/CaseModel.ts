import  mongoose from "mongoose";

const Document = new mongoose.Schema({
    name: String,
    access_ID: [String]
});

const Calendar = new mongoose.Schema({

})

const caseSchema = new mongoose.Schema({
    calendarID: String, 
    documentIDS: [Document],
    progress: Number
});

export default mongoose.model('Case');