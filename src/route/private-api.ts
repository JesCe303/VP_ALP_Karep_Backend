import express from "express"
import { authMiddleware } from "../middleware/auth-middleware"
import { CompanyController } from "../controller/company-controller"
import { CompanyToTagsController } from "../controller/companyToTags-controller"
import { ApplicationController } from "../controller/application-controller"
import { NotificationController } from "../controller/notification-controller"
import { CompanyTagController } from "../controller/companyTag-controller"

export const privateRouter = express.Router()

privateRouter.use(authMiddleware)

privateRouter.get("/companies/profile", CompanyController.getCompanyByUserId)
privateRouter.put("/companies/profile", CompanyController.updateCompany)
privateRouter.post("/companies/profile/tags", CompanyToTagsController.createCompanyToTags)
privateRouter.delete("/companies/profile/tags/:tagId", CompanyToTagsController.deleteCompanyToTags)
privateRouter.get("/companies/applications", ApplicationController.getApplicationByCompanyId)
privateRouter.get("/companies/jobs/:jobId/applications", ApplicationController.getApplicationByJobId)
privateRouter.put("/companies/applications/:applicationId/accept", ApplicationController.acceptApplication)
privateRouter.put("/companies/applications/:applicationId/reject", ApplicationController.rejectApplication)
privateRouter.get("/users/notifications", NotificationController.getNotifications)
privateRouter.delete("/users/notifications/:notificationId", NotificationController.deleteNotification)
privateRouter.get("/company-tags", CompanyTagController.getAllCompanyTags)