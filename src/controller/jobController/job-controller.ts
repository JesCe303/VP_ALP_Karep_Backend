import { NextFunction, Request, Response } from "express";
import { JobService } from "../../services/jobService/job-service";
import { UserRequest } from "../../model/user-request-model";

export class JobController {
    static async getAllJobs(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await JobService.getAllJobs();
            res.status(200).json({
                data: response
            });
        } catch (error) {
            next(error);
        }
    }

    static async getAllJobsByCompany(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const user = req.user!
            const response = await JobService.getAllJobsByCompany(user)
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error);
        }
    }

    static async getJob(req: Request, res: Response, next: NextFunction) {
        try {
            const jobId = Number(req.params.jobId);
            const response = await JobService.getJob(jobId);

            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error);
        }
    }

    static async createJob(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const user = req.user!
            const request = req.body

            const response = await JobService.createJob(user, request)
            res.status(200).json({
                message: "Job has been created"
            })
        } catch (error) {
            next(error);
        }
    }

    static async updateJob(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const user = req.user!;
            const request = req.body;
            const jobId = Number(req.params.jobId)

            const response = await JobService.updateJob(user, request, jobId)

            res.status(200).json({
                message: "A job has been updated!"
            })
        } catch (error) {
            next(error);
        }
    }

    static async searchJobs(req: Request, res: Response, next: NextFunction) {
        try {
            const search = req.query.search as string | undefined;
            const response = await JobService.searchJobs(search);

            res.status(200).json({
                message: "Job Result:",
                data: response
            })
        } catch (error) {
            next(error);
        }
    }
    
    static async deleteJob(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const jobId = Number(req.params.jobId);
            const response = await JobService.deleteJob(req.user!, jobId)
            res.status(200).json({
                message: "Job deleted"
            })
        } catch (error) {
            next(error);
        }
    }
}