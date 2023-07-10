import * as express from "express";
import authMiddleware from "../middlewares/auth-middleware";
import productController from "../controllers/product-controller";


const productRoutes = express.Router();

productRoutes
        .post("/api/products", authMiddleware.isAuth, authMiddleware.isAdmin, productController.create)
        .get("/api/products", productController.findAll)

export default productRoutes;