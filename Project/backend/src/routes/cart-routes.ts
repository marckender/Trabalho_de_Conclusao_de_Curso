import * as express from "express";
import authMiddleware from "../middlewares/auth-middleware";
import cartController from "../controllers/cart-controller";


const cartRoutes = express.Router();

cartRoutes
        .post("/api/carts", authMiddleware.isAuth, cartController.create)
        .get("/api/carts", authMiddleware.isAuth, cartController.find)
        .delete("/api/carts/:id", authMiddleware.isAuth, cartController.delete)

export default cartRoutes;