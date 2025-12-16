import { NextFunction, Response } from "express";
import { CompanyToTagsService } from "../services/companyToTags-service";
import { CompanyToTagsCreateRequest } from "../model/companyToTags-model";
import { UserRequest } from "../model/user-request-model";

export class CompanyToTagsController {
    static async getCompanyToTagsByCompanyId(
        req: UserRequest,
        res: Response,
        next: NextFunction
    ) {
        try {
            const companyId = Number(req.params.companyId);

            const response = await CompanyToTagsService.getCompanyToTagsByCompanyId(companyId);

            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error);
        }
    }

    static async getCompanyToTagsByTagId(
        req: UserRequest,
        res: Response,
        next: NextFunction
    ) {
        try {
            const tagId = Number(req.params.tagId);

            const response = await CompanyToTagsService.getCompanyToTagsByTagId(tagId);

            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error);
        }    
    }

    static async createCompanyToTags(
        req: UserRequest,
        res: Response,
        next: NextFunction
    ) {
        try {
            const reqData = req.body as CompanyToTagsCreateRequest;

            const response = await CompanyToTagsService.createCompanyToTags(reqData);

            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error);
        }
    }

    static async deleteCompanyToTags(
        req: UserRequest,
        res: Response,
        next: NextFunction
    ) {
        try {
            const tagId = Number(req.params.tagId);

            const response = await CompanyToTagsService.deleteCompanyToTags(req.user!, tagId);

            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error);
        }
    }
}