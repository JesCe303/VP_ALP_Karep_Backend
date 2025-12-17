import express from "express"
import { UserController } from "../controller/user-controller"
import { authMiddleware } from "../middleware/auth-middleware"

export const apiRouter = express.Router()

// Apply auth middleware to all routes
apiRouter.use(authMiddleware)

// Profile routes
apiRouter.get("/profile", UserController.getProfile)
apiRouter.put("/profile", UserController.updateProfile)

// Experience routes
apiRouter.post("/experiences", UserController.createExperience)
apiRouter.get("/experiences", UserController.getAllExperiences)
apiRouter.get("/experiences/:id", UserController.getExperience)
apiRouter.put("/experiences/:id", UserController.updateExperience)
apiRouter.delete("/experiences/:id", UserController.deleteExperience)

// Achievement routes
apiRouter.post("/achievements", UserController.createAchievement)
apiRouter.get("/achievements", UserController.getAllAchievements)
apiRouter.get("/achievements/:id", UserController.getAchievement)
apiRouter.put("/achievements/:id", UserController.updateAchievement)
apiRouter.delete("/achievements/:id", UserController.deleteAchievement)
