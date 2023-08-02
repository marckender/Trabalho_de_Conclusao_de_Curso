import * as express from "express";
import AuController from "../controllers/auth-controller";
import authMiddleware from "../middlewares/auth-middleware";


const authRoutes = express.Router();

authRoutes
            .post("/api/auth/login", AuController.login)
            .get("/api/auth/logout",authMiddleware.isAuth, AuController.logout)

export default authRoutes;