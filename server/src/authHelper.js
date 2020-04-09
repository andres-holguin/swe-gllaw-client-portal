var redirectUri = 'http://localhost:3001/api/outlook/authorize';

var scopes = [ // what permissions our app needs
    'openid', // allows autho process to give us display name of user + email addie
    'profile',
    'offline_access', // gives us continuous access to user's data (refresh token)
    'https://outlook.office.com/calendars.readwrite' // lets us read user's calendar
];

var credentials = {
    client: {
      id: process.env.ID,
      secret: process.env.CLIENT_SECRET
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
        //console.log('authUri: ', redirectUri)
        //console.log('Generated auth url: ' + returnVal);
        return returnVal;
      },

      getTokenFromCode: async function(auth_code, callback, request, response) {
        console.log('GETTING TOKEN FROM CODE')
        console.log("authCode from oauth2:", oauth2.authorizationCode)
        try {
          console.log('IN TRY')
          console.log(scopes.join(' '))
          console.log('authcode: ', auth_code)
          console.log('redir ', redirectUri)
          const result = await oauth2.authorizationCode.getToken({
              code: auth_code,
              redirect_uri: redirectUri,
              scope: scopes.join(' ')
          });
          console.log('ATTEMPTING TO CREATE')
          const token = await oauth2.accessToken.create(result);
          console.log('');
          console.log('Token created: ', token.token);
          callback(request, response, null, token);
        } 
        catch (error) {
            console.log('Access Token Error', error.message);
        }
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
