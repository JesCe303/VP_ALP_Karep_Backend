import express from "express"
import { authMiddleware } from "../middleware/auth-middleware"
import { CompanyController } from "../controller/company-controller"
import { CompanyToTagsController } from "../controller/companyToTags-controller"
import { ApplicationController } from "../controller/appController/application-controller"
import { NotificationController } from "../controller/notification-controller"
import { CompanyTagController } from "../controller/companyTag-controller"
import { JobController } from "../controller/jobController/job-controller"
import { JobTagController } from "../controller/jobtagController/job-tag-controller"

export const privateRouter = express.Router()

privateRouter.use(authMiddleware)

privateRouter.get("/companies/profile", CompanyController.getCompanyByUserId)
privateRouter.put("/companies/profile", CompanyController.updateCompany)
privateRouter.post("/companies/profile/tags", CompanyToTagsController.createCompanyToTags)
privateRouter.delete("/companies/profile/tags/:tagId", CompanyToTagsController.deleteCompanyToTags)
privateRouter.post("/companies/jobs", JobController.createJob)
privateRouter.put("/companies/jobs/:jobId", JobController.updateJob)
privateRouter.delete("/companies/jobs/:jobId", JobController.deleteJob)
privateRouter.get("/companies/jobs", JobController.getAllJobsByCompany)
privateRouter.get("/companies/jobs/:jobId", JobController.getJob)
privateRouter.get("/companies/applications", ApplicationController.getApplicationByCompanyId)
privateRouter.get("/companies/jobs/:jobId/applications", ApplicationController.getApplicationByJobId)
privateRouter.put("/companies/applications/:applicationId/accept", ApplicationController.acceptApplication)
privateRouter.put("/companies/applications/:applicationId/reject", ApplicationController.rejectApplication)
privateRouter.get("/users/notifications", NotificationController.getNotifications)
privateRouter.delete("/users/notifications/:notificationId", NotificationController.deleteNotification)

privateRouter.get("/company-tags", CompanyTagController.getAllCompanyTags)
privateRouter.get("/jobtag-list", JobTagController.getAllJobTags)