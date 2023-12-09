"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const auth_middleware_1 = require("../middlewares/auth-middleware");
const order_controller_1 = require("../controllers/order-controller");
const orderRoutes = express.Router();
orderRoutes
    .post("/api/orders", auth_middleware_1.default.isAuth, order_controller_1.default.create)
    .get("/api/orders", auth_middleware_1.default.isAuth, order_controller_1.default.find);
exports.default = orderRoutes;
//# sourceMappingURL=oder-routes.js.map