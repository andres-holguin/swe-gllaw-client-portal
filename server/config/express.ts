import loginRouter from '../routes/LoginRouter'
const path = require('path'),
    express = require('express'),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    bodyParser = require('body-parser');
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

    app.get('*', (req, res) => {
        //res.send('hello')
        app.use(express.static(path.join(__dirname, '../../../build')));
        res.sendFile(path.join(__dirname, '../../../build', 'index.html'));
    });

    if (process.env.NODE_ENV === 'production') {
        // Serve any static files
        // app.use(express.static(path.join(__dirname, '../../../build')));
    
        // Handle React routing, return all requests to React app
        app.get('*', (req, res) => {
            res.send('Hello')

            //res.sendFile(path.join(__dirname, '../../../build', 'index.html'));
        });
    }

    // LoginRouter
    app.use('/api/user', loginRouter);

    return app;
};

