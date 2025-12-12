import express from "express";
import { LoginDevController } from "../auth/login-dev";

export const publicRouter = express.Router();

publicRouter.post("/loginDev", LoginDevController.loginDev);
publicRouter.post("/loginUser", LoginDevController.loginDevUser)
publicRouter.post("/createCompany", LoginDevController.companyConnect)