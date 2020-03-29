var clientId = '19a74451-cf77-4f79-97d7-147e5952c5a6';
var clientSecret = 'J=hkAgR6BAe6x@SLwPdAb24k-UAOnCu[';
var redirectUri = 'https://15465bff.ngrok.io/authorize';

var scopes = [ // what permissions our app needs
    'openid', // allows autho process to give us display name of user + email addie
    'profile',
    'offline_access', // gives us continuous access to user's data (refresh token)
    'https://outlook.office.com/calendars.readwrite' // lets us read user's calendar
];

var credentials = {
    client: {
      id: clientId,
      secret: clientSecret
    },
    auth: {
      tokenHost: 'https://login.microsoftonline.com',
      authorizePath: "common/oauth2/v2.0/authorize",
      tokenPath: "common/oauth2/v2.0/token",
    }
  }
const oauth2 = require('simple-oauth2').create(credentials);

  module.exports = {
    getAuthUrl: function() {
        console.log('get auth function')
        var returnVal = oauth2.authorizationCode.authorizeURL({
          redirect_uri: redirectUri,
          scope: scopes.join(' ')
        });
        console.log('');
        console.log('authUri: ', redirectUri)
        console.log('Generated auth url: ' + returnVal);
        return returnVal;
      },

      getTokenFromCode: function(auth_code, callback, request, response) {
        console.log('authcode: ', auth_code)
        console.log('redir ', redirectUri)
        oauth2.authCode.getToken({ // uses oauth2 lib to get the token
          code: auth_code,
          redirect_uri: redirectUri,
          scope: scopes.join(' ')
          }, function (error, result) {
            if (error) {
              console.log('Access token error: ', error);
              callback(request ,response, error, null);
            }
            else {
              var token = oauth2.accessToken.create(result);
              console.log('');
              console.log('Token created: ', token.token);
              callback(request, response, null, token);
            }
          });
      },

      getEmailFromIdToken: function(id_token) {
        // JWT is in three parts, separated by a '.'
        var token_parts = id_token.split('.');
    
        // Token content is in the second part, in urlsafe base64
        var encoded_token = new Buffer(token_parts[1].replace('-', '+').replace('_', '/'), 'base64');
    
        var decoded_token = encoded_token.toString();
    
        var jwt = JSON.parse(decoded_token);
    
        // Email is in the preferred_username field
        return jwt.preferred_username
      },

      getTokenFromRefreshToken: function(refresh_token, callback, request, response) {
        var token = oauth2.accessToken.create({ refresh_token: refresh_token, expires_in: 0});
        token.refresh(function(error, result) {
          if (error) {
            console.log('Refresh token error: ', error.message);
            callback(request, response, error, null);
          }
          else {
            console.log('New token: ', result.token);
            callback(request, response, null, result);
          }
        });
      }
  };
