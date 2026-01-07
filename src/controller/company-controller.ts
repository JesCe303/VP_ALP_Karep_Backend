import { Request, Response, NextFunction } from "express";
import { RegisterCompanyRequest, AuthResponse } from "../model/company-model";
import { CompanyServices } from "../services/company-services";

export class CompanyController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const request: RegisterCompanyRequest = req.body as RegisterCompanyRequest;
      const response: AuthResponse = await CompanyServices.register(request);

      res.status(200).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }
}
