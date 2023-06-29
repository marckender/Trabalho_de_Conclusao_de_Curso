import * as express from "express";
import userController from "../controllers/user-controller";


const userRoutes = express.Router();

console.log("entrei")
userRoutes.post("/api/users", userController.create);

export default userRoutes;