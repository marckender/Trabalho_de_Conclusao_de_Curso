"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const app_controller_1 = require("../controllers/app-controller");
const appRoutes = express.Router();
appRoutes.get("/api", app_controller_1.default.getAppInfo);
exports.default = appRoutes;
//# sourceMappingURL=app-routes.js.map