import express from "express"
import { authMiddleware } from "../../middleware/auth-middleware";

export const appRouter = express.Router();

appRouter.use(authMiddleware)

appRouter.get("/application-list")
appRouter.post("/application/:jobId")
appRouter.patch("/application/:idApp")