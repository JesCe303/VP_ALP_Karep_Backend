import { NextFunction, Response, Request } from "express";
import { JobTagService } from "../../services/jobtagService/job-tag-service";
import { UserRequest } from "../../model/user-request-model";

export class JobTagController { 
    static async getAllJobTags(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await JobTagService.getAllJobTags();
            res.status(200).json({
                message: "All job tags retrieved",
                data: response
            })
        } catch (error) {
            next(error);
        }
    }


    static async createJobTag(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const user = req.user!;
            const response = await JobTagService.createJobTag(user, req.body);
            res.status(200).json({
                message: response
            })
        } catch (error) {
            next(error)
        }
    }
}