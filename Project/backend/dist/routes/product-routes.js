"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const auth_middleware_1 = require("../middlewares/auth-middleware");
const product_controller_1 = require("../controllers/product-controller");
const multer = require("multer");
const productRoutes = express.Router();
const Multer = multer({
    storage: multer.memoryStorage(),
});
const uploadImage = require("../services/firebase-services");
const type = Multer.array('images');
productRoutes
    .post("/api/products", auth_middleware_1.default.isAuth, auth_middleware_1.default.isAdmin, type, uploadImage, product_controller_1.default.create)
    .get("/api/products", product_controller_1.default.findAll)
    .get("/api/products/:id", product_controller_1.default.find)
    .delete("/api/products/:id", auth_middleware_1.default.isAuth, auth_middleware_1.default.isAdmin, product_controller_1.default.delete);
exports.default = productRoutes;
//# sourceMappingURL=product-routes.js.map