import express from "express"
import { authMiddleware } from "../../middleware/auth-middleware";

export const jobRouter = express.Router();

jobRouter.use(authMiddleware)