//Check out - https://mongoosejs.com/docs/guide.html
import mongoose from 'mongoose';
const listingSchema = new mongoose.Schema({
  username: {type : String, required: true},
  email: {type : String, required: true},
  password: {type : String, required: true},
  isAdmin: {type : Boolean, required: true},
  //progress: {type : Array, required: true}
});

export default mongoose.model('listings', listingSchema);