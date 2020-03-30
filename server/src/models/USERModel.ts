//Check out - https://mongoosejs.com/docs/guide.html
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstname: {type : String, required: true},
  lastname: {type : String, required: true},
  username: {type : String, required: true},
  email: {type : String, required: true},
  password: {type : String, required: true},
  isAdmin: {type : Boolean, required: true},
  newUser: {type: Boolean}, //This is for when we want to force a password change
  calenderEntrys: [String]//for storing calender stuff
});

export default mongoose.model('users', userSchema);