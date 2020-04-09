import loginRouter from '../routes/LoginRouter';
import outlookRouter from '../routes/OutlookRouter';
import calenderRouter from '../routes/CalenderRouter';
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

    // LoginRouter
    app.use('/api/user', loginRouter);
    
    //calender router
    app.use('/',calenderRouter);

    // OutlookRouter
    app.use('/api/outlook', outlookRouter);

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

