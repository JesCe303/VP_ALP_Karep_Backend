import express from "express"
import { UserController } from "../controller/user-controller"
import { CompanyController } from "../controller/company-controller"

export const publicRouter = express.Router()

publicRouter.post("/register", UserController.register)
publicRouter.post("/register/user", UserController.register)
publicRouter.post("/register/company", CompanyController.register)
publicRouter.post("/login", UserController.login)