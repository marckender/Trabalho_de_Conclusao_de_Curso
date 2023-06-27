import * as express from "express";
import appController from "../controllers/app-controller";


const appRoutes = express.Router();


appRoutes.get("/api", appController.getAppInfo);

export default appRoutes;