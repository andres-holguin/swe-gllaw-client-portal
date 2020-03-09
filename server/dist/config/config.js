"use strict";
//This file holds any configuration variables we may need 
//'config.js' is ignored by git to protect sensitive information, such as your database's username and password
//copy this file's contents to another file 'config.js' and store your MongoLab uri there
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    db: {
        uri: 'mongodb+srv://annal:test@test-w04ur.mongodb.net/test?retryWrites=true&w=majority' //place the URI of your mongo database here.
    },
    port: 5000
};
//# sourceMappingURL=config.js.map