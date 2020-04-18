/* Dependencies */
import User from '../models/USERModel';
//import config from '../config/config';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
import * as caseController from './CaseController';
import {Request, Response}  from 'express';
import { MongooseDocument } from 'mongoose';
import * as express from 'express';
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
interface names {
    firstname: string,
    lastname: string,
}
export const findNameId = async (req: express.Request, res: express.Response) => {
    let id = new Promise<string>((resolve, reject) => {
        let name: names = req.body.user;
        console.log(name);
        User.findOne({firstname: name.firstname.toLowerCase(), lastname: name.lastname.toLowerCase()}, (err, user) => {
            //console.log(user);
            if (err) return res.status(500).json({error: "There was an error"});
            if (!user) {
                return res.status(404).json({error: "User does not exist"});
            }
            
            resolve(user._id);
            
        })
    });

    return id;

}

export const assignCaseByID = (userID: string,  caseId: string,  res: express.Response) => {
    console.log("case", caseId);
    User.findByIdAndUpdate(userID,
        { $push: {cases: caseId}}, (err, success) => {
            if (err) {
                return res.status(500).json({error: "An error occured assigning user please try again."});
            }
    });
} 

export const assignAdmin = async (req, res) => {
    let name = req.body.name;
    await User.findOneAndUpdate({username:name}, {isAdmin: true});
    res.status(200).json({message: name +' is now an admin.'});
}

const generateToken = (username: string, role: string) => {

    const tok = {name: username, role};
    const accessToken = jwt.sign(tok, secret);
    console.log(accessToken);
    return accessToken;
}

const findFromJWT = async (req: express.Request, res: express.Response ) => {//: Promise<string> => {
    let token = req.cookies['jwt'];
    let name = new Promise<string>((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            
            if(err) throw reject("No token provided");
                 resolve(decoded.name);
            });
    });
   return name;
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

export const pass_link = async (req: express.Request, res: express.Response) => {

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
    User.findOne({username: newUser.username.toLowerCase()}).then(async (user) => {
            if (user) return res.status(401).json({userExist: "User Already Exist"});
            
            else {
            User.create({ 
                firstname: newUser.firstname,
                lastname: newUser.lastname,
                username: newUser.username.toLowerCase(),
                email: newUser.email.toLowerCase(),
                password: hashPass(req.body.password),
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
    //console.log(u);
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
                    httpOnly: true}).redirect(200, '/');//.json({accessToken: accessToken});

                } else {
                    console.log("User not confirmed");
                    return res.status(403).json({error: "Incorrect Username or Password."});
                }
            });
        }
    });

}

const updateOne = async (name: string, change: any) => {
    User.updateOne({username: name}, change);
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

export const fetchIsAdmin = (req: express.Request, res: express.Response) => { 
    const secret = process.env.JWT_SECRET;
    const getUserNamefromCookie = (cookie) => {
    jwt.verify(cookie, secret, (err, decoded) => {
    if (err) throw err;
        return decoded.username;
        });
    }
    let Tok =req.cookies["jwt"];
    let username = getUserNamefromCookie(Tok);
    User.findOne({username: username}, function(err,data){
        if(err) throw err;
        res.send(data.toObject().isAdmin);
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

export const listCases = async (req: express.Request, res: express.Response) => {
    let username: string = await findFromJWT(req, res);
    

   User.findOne({username: username}, async (err, user) => {
        
        if(user){
            console.log(user.toObject().cases);
            let myCases = await caseController.findFromIDS(user.toObject().cases);
            console.log(myCases);
            res.status(200).json({
                cases: myCases//await caseController.findFromIDS(user.toObject().cases)
            });
        }
    });
};

export const listCaseIds = async(req: express.Request, res: express.Response) => {
    let username: string = await findFromJWT(req, res);
    console.log(username);
    User.findOne({username: username}, (err, user) => {
        
        if(user){
        console.log(user.toObject().cases);
        res.status(200).json({
            active: {
                cases: user.toObject().cases
            }
        })
        }
    });
}

export const assignCase = (req: express.Request, res: express.Response) => {
    let user = req.body.username;
    
    let newCase: string = req.body.case;

    
    User.findOneAndUpdate({username: user}, 
        { $push: {cases: newCase}}, (err, success) => {
            if (err) {
                return res.status(500).json({error: "An error occured please try again."});

            }
            else {
                res.status(200).json({message: 'Successfully added case ' + newCase + ' to ' + user});
            }
        });
}

export const updateCalender =async (req, res) => {
    //console.log("HERE")
    //const jwt = require("json-web-token");
    const secret = process.env.JWT_SECRET;

    let Tok =req.cookies["jwt"];
    let username;

    jwt.verify(Tok, secret, (err, decoded) => {
        if (err) 
            throw err;
        else 
            console.log('decoded username is: ', decoded.name)
            username = decoded.name;
        });

    console.log("the user requesting data is: ", username)
   
   let calendarData;
   await User.findOne({username: username}, function(err,data){
       if(err) throw err;
       calendarData = data.toObject().calenderEntrys;
       calendarData.push(req.body.calenderEntrys);   
    });
   await User.findOneAndUpdate({username: username}, {calenderEntrys: calendarData});
   res.status(200).json({message: 'Successfully added new Calender Entry to ' + username});
};

export const getCalender = (req, res) => {
    //const jwt = require("json-web-token");
    const secret = process.env.JWT_SECRET;

    let Tok =req.cookies["jwt"];
    let username;

    jwt.verify(Tok, secret, (err, decoded) => {
        if (err) 
            throw err;
        else 
            console.log('decoded username is: ', decoded.name)
            username = decoded.name;
        });

    console.log("the user requesting data is: ", username)

    User.findOne({username: username}, function(err,data){
        if(err) throw err;
        res.send(data.toObject().calenderEntrys);
    });
};

export const deleteFromCalender =async (req, res) => {
    //console.log("HERE")
    //const jwt = require("json-web-token");
    const secret = process.env.JWT_SECRET;
    const getUserNamefromCookie = (cookie) => {
      jwt.verify(cookie, secret, (err, decoded) => {
     if (err) throw err;
        return decoded.username;
        });
    }
    let Tok =req.cookies["jwt"];
    let username = getUserNamefromCookie(Tok);

   function checkvalue(val) {
    if(val.start != req.body.calenderEntrys.start || val.title != req.body.calenderEntrys.title || val.end != req.body.calenderEntrys.end)
    {
        return true;
    }
    else
    {
        return false;
    }
   }
   let calendarData;
   await User.findOne({username: username}, function(err,data){
       if(err) throw err;
       calendarData = data.toObject().calenderEntrys.filter(checkvalue);
    });
   await User.findOneAndUpdate({username: username}, {calenderEntrys: calendarData});
   res.status(200).json({message: 'Successfully removed the Calender Entry'});
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




