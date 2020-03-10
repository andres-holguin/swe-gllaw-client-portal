"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('./config/express');
// Use env port or default
const port = process.env.PORT || 3000;
const app = express.init();
app.listen(port, () => console.log(`Server now running on port ${port}!`));
//# sourceMappingURL=server.js.map