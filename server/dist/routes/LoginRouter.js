"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserController_1 = require("../controllers/UserController");
const user_1 = require("../user");
const express_1 = __importDefault(require("express"));
const loginRouter = express_1.default.Router();
loginRouter.post("/register", user_1.register);
loginRouter.post("/:Login", (req, res) => {
    user_1.login(req, res);
    // res.json(req.body);
});
loginRouter.put("/update", (req, res) => {
    UserController_1.update(req, res);
});
module.exports = loginRouter;
exports.default = loginRouter;
//# sourceMappingURL=LoginRouter.js.map