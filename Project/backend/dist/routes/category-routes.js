"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const auth_middleware_1 = require("../middlewares/auth-middleware");
const category_controller_1 = require("../controllers/category-controller");
const categoryRoutes = express.Router();
categoryRoutes
    .post("/api/categories", auth_middleware_1.default.isAuth, auth_middleware_1.default.isAdmin, category_controller_1.default.create)
    .get("/api/categories", category_controller_1.default.findAll)
    .delete("/api/categories/:id", auth_middleware_1.default.isAuth, auth_middleware_1.default.isAdmin, category_controller_1.default.delete)
    .put("/api/categories/:id", auth_middleware_1.default.isAuth, auth_middleware_1.default.isAdmin, category_controller_1.default.update);
exports.default = categoryRoutes;
//# sourceMappingURL=category-routes.js.map