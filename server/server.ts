import path from 'path';


const express = require('./config/express')

// Use env port or default
const port = process.env.PORT || 3000;

const app = express.init();
app.listen(port, () => console.log(`Server now running on port ${port}!`));


// app.all('/*', (req, res) => {
    
//     res.sendFile(path.resolve('../src/index.html'))

    
//     // es.sendFile(path.join(__dirname, '../public', 'index1.html'));
//     /*Add YOUR CODE HERE
//        see https://expressjs.com/en/api.html#res.sendFile
//        see https://nodejs.org/api/path.html
//        The path.resolve() method returns a string and resolves a sequence of paths or path segments into an absolute path.
//        If no path segments are passed, path.resolve() will return the absolute path of the current working directory.
//     */
//     //res.sendFile(path.resolve(...));
// });

export {};