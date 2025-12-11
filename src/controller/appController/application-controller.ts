import { Request, Response, NextFunction } from "express";
import { ApplicationService } from "../../services/appService/application-service";

export class ApplicationController {
    static async hiringApplication(req: Request, res: Response, next: NextFunction) {
        try {
            const user = req.user!;
            const jobId = Number(req.params.jobId);

            const response = await ApplicationService.hiringApplications(user, jobId)

            res.status(200).json({
                message: "You have applied to the job, please wait"
            })
        } catch (error) {
            next(error);
        }
    }

    static async getMyApplication(req: Request, res: Response, next: NextFunction) {
        try {
            const user = req.user!;
            
            const response = await ApplicationService.getMyApplications(user); 
        } catch (error) {
            next(error);
        }
    }

    static async cancelApplication(req: Request, res: Response, next: NextFunction) {
        try {
            const user = req.user!;
            const idApp = Number(req.params.idApp);

            const response = await ApplicationService.cancelApplication(user, idApp)
        } catch (error) {
            next(error);
        }
    }
}