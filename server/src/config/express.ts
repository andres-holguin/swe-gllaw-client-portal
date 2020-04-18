import loginRouter from '../routes/LoginRouter';
import outlookRouter from '../routes/OutlookRouter';
import mailRouter from '../routes/MailRouter';
import authRouter from '../routes/AuthRouter';
import documentRouter from '../routes/DocumentRouter';
import express from 'express';
import caseRouter from '../routes/CaseRouter';
import calenderRouter from '../routes/CalenderRouter';
const path = require('path'),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser');
module.exports.init = () => {
    /* 
        connect to database
        - reference README for db uri
    */
    mongoose.connect(process.env.DB_URI, { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

   // mongoose.connect(connection);
    mongoose.set('useCreateIndex', true);
    mongoose.set('useFindAndModify', false); 

    const app = express();

    app.use(cookieParser());

    // enable request logging for development debugging
    app.use(morgan('dev'));

    // body parsing middleware
    app.use(bodyParser.json());

    app.use('/api/mail', mailRouter);


    // LoginRouter
    app.use('/api/user', loginRouter);
    
    //calender router
    app.use('/api/calender',calenderRouter);

    app.use('/api/case', caseRouter);
    // OutlookRouter
    app.use('/api/outlook', outlookRouter);

    //Auth Router for forgotten passwords, may move login, register into this.
    app.use('/api/auth', authRouter);

    //Document Router
    app.use('/api/document', documentRouter);
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

