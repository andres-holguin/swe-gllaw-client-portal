//Check out - https://mongoosejs.com/docs/guide.html
import mongoose from 'mongoose';
const listingSchema = new mongoose.Schema({
  username: {type : String, required: true},
  email: {type : String, required: true},
  password: {type : String, required: true},
  isAdmin: {type : Boolean}
});

export default mongoose.model('listings', listingSchema);