import express from 'express'
var cookieParser = require('cookie-parser');
var session = require('express-session');
var authHelper = require('../authHelper');
var bodyParser = require('body-parser');

const outlookRouter = express.Router();

outlookRouter.use(express.static('static'));

outlookRouter.use(bodyParser.json());

// Set up cookies and sessions to save tokens
outlookRouter.use(cookieParser());

outlookRouter.use(session({ 
    secret: '0dc529ba-5051-4cd6-8b67-c9a901bb8bdf',
    resave: false,
    saveUninitialized: false 
}));

outlookRouter.get('/calendar', function(req, res) {
    console.log('IM HEREEE AND READY 2 SEND')
    //console.log(authHelper.getAuthUrl())
    res.send(authHelper.getAuthUrl());
});

outlookRouter.get('/authorize', function(req, res) { // happens at the redirect
    console.log('HERE', req.query.code)
    var authCode = req.query.code; // chec for code apram - gives us auth code needed to exchange for token
    if (authCode) {
        console.log('');
        console.log('Retrieved auth code in /authorize: ' + authCode);
        authHelper.getTokenFromCode(authCode, tokenReceived, req, res); // getTokenFromCode function is in authHelper
    }
    else {
        // redirect to home
        console.log('/authorize called without a code parameter, redirecting to login');
        res.redirect('/Login');
    }
});

function tokenReceived(req, res, error, token) {
    console.log('token ', token)
    if (error) {
      console.log('ERROR getting token:'  + error);
      res.send('ERROR getting token: ' + error);
    }
    else {
      // save tokens in session
      req.session.access_token = token.token.access_token;
      req.session.refresh_token = token.token.access_token;
      req.session.email = authHelper.getEmailFromIdToken(token.token.id_token);
      res.redirect('/documents'); // this is what happens last
    }
}
  
module.exports = outlookRouter;
export default outlookRouter;