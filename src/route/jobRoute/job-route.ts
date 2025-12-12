import express from "express"
import { authMiddleware } from "../../middleware/auth-middleware";
import { JobController } from "../../controller/jobController/job-controller";

export const jobRouter = express.Router();

jobRouter.use(authMiddleware)

jobRouter.get("/job-list", JobController.getAllJobs)
jobRouter.get("/job-list/company", JobController.getAllJobsByCompany)
jobRouter.get("/job/:jobId", JobController.getJob)
jobRouter.post("/job/create", JobController.createJob)
jobRouter.put("/job/:jobId", JobController.updateJob)
jobRouter.get("/job-list/job", JobController.searchJobs)
jobRouter.delete("/job/:jobId", JobController.deleteJob)