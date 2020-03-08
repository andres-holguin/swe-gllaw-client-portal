/* Dependencies */
import User from '../models/USERModel';

const bcrypt = require("bcrypt");

const saltRounds = 10;
export interface UserRequest {
    email: String,
    userName: String,
    password: String,
}

interface newPasswordRequest {
    username: string,
    oldPassword: string,
    newPassword: string,
}

/* Create a listing */
export const create = async (req, res) => {
    let err:any = {};
    let user_req: UserRequest = req.body.u_req;
    console.log(user_req);
    let hashedPassword = bcrypt.hashSync(user_req.password, saltRounds);
    console.log(hashedPassword);
    User.findOne({username: user_req.userName}).then(user => {
        
        if (user){
            console.log("User already exisit");
            err.user = "User already exists"; //TODO send back a response.
        } else {
            User.create({ 
                username: user_req.userName,
                email: user_req.email,
                password: hashedPassword,
                isAdmin: false,
            }).then( (d)  => {
                d.save();
                            console.log("Saved");
            });
        }
    });
}

/* Show the current listing */
export const read = (name: String, res) => {
    User.findOne({username: name}).then(user => {
        if (!user) {
            console.log("User does not exist");
            
            //res.send("User does not exist");
        } else {
            console.log("User exists");
            res.result = user;
        }
    })
};

export const verifyUser = (req, res) => {
    let u: UserRequest = req.body.u_req;
    User.findOne({username: u.userName}).then(user => {

        if (!user) {
            console.log("Oops");
            return res.status(404).json({userNotFound: "User not found"});
        } else {
            console.log(u); 
            console.log(user.toObject());
            let hash = user.toObject().password;
            if (bcrypt.compareSync(u.password, hash)) {
            
                console.log("user confirmed");
                res.send(true);
            } else {
                console.log("User not confirmed");
                res.send(false);
            }
        }
    });
}
/* Update a listing*/
/*export const update = (req, res) => {
    let u_req: UserRequest = req.body.u_req;
   User.findOneAndUpdate({username: u_req.userName}, {
       username: req.user.username
   }
}; */

const update = (updated: UserRequest) => {

}
export const resetPassword = (hmm: newPasswordRequest) => {
    let user = hmm.username;
    //let userDocument  = getUser(user);
    User.updateOne({username: user}, {
        
    })
}

/* Delete a listing */
export const remove = (req, res) => {
    User.findOneAndDelete({username: req.body.u_req.userName}, (err, result) => {
        if (err) throw err;
        if (!result) {
            console.log("No user by that name exist.")
            res.status(404).json({nouser: "No user by that name exist."});
        }
        
    });
};

export const getUser = (username: string) => {
    User.findOne({username: username}).exec().then( (d) => {
        return d;
    })
}

const isAdmin = (username: string) => { //Replace this function
    User.findOne({username: username}, (err, u) => {
        if (err) throw err;
        if (!u) {
            console.log("No account with that name exist.");
            return true;
        } else {
            if(u.toObject().isAdmin) {
                console.log("is admin.");
                return true;
            } else {
                return false;
            }
        }
    });
}
const deleteUser = (req, res) => {
    //Im gonna need to check if the user is an admin.
    //req.body.u_req;
}


/* Retreive all the directory listings*/
export const list = (req, res) => {
    User.find({},function(err,data){
        if(err) throw err;
        res.send(data);
   }).sort({code : 1});
};
