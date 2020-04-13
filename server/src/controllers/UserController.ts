/* Dependencies */
import User from '../models/USERModel';
//import config from '../config/config';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
import {Request, Response}  from 'express';
import { MongooseDocument } from 'mongoose';

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

const generateToken = (username: string, role: string) => {

    const tok = {name: username, role};
    const accessToken = jwt.sign(tok, secret);
    console.log(accessToken);
    return accessToken;
}

const hashPass = (plaintextPassword: string): string  => {
   return bcrypt.hashSync(plaintextPassword, saltRounds);
}

export const reset_password = async (req, res): Promise<string> => {

    let out = "";
    await User.findOne({email: req.body.email}, (err, u) => {
            if (err) return res.status(500).json({error: "An Error occured. Please try again."});
    

            res.status(200).json({message: "Email was sent to " + u.toObject().email + "."})

            
        }).then(u => {
            if(!u) {
                return res.status(401).json({error: "User does not exist for this email."})
            }
            let payload = {
                id: u.id,
                email: u.toObject().email,
            }
    
            out =  jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "1h"
            });
        });
    
    return out;
}


const randomPassword = async () => {//No olonger being used.

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

export const userExist = async (field): Promise<boolean> => {
    const doc = await User.findOne(field);
    
    return doc ? true : false;
}

export const verifyUser = async (req, res) => {
    let u: UserRequest = req.body;
    User.findOne({username: u.username.toLowerCase()}, (err, user) => {

        if (!user) {
            console.log("Oops");
            return res.status(403).json({authenticationerror: "Incorrect Username or Password"}); //Possibly change this status to a 401
        } else {
            let hash = user.toObject().password;


            bcrypt.compare(u.password, hash, (err, authenticated) => {
                if (err) return res.json(err);
                
                
                if (authenticated) {
                    console.log("user confirmed");
                    let role: string = user.toObject().isAdmin ? "admin" : "user"; 
                    const accessToken = generateToken(u.username, role);
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

export const isAdmin = (username: string) => { //Replace this function
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
    calendarData.push(req.body.data)//param1 may need to be changed
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




