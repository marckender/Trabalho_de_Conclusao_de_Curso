import * as express from "express";
import authMiddleware from "../middlewares/auth-middleware";
import productController from "../controllers/product-controller";

// const multer = require("multer");

// const Multer = multer({
//   storage: multer.memoryStorage(),
//   limits: 1024 * 1024,
// });
const productRoutes = express.Router();



// const uploadImage = require("../services/firebase-services")


productRoutes
  .post(
    "/api/products",
    authMiddleware.isAuth,
    authMiddleware.isAdmin,
    productController.create,
  )
  .get("/api/products", productController.findAll)
  .get("/api/products/:id", productController.find)
  .delete("/api/products/:id", authMiddleware.isAuth, authMiddleware.isAdmin, productController.delete);

export default productRoutes;
