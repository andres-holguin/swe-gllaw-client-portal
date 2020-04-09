/* Dependencies */
import User from '../models/USERModel';
//import config from '../config/config';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
import {Request, Response}  from 'express';
import { MongooseDocument } from 'mongoose';
import mongoose from 'mongoose';



const secret = process.env.JWT_SECRET; //

const saltRounds = 10; // Amount of times that the salt and hash should be ran on the password through bcrypt.
export interface UserRequest {
    email: string,
    username: string,
    password: string,
}

interface newPasswordRequest {
    oldpassword: string,
    newPassword: string,
}

interface UserRegistration {
    firstname: string,
    lastname: string,
    email: string,
    username: string,
    password: string,
}

const isTokenValid = (token: string) => {
    //if (error) ?
    jwt.verify(token, secret, (err, decoded) => {
        if (decoded) {
            return true;
        } else {
            return false;
        }
    })
}

const generateToken = (username: string) => {

    const tok = {name: username};
    const accessToken = jwt.sign(tok, secret);
    console.log(accessToken);
    return accessToken;
}

const hashPass = (plaintextPassword: string): string  => {
   return bcrypt.hashSync(plaintextPassword, saltRounds);
}

const randomPassword = async () => {

    let length = Math.floor(Math.random() * 32);
    let charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let pass = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        pass += charset.charAt(Math.floor(Math.random() * n));
    }
    return pass;
}

/* Create a listing */
export const create = async (req, res, isAdmin) => {
    let err:any = {};
    let newUser: UserRegistration = req.body;
    console.log(newUser);
    let newPassword: string;
    User.findOne({username: newUser.username.toLowerCase()}).then(async (user) => {
            if (user) return res.status(401).json({userExist: "User Already Exist"});
            
            else {
            newPassword = await  randomPassword()
            console.log("PASS: ", newPassword); // I need a way to give this password to the user.
            User.create({ 
                firstname: newUser.firstname,
                lastname: newUser.lastname,
                username: newUser.username.toLowerCase(),
                email: newUser.email.toLowerCase(),
                password: hashPass(newPassword),
                isAdmin: isAdmin,
                newUser: true,
            }).then( (d)  => {
                d.save();
                console.log("Saved");
                res.status(200).json({usercreated: "User Created"});
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

export const verifyUser = async (req, res) => {
    let u: UserRequest = req.body;
    User.findOne({username: u.username.toLowerCase()}, (err, user) => {

        if (!user) {
            console.log("Oops");
            return res.status(403).json({authenticationerror: "Incorrect Username or Password"}); //Possibly change this status to a 401
        } else {
            console.log(u); 
            console.log(user.toObject());
            let hash = user.toObject().password;


            bcrypt.compare(u.password, hash, (err, authenticated) => {
                if (err) return res.json(err);
                
                
                if (authenticated) {
                    console.log("user confirmed");
                
                    const accessToken = generateToken(u.username);
                    res.cookie('_uid', user.id).cookie('jwt', accessToken, {//Add the same site flag as well.
                    httpOnly: true}).status(200).json({accessToken: accessToken});
                } else {
                    console.log("User not confirmed");
                    return res.status(403).json({authenticationerror: "Incorrect Username or Password."});
                }
            });
        }
    });

}
/* Update a listing*/
export const update = (req, res) => {
    let u_req: string = req.body.u_req.username;
    User.findOneAndUpdate({username: u_req}, req.body);
};
//Update the specific document that we wnat to change
const updateByObject = (u: MongooseDocument, newContent: any) => {

}

export const changePassword = async (req: Request, res: Response, id: string) =>  {
    let newRequest: newPasswordRequest = req.body
    console.log(req.body);
    let doc = await User.findById(id, (err, user) => {
        if (err) throw err;
        if (!user) {
            return res.status(404).json({authenticationerror: "No user by that id exist"});
        } else {
            let hash = user.toObject().password;
            bcrypt.compare(newRequest.oldpassword, hash, (err, authenticated ) => {
                if (err) throw err;

                if (!authenticated) {
                    return res.status(403).json({authentication_error: "Incorrect password"});
                } else {
                    let newPass = hashPass(newRequest.newPassword);
                    User.updateOne(user, {password: newPass}, {
                        new: true,
                    }, (err, u) => {
                        if (err) throw err;
                    });

                    return res.status(204).send();           
                }
            } );
        }
    });
    //doc.name
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
   });
};

export const updateCalender = (req, res) => {
    const jwt = require("json-web-token");
    const secret = process.env.JWT_SECRET;
    const getUserNamefromCookie = (cookie) => {
      jwt.verify(cookie, secret, (err, decoded) => {
     if (err) throw err;
        return decoded.username;
        });
    }
    let Tok =req.cookies["jwt"];
    let username = getUserNamefromCookie(Tok);
    let calendarData;
    User.find({username: username}, function(err,data){
        if(err) throw err;
        calendarData = data;
    });
    calendarData.push(req.body.calenderEntrys)//param1 may need to be changed
    User.findOneAndUpdate({username: username}, {calenderEntrys: calendarData});
};

export const getCalender = (req, res) => {
    const jwt = require("json-web-token");
    const secret = process.env.JWT_SECRET;
    const getUserNamefromCookie = (cookie) => {
      jwt.verify(cookie, secret, (err, decoded) => {
     if (err) throw err;
        return decoded.username;
        });
    }
    let Tok =req.cookies["jwt"];
    let username = getUserNamefromCookie(Tok);
    User.find({username: username}, function(err,data){
        if(err) throw err;
        data.
        res.send(data);
    });
};


export const debugCreate = (req, res) => {
    console.log(req.params);
    let toAdd = new User(
    {   
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        email:    req.body.email,
        password: "123",
        isAdmin: false,
        newUser: true //This is for when we want to force a password change
    });
    toAdd.save();
    res.send(toAdd);
};




