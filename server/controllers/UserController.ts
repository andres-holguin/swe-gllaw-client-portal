/* Dependencies */
import User from '../models/USERModel';
import config from '../config/config';
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const secret = config.jwt.secret;

const saltRounds = 10; // Amount of times that the salt and hash should be ran on the password through bcrypt.
export interface UserRequest {
    email: string,
    userName: string,
    password: string,
}

interface newPasswordRequest {
    username: string,
    oldPassword: string,
    newPassword: string,
}

interface UserRegistration {
    firstname: string,
    lastname: string,
    email: string,
    username: string,
    password: string,
}

const generateToken = (username: string) => {

    const tok = {name: username};
    const accessToken = jwt.sign(tok, secret);
    console.log(accessToken);
    return accessToken;
}

/* Create a listing */
export const create = async (req, res, isAdmin) => {
    let err:any = {};
    let newUser: UserRegistration = req.body;
    console.log(newUser);
    let hashedPassword = bcrypt.hashSync(newUser.password, saltRounds);
    console.log(hashedPassword);
    User.findOne({username: newUser.username.toLowerCase()}).then(user => {
        if (user){
            console.log("User already exist");
            err.user = "User already exists"; //TODO send back a response.
        } else {
            User.create({ 
                firstname: newUser.firstname,
                lastname: newUser.lastname,
                username: newUser.username.toLowerCase(),
                email: newUser.email.toLowerCase(),
                password: hashedPassword,
                isAdmin: isAdmin,
            }).then( (d)  => {
                d.save();
                            console.log("Saved");
            });
        }
    });
}

/* Show the current listing */
export const read = (name: String, res) => {
    User.findOne({username: name.toLowerCase()}).then(user => {
        if (!user) {
            console.log("User does not exist");
        } else {
            console.log("User exists");
            res.result = user;
        }
    })
};

export const verifyUser = (req, res) => {
    let u: UserRequest = req.body.u_req;
    let valid  = false;
    User.findOne({username: u.userName}, (err, user) => {

        if (!user) {
            console.log("Oops");
            return res.status(404).json({userNotFound: "User not found"});
        } else {
            console.log(u); 
            console.log(user.toObject());
            let hash = user.toObject().password;
            if (bcrypt.compareSync(u.password, hash)) {
                console.log("user confirmed");
                
                const accessToken = generateToken(u.userName);
                res.json({accessToken: accessToken});
                
            } else {
                console.log("User not confirmed");
                return res.status(401).json({usernotfound: "You dont have access"});
            }
        }
    });

}
/* Update a listing*/
export const update = (req, res) => {
    let u_req: UserRequest = req.body.u_req;
   User.findOneAndUpdate({username: u_req.userName}, {
       username: req.user.username
   });
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

export const getUserID = (username: string) => {
    let  out: number = -1; // Document
    User.findOne({username: username}).exec().then( (u) => {
        if (u) {
            console.log(u._id);
            out = u.toObject()._id;
        } else {
            out = -1;
        }
        return out;
    });
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
