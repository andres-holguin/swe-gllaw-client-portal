
import User from "../models/USERModel"
import {create, read, update} from "../controllers/UserController"

const express = require("express");
const loginRouter = express.Router();


loginRouter.post("/register", (req, res) => {
    create(req, res);
});

loginRouter.post("/login", (req, res) => {
    read(req, res);
});