import express from 'express'
var cookieParser = require('cookie-parser');
var session = require('express-session');
var authHelper = require('../authHelper');
var bodyParser = require('body-parser');
var outlook = require('node-outlook');
var moment = require('moment');

const outlookRouter = express.Router();

outlookRouter.use(express.static('static'));

outlookRouter.use(bodyParser.json());
outlookRouter.use(bodyParser.urlencoded({ extended: true }));

// Set up cookies and sessions to save tokens
outlookRouter.use(cookieParser());

outlookRouter.use(session({ 
    secret: '0dc529ba-5051-4cd6-8b67-c9a901bb8bdf',
    resave: false,
    saveUninitialized: false 
}));

outlookRouter.get('/authurl', function(req, res) {
    console.log('IM HERE AND READY 2 SEND')
    //console.log(authHelper.getAuthUrl())
    res.send(authHelper.getAuthUrl());
});

outlookRouter.get('/authorize', function(req, res) { // happens at the redirect
    console.log('HERE', req.query.code)
    var authCode = req.query.code; // chec for code param - gives us auth code needed to exchange for token
    if (authCode) {
        console.log('');
        console.log('Retrieved auth code in /authorize: ' + authCode);
        authHelper.getTokenFromCode(authCode, tokenReceived, req, res); // getTokenFromCode function is in authHelper
    }
    else {
        // redirect to home
        console.log('/authorize called without a code parameter, redirecting to login');
        //res.redirect('/Calendar');
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
      console.log("IM HEEREEEEREEEEEEEEE WOOHOOOOOOOOOOOOOO")
      req.session.access_token = token.token.access_token;
      req.session.refresh_token = token.token.refresh_token;
      req.session.email = authHelper.getEmailFromIdToken(token.token.id_token);
      res.redirect('http://localhost:3000/Calendar'); // this is what happens last
    }
}

// ??? 
outlookRouter.get('/logincomplete', function(req, res) {
    let access_token = req.session.access_token;
    let refresh_token = req.session.refresh_token;
    let email = req.session.email;
    
    if (access_token === undefined || refresh_token === undefined) {
      console.log('/logincomplete called while not logged in');
      res.redirect('/');
      return;
    }
    console.log('sending email...', email)
    res.send(email);
  });

  outlookRouter.get('/refreshtokens', function(req, res) {
    var refresh_token = req.session.refresh_token;
    if (refresh_token === undefined) {
      console.log('no refresh token in session');
      res.redirect('/');
    }
    else {
      authHelper.getTokenFromRefreshToken(refresh_token, tokenReceived, req, res);
    }
  });

  outlookRouter.get('/sync', function(req, res) {
    var token = req.session.access_token;
    var email = req.session.email;
    if (token === undefined || email === undefined) {
      console.log('/sync called while not logged in');
      res.redirect('/');
      return;
    }
    
    // Set the endpoint to API v2
    outlook.base.setApiEndpoint('https://outlook.office.com/api/v2.0');
    // Set the user's email as the anchor mailbox
    outlook.base.setAnchorMailbox(req.session.email);
    // Set the preferred time zone
    outlook.base.setPreferredTimeZone('Eastern Standard Time');
    
    // Use the syncUrl if available
    var requestUrl = req.session.syncUrl;
    if (requestUrl === undefined) {
      // Calendar sync works on the CalendarView endpoint
      requestUrl = outlook.base.apiEndpoint() + '/Me/CalendarView';
    }
    
    // Set up our sync window from midnight on the current day to
    // midnight 7 days from now.
    var startDate = moment().startOf('day');
    var endDate = moment(startDate).add(7, 'days');
    // The start and end date are passed as query parameters
    var params = {
      startDateTime: startDate.toISOString(),
      endDateTime: endDate.toISOString()
    };
    
    // Set the required headers for sync
    var headers = {
      Prefer: [ 
        // Enables sync functionality
        'odata.track-changes',
        // Requests only 5 changes per response
        'odata.maxpagesize=5'
      ]
    };
    
    var apiOptions = {
      url: requestUrl,
      token: token,
      headers: headers,
      query: params
    };
    
    outlook.base.makeApiCall(apiOptions, function(error, response) {
      if (error) {
        console.log(JSON.stringify(error));
        res.send(JSON.stringify(error));
      }
      else {
        if (response.statusCode !== 200) {
          console.log('API Call returned ' + response.statusCode);
          res.send('API Call returned ' + response.statusCode);
        }
        else {
          var nextLink = response.body['@odata.nextLink'];
          if (nextLink !== undefined) {
            req.session.syncUrl = nextLink;
          }
          var deltaLink = response.body['@odata.deltaLink'];
          if (deltaLink !== undefined) {
            req.session.syncUrl = deltaLink;
          }
          res.send(email);
        }
      }
    });
  });

  outlookRouter.post('/createitem', function(req, res) {
    console.log(req.body)
    
    let createEventParameters = {
      token: req.session.access_token,
      event: req.body.newEvent
    };
    
    outlook.calendar.createEvent(createEventParameters, function (error, event) {
      if(error) {
          console.log(error);                 
      } else {
          console.log(event);
          res.send('Success!')                         
      }
    });
  });
  
module.exports = outlookRouter;
export default outlookRouter;