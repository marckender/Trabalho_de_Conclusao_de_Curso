import * as express from "express";
import userController from "../controllers/user-controller";


const userRoutes = express.Router();

userRoutes.post("/api/users", userController.create);
userRoutes.get("/api/users", userController.findAll);
userRoutes.get("/api/users/:id", userController.findById);

export default userRoutes;