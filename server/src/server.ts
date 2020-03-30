

const path = require("path");
require("dotenv").config({debug: true, path: path.join(__dirname, "../../.env")});
const express = require('./config/express')

// Use env port or default
//const port = process.env.PORT;
const port = 3000;
const app = express.init();
app.listen(port, () => console.log(`Server now running on port ${port}!`));
export {};