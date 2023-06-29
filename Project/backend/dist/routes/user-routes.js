"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const user_controller_1 = require("../controllers/user-controller");
const userRoutes = express.Router();
console.log("entrei");
userRoutes.post("/api/users", user_controller_1.default.create);
exports.default = userRoutes;
//# sourceMappingURL=user-routes.js.map