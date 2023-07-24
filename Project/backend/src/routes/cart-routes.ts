import * as express from "express";
import authMiddleware from "../middlewares/auth-middleware";
import cartController from "../controllers/cart-controller";


const cartRoutes = express.Router();

cartRoutes
        .post("/api/carts", authMiddleware.isAuth, cartController.create)

export default cartRoutes;