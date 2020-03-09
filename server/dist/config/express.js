"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const LoginRouter_1 = __importDefault(require("../routes/LoginRouter"));
const path = require('path'), express = require('express'), mongoose = require('mongoose'), morgan = require('morgan'), bodyParser = require('body-parser');
const config = require('./config');
module.exports.init = () => {
    /*
        connect to database
        - reference README for db uri
    */
    mongoose.connect(process.env.DB_URI || config.default.db.uri, {
        useNewUrlParser: true
    });
    mongoose.set('useCreateIndex', true);
    mongoose.set('useFindAndModify', false);
    // initialize app
    const app = express();
    // enable request logging for development debugging
    app.use(morgan('dev'));
    // body parsing middleware
    app.use(bodyParser.json());
    if (process.env.NODE_ENV === 'production') {
        // Serve any static files
        app.use(express.static(path.join(__dirname, 'public')));
        // Handle React routing, return all requests to React app
        app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, 'public', 'index.html'));
        });
    }
    // LoginRouter
    app.use('/api/user', LoginRouter_1.default);
    return app;
};
//# sourceMappingURL=express.js.map