import express from "express"
import { authMiddleware } from "../../middleware/auth-middleware";
import { ApplicationController } from "../../controller/appController/application-controller";

export const appRouter = express.Router();

appRouter.use(authMiddleware)

appRouter.get("/application-list", ApplicationController.getMyApplication)
appRouter.post("/application/:jobId", ApplicationController.hiringApplication)
appRouter.patch("/application/:idApp", ApplicationController.cancelApplication)
appRouter.delete("/application/:idApp", ApplicationController.deleteApplication)