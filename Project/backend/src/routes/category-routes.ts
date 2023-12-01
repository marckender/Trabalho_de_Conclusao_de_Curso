import * as express from "express";
import authMiddleware from "../middlewares/auth-middleware";
import categoryController from "../controllers/category-controller";


const categoryRoutes = express.Router();

categoryRoutes
        .post("/api/categories", authMiddleware.isAuth, authMiddleware.isAdmin, categoryController.create)
        .get("/api/categories", categoryController.findAll)
        .delete("/api/categories/:id", authMiddleware.isAuth, authMiddleware.isAdmin, categoryController.delete);

export default categoryRoutes;