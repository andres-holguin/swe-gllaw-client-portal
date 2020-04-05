import loginRouter from '../routes/LoginRouter'
import outlookRouter from '../routes/OutlookRouter';
const path = require('path'),
    express = require('express'),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    bodyParser = require('body-parser');
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

    // enable request logging for development debugging
    app.use(morgan('dev'));

    // body parsing middleware
    app.use(bodyParser.json());

    // LoginRouter
    app.use('/api/user', loginRouter);

    // OutlookRouter
    app.use('/api/outlook', outlookRouter)

    // app.get("*", (req, res) => {
    //     res.sendFile(path.join(__dirname, "../../../client/index.html"));
    // });

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

