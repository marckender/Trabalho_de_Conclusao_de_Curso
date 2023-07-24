"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const auth_middleware_1 = require("../middlewares/auth-middleware");
const cart_controller_1 = require("../controllers/cart-controller");
const cartRoutes = express.Router();
cartRoutes
    .post("/api/carts", auth_middleware_1.default.isAuth, cart_controller_1.default.create);
exports.default = cartRoutes;
//# sourceMappingURL=cart-routes.js.map