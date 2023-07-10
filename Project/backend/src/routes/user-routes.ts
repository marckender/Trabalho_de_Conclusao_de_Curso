import * as express from "express";
import userController from "../controllers/user-controller";
import authMiddleware from "../middlewares/auth-middleware";


const userRoutes = express.Router();

userRoutes
        .post("/api/users", userController.create)
        .get("/api/users", authMiddleware.isAuth, authMiddleware.isAdmin, userController.findAll)
        .get("/api/users/:id", authMiddleware.isAuth, authMiddleware.isAdmin,userController.findById);

export default userRoutes;