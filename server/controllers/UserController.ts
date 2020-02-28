/* Dependencies */
import mongoose from 'mongoose';
import User from '../models/USERModel.js';

export interface UserRequest {
    email: String
    userName: String,
    password: String,
}

/* Create a listing */
export const create = async (req, res) => {
    let err:any = {};
    User.findOne({userName: req.user_req.userName}).then(user => {
        if (user){
            err.user = "User already exists"; //TODO send back a response.
        } else {
            const niceUser = new User({ 
                username: req.user_req.email,
                email: req.user_req.userName,
                password: req.user_req.password,
                isAdmin: false,
            });
            niceUser.save();
        };
    });
}
/* Show the current listing */
export const read = (req, res) => {
    User.findOne({userName: req.user.userName}, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
};

/* Update a listing*/
export const update = (req, res) => {
/*   User.findOneAndUpdate({userName: req.user.UserName}, (err, result) => {
       if (err) throw err;
       console.log(update)
   } */
};

/* Delete a listing */
export const remove = (req, res) => {
    User.findOneAndDelete({userName: req.user.userName}, (err, result) => {
        if (err) throw err;
        if (!result) {
            console.log("No user by that name exist.")
        }
        
    });
};

/* Retreive all the directory listings*/
export const list = (req, res) => {
    User.find({},function(err,data){
        if(err) throw err;
        res.send(data);
   }).sort({code : 1});
};
