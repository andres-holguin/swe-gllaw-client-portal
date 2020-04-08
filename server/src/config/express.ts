import loginRouter from '../routes/LoginRouter'
import outlookRouter from '../routes/OutlookRouter';
import mailRouter from '../routes/MailRouter'
import authRouter from '../routes/AuthRouter';
//import DocumentRouter from '../routes/DocumentRouter'
const path = require('path'),
    express = require('express'),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser');

    //const config = require('./config');
module.exports.init = () => {
    /* 
        connect to database
        - reference README for db uri
    */
    mongoose.connect(process.env.DB_URI, { //|| config.default.db.uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    mongoose.set('useCreateIndex', true);
    mongoose.set('useFindAndModify', false); 
    
    
    // initialize app
    const app = express();
    app.use(cookieParser());

    // enable request logging for development debugging
    app.use(morgan('dev'));

    // body parsing middleware
    app.use(bodyParser.json());

    app.use('/api/mail', mailRouter);

    // LoginRouter
    app.use('/api/user', loginRouter);

    // OutlookRouter
    app.use('/api/outlook', outlookRouter);

    app.use('/api/auth', authRouter);
    //app.use('/debug',loginRouter);
    if (process.env.NODE_ENV === 'production') {
        // Serve any static files
        app.use(express.static(path.join(__dirname, '../../../client/build')));

        // Handle React routing, return all requests to React app
        app.get('*', function(req, res) {
            res.sendFile(path.join(__dirname, '../../../client/build', 'index.html'));
        }); 
    } 

    return app;
};

