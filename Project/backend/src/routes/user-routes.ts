import * as express from "express";
import userController from "../controllers/user-controller";


const userRoutes = express.Router();

userRoutes
        .post("/api/users", userController.create)
        .get("/api/users", userController.findAll)
        .get("/api/users/:id", userController.findById);

export default userRoutes;