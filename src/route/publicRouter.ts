//TODO: Hapus file ini, hanya untuk buat saya bisa login saja - Joel

import express from "express";
import { LoginDevController } from "../auth/login-dev";

export const publicRouterFakeLog = express.Router();

publicRouterFakeLog.post("/loginDev", LoginDevController.loginDev);
publicRouterFakeLog.post("/loginUser", LoginDevController.loginDevUser)
publicRouterFakeLog.post("/createCompany", LoginDevController.companyConnect)