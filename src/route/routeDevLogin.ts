import express from "express";
import { LoginDevController } from "../auth/login-dev";

export const logRoute = express.Router();

logRoute.post("/loginDev", LoginDevController.loginDev);