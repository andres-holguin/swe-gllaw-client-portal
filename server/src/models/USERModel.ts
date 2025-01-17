//Check out - https://mongoosejs.com/docs/guide.html
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstname: {type : String, required: true, lowercase: true},
  lastname: {type : String, required: true, lowercase: true},
  username: {type : String, required: true, lowercase: true},
  email: {type : String, required: true, lowercase: true},
  password: {type : String, required: true},
  isAdmin: {type : Boolean, required: true},
  newUser: {type: Boolean}, //This is for when we want to force a password change
  cases: [String], //Case ID will be stored in this.
  calenderEntrys: []//for storing calender stuff
});

export default mongoose.model('users', userSchema);