import { Request, Response, NextFunction } from "express";
import { ApplicationService } from "../../services/appService/application-service";
import { UserRequest } from "../../model/user-request-model";

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
}