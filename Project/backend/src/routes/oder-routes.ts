import * as express from "express";
import authMiddleware from "../middlewares/auth-middleware";
import orderController from "../controllers/order-controller";


const orderRoutes = express.Router();

orderRoutes
        .post("/api/orders", authMiddleware.isAuth, orderController.create)
        .get("/api/orders", authMiddleware.isAuth, orderController.find)
export default orderRoutes;