import { NextFunction, Response } from "express";
import { CompanyService } from "../services/company-service";
import { CompanyUpdateRequest } from "../model/company-model";

export class CompanyController {
    static async getAllCompanies(
        req: UserRequest,
        res: Response,
        next: NextFunction
    ) {
        try {
            const response = await CompanyService.getAllCompanies();

            res.status(200).json({
                data: response
            });
        } catch (error) {
            next(error);
        }
    }

    static async getCompanyByCompanyId(
        req: UserRequest,
        res: Response,
        next: NextFunction
    ) {
        try {
            const companyId = Number(req.params.companyId);
            const response = await CompanyService.getCompanyByCompanyId(companyId);

            res.status(200).json({
                data: response
            });
        } catch (error) {
            next(error);
        }
    }

    static async getCompanyByUserId(
        req: UserRequest,
        res: Response,
        next: NextFunction
    ) {
        try {
            const response = await CompanyService.getCompanyByUserId(req.user!);

            res.status(200).json({
                data: response
            });
        } catch (error) {
            next(error);
        }
    }

    static async getCompaniesByTagId(
        req: UserRequest,
        res: Response,
        next: NextFunction
    ) {
        try {
            const tagId = Number(req.params.tagId);
            const response = await CompanyService.getCompaniesByTagId(tagId);

            res.status(200).json({
                data: response
            });
        } catch (error) {
            next(error);
        }
    }

    static async updateCompany(
        req: UserRequest,
        res: Response,
        next: NextFunction
    ) {
        try {
            const reqData = req.body as CompanyUpdateRequest;

            const response = await CompanyService.updateCompany(req.user!, reqData);

            res.status(200).json({
                data: response
            });
        } catch (error) {
            next(error);
        }
    }
}