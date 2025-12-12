import express from "express"
import { authMiddleware } from "../../middleware/auth-middleware";
import { JobTagController } from "../../controller/jobtagController/job-tag-controller";

export const jobtagRouter = express.Router();

jobtagRouter.use(authMiddleware);

jobtagRouter.get("/jobtag-list", JobTagController.getAllJobTags)
jobtagRouter.post("/jobtag/create", JobTagController.createJobTag)
