import * as express from "express";
import authMiddleware from "../middlewares/auth-middleware";
import categoryController from "../controllers/category-controller";


const categoryRoutes = express.Router();

categoryRoutes
        .post("/api/categories", authMiddleware.isAuth, authMiddleware.isAdmin, categoryController.create)
        .get("/api/categories", authMiddleware.isAuth, authMiddleware.isAdmin, categoryController.findAll)
        // .get("/api/users/:id", authMiddleware.isAuth, authMiddleware.isAdmin,userController.findById);

export default categoryRoutes;