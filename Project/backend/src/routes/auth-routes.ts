import * as express from "express";
import AuController from "../controllers/auth-controller";


const authRoutes = express.Router();

authRoutes
            .post("/api/auth/login", AuController.login)

export default authRoutes;