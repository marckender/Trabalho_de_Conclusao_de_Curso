"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const user_controller_1 = require("../controllers/user-controller");
const userRoutes = express.Router();
userRoutes.post("/api/users", user_controller_1.default.create);
userRoutes.get("/api/users", user_controller_1.default.findAll);
userRoutes.get("/api/users/:id", user_controller_1.default.findById);
exports.default = userRoutes;
//# sourceMappingURL=user-routes.js.map