"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* Dependencies */
const USERModel_1 = __importDefault(require("../models/USERModel"));
const bcrypt = require("bcrypt");
const saltRounds = 10;
/* Create a listing */
exports.create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let err = {};
    let user_req = req.body.u_req;
    console.log(user_req);
    let hashedPassword = bcrypt.hashSync(user_req.password, saltRounds);
    console.log(hashedPassword);
    USERModel_1.default.findOne({ username: user_req.userName }).then(user => {
        if (user) {
            console.log("User already exisit");
            err.user = "User already exists"; //TODO send back a response.
        }
        else {
            USERModel_1.default.create({
                username: user_req.userName,
                email: user_req.email,
                password: hashedPassword,
                isAdmin: false,
            }).then((d) => {
                d.save();
                console.log("Saved");
            });
        }
    });
});
/* Show the current listing */
exports.read = (name, res) => {
    USERModel_1.default.findOne({ username: name }).then(user => {
        if (!user) {
            console.log("User does not exist");
            //res.send("User does not exist");
        }
        else {
            console.log("User exists");
            res.result = user;
        }
    });
};
exports.verifyUser = (req, res) => {
    let u = req.body.u_req;
    USERModel_1.default.findOne({ username: u.userName }).then(user => {
        if (!user) {
            console.log("Oops");
            return res.status(404).json({ userNotFound: "User not found" });
        }
        else {
            console.log(u);
            console.log(user.toObject());
            let hash = user.toObject().password;
            if (bcrypt.compareSync(u.password, hash)) {
                console.log("user confirmed");
                res.send(true);
            }
            else {
                console.log("User not confirmed");
                res.send(false);
            }
        }
    });
};
/* Update a listing*/
exports.update = (req, res) => {
    let u_req = req.body.u_req;
    USERModel_1.default.findOneAndUpdate({ username: u_req.userName }, {
        username: req.user.username
    });
};
exports.resetPassword = (hmm) => {
    let user = hmm.username;
    //let userDocument  = getUser(user);
    USERModel_1.default.updateOne({ username: user }, {});
};
/* Delete a listing */
exports.remove = (req, res) => {
    USERModel_1.default.findOneAndDelete({ username: req.body.u_req.userName }, (err, result) => {
        if (err)
            throw err;
        if (!result) {
            console.log("No user by that name exist.");
            res.status(404).json({ nouser: "No user by that name exist." });
        }
    });
};
exports.getUser = (username) => {
    USERModel_1.default.findOne({ username: username }).exec().then((d) => {
        return d;
    });
};
const isAdmin = (username) => {
    USERModel_1.default.findOne({ username: username }, (err, u) => {
        if (err)
            throw err;
        if (!u) {
            console.log("No account with that name exist.");
            return true;
        }
        else {
            if (u.toObject().isAdmin) {
                console.log("is admin.");
                return true;
            }
            else {
                return false;
            }
        }
    });
};
const deleteUser = (req, res) => {
    //Im gonna need to check if the user is an admin.
    //req.body.u_req;
};
/* Retreive all the directory listings*/
exports.list = (req, res) => {
    USERModel_1.default.find({}, function (err, data) {
        if (err)
            throw err;
        res.send(data);
    }).sort({ code: 1 });
};
//# sourceMappingURL=UserController.js.map