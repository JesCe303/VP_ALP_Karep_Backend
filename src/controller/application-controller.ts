import { Request, Response, NextFunction } from "express";
import { ApplicationService } from "../services/application-service";
import { UserRequest } from "../model/user-request-model";

export class ApplicationController {
    static async hiringApplication(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const user = req.user!;
            const jobId = Number(req.params.jobId);

            const response = await ApplicationService.hiringApplication(user, jobId)

            res.status(200).json({
                message: "You have applied to the job, please wait"
            })
        } catch (error) {
            next(error);
        }
    }

    static async getMyApplication(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const user = req.user!;
            const response = await ApplicationService.getMyApplications(user);
            
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error);
        }
    }

    static async cancelApplication(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const user = req.user!;
            const idApp = Number(req.params.idApp);

            const response = await ApplicationService.cancelApplication(user, idApp)
            
            res.status(200).json({
                message: "You have cancelled an application"
            })
        } catch (error) {
            next(error);
        }
    }

    static async deleteApplication(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const user = req.user!;
            const idApp = Number(req.params.idApp);

            const response = await ApplicationService.deleteApplication(user, idApp);

            res.status(200).json({
                message: "You have deleted an application"
            })
        } catch (error) {
            next(error);
        }
    }

    static async getApplicationByCompanyId(
        req: UserRequest,
        res: Response,
        next: NextFunction
    ) {
        try {
            const user = req.user!;
            const response = await ApplicationService.getApplicationByCompanyId(user);

            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error);
        }
    }

    static async getApplicationByJobId(
        req: UserRequest, 
        res: Response, 
        next: NextFunction
    ) {
        try {
            const user = req.user!;
            const jobId = Number(req.params.jobId);
            const response = await ApplicationService.getApplicationByJobId(user, jobId);

            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error);
        }
    }

    static async acceptApplication(
        req: UserRequest,
        res: Response,
        next: NextFunction
    ) {
        try {
            const user = req.user!;
            const applicationId = Number(req.params.applicationId);
            
            const response = await ApplicationService.acceptApplication(user, applicationId);

            res.status(200).json({
                message: "You have accepted an application"
            });
        } catch (error) {
            next(error);
        }
    }

    static async rejectApplication(
        req: UserRequest,
        res: Response,
        next: NextFunction
    ) {
        try {
            const user = req.user!;
            const applicationId = Number(req.params.applicationId);

            const response = await ApplicationService.rejectApplication(user, applicationId);

            res.status(200).json({
                message: "You have rejected an application"
            });
        } catch (error) {
            next(error);
        }
    }
}