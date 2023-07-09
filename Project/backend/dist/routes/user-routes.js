"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const user_controller_1 = require("../controllers/user-controller");
const auth_middleware_1 = require("../middlewares/auth-middleware");
const userRoutes = express.Router();
userRoutes
    .post("/api/users", user_controller_1.default.create)
    .get("/api/users", auth_middleware_1.default.isAuth, auth_middleware_1.default.isAdmin, user_controller_1.default.findAll)
    .get("/api/users/:id", user_controller_1.default.findById);
exports.default = userRoutes;
//# sourceMappingURL=user-routes.js.map