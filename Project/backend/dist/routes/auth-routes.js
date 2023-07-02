"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const auth_controller_1 = require("../controllers/auth-controller");
const authRoutes = express.Router();
authRoutes
    .post("/api/auth/login", auth_controller_1.default.login);
exports.default = authRoutes;
//# sourceMappingURL=auth-routes.js.map