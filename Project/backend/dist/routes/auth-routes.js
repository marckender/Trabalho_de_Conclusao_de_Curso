"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const auth_controller_1 = require("../controllers/auth-controller");
const auth_middleware_1 = require("../middlewares/auth-middleware");
const authRoutes = express.Router();
authRoutes
    .post("/api/auth/login", auth_controller_1.default.login)
    .get("/api/auth/logout", auth_middleware_1.default.isAuth, auth_controller_1.default.logout);
exports.default = authRoutes;
//# sourceMappingURL=auth-routes.js.map