import * as express from "express";
import userController from "../controllers/user-controller";


const userRoutes = express.Router();

userRoutes.post("/api/users", userController.create);
userRoutes.get("/api/users", userController.findAll);

export default userRoutes;