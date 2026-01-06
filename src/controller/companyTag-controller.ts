import { NextFunction, Response } from "express";
import { CompanyTagService } from "../services/companyTag-service";
import { UserRequest } from "../model/user-request-model";

export class CompanyTagController {
    static async getAllCompanyTags(
        req: UserRequest,
        res: Response,
        next: NextFunction
    ) {
        try {
            const response = await CompanyTagService.getAllCompanyTags();

            res.status(200).json({
                data: response
            });
        } catch (error) {
            next(error);
        }
    }
}