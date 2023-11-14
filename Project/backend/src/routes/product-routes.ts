import * as express from "express";
import authMiddleware from "../middlewares/auth-middleware";
import productController from "../controllers/product-controller";
const multer = require("multer");

const productRoutes = express.Router();


const Multer = multer({
  storage: multer.memoryStorage(),
});

const uploadImage = require("../services/firebase-services")

const type = Multer.single('imagem');

productRoutes
  .post(
    "/api/products",
    authMiddleware.isAuth,
    authMiddleware.isAdmin,
    type,
    uploadImage,
    productController.create,
  )
  .get("/api/products", productController.findAll)
  .get("/api/products/:id", productController.find)
  .delete("/api/products/:id", authMiddleware.isAuth, authMiddleware.isAdmin, productController.delete);

export default productRoutes;
