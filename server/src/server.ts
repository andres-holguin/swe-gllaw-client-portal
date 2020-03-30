import Router from './routes/LoginRouter.js';
import express from 'express';
import mongoose from 'mongoose';
import config from './config/config.js';



mongoose.connect(config.db.uri, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}).then(() => {
    console.log(`Successfully connected to mongoose database.`)
});
const path = require("path");
require("dotenv").config({debug: true, path: path.join(__dirname, "../../.env")});
const express = require('./config/express')
//const app = express();





// Use env port or default
//const port = process.env.PORT;
const port = 3000;
const app = express.init();
app.use('/',Router);
app.use('/debug',Router);
//app.use('/',Router);
//app.use('/',Router);
app.all('/*', (req, res) => {//anything not above
});

app.listen(port, () => console.log(`Server now running on port ${port}!`));
//export {};