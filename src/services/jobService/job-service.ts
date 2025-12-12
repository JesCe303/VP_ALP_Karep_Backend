import { Job } from "../../../generated/prisma/client";
import { ResponseError } from "../../error/response-error";
import { JobCreate, JobResponse, JobUpdate, toJobResponse, toJobResponseList } from "../../model/job-model";
import { UserJWTPayload } from "../../model/user-request-model";
import { prismaClient } from "../../util/database-util";
import { JobValidation } from "../../validation/job-validation";
import { Validation } from "../../validation/validation";

export class JobService {
    static async getAllJobs(): Promise<JobResponse[]> {
        const jobs = await prismaClient.job.findMany({
            orderBy: { id: "asc" },
            include: {
                job_tags: {
                    include: { tag: true },
                    orderBy: { tag_id: "asc" }
                }
            }
        })
        return toJobResponseList(jobs);
    }

    static async getAllJobsByCompany(user: UserJWTPayload): Promise<JobResponse[]> {
        await this.isUserCompany(user)

        const company = await prismaClient.company.findFirst({
            where: { user_id: user.id }
        });

        if(!company) {
            throw new ResponseError(403, "You are not registered as a company");
        }

        const jobs = await prismaClient.job.findMany({
            where: {
                company_id: company.id
            },
            include: {
                job_tags: {
                    include: { tag: true }
                }
            }
        })

        return toJobResponseList(jobs);
    }

    static async getJob(jobId: number): Promise<JobResponse> {
        const job = await prismaClient.job.findUnique({
            where: {
                id: jobId
            },
            include: {
                job_tags: {
                    include: { tag: true }
                }
            }
        })

        if(!job) {
            throw new ResponseError(404, "Job not found")
        }

        return toJobResponse(job)
    }

    static async createJob(user: UserJWTPayload, reqData: JobCreate): Promise<JobResponse> {
        await this.isUserCompany(user)
        const company = await prismaClient.company.findFirst({
            where: { user_id: user.id }
        })
        const validatedData = Validation.validate(JobValidation.CREATE, reqData)
        const job = await prismaClient.job.create({
            data: {
                name: validatedData.name,
                description: validatedData.description ?? null,
                company_id : company!.id,
                job_tags: validatedData.tags ? {
                    create: validatedData.tags.map(id => ({
                        tag: { connect: { id }}
                    }))
                }
                :   undefined
            },
            include: {
                job_tags: {
                    include: { tag: true }
                }
            }
        })

        return toJobResponse(job);
    }

    static async updateJob(user: UserJWTPayload, reqData: JobUpdate, jobId: number): Promise<JobResponse> {
        this.isUserCompany(user)
        const company = await prismaClient.company.findFirst({
            where: { user_id: user.id }
        })
        const validatedData = Validation.validate(JobValidation.UPDATE, reqData)
        const jobExist = await prismaClient.job.findFirst({
            where: {
                id: jobId,
                company_id: company!.id
            }
        })

        if(!jobExist) {
            throw new ResponseError(404, "Job not found or unauthorize access")
        }

        const updatedJob = await prismaClient.job.update({
            where: { id: jobId },
            data: {
                name: validatedData.name,
                description: validatedData.description ?? null,
                job_tags: validatedData.tags ? {
                    deleteMany: {},
                    create: validatedData.tags.map(id => ({
                        tag: {connect: { id } }
                    }))
                }
                : undefined
            },
            include: {
                job_tags: {
                    include: { tag: true }
                }
            }
        });

        return toJobResponse(updatedJob);
    }

    static async searchJobs(search?: string): Promise<JobResponse[]> {
        const where: any = {};

        if(search) {
            //Checker apakah searchnya itu ada koma atau tidak
            const keywords = search
                .split(",")
                .map(word => word.trim())
                .filter(word => word.length > 0)

            where.or = [
                ...keywords.map(word => ({
                    name: { containes: word, mode: "insensitive"}
                })),
                ...keywords.map(word => ({
                    description: { contains: word, mode: "insensitive" }
                })),
                ...keywords.map(word => ({
                    job_tags: {
                        some: {
                            tag: {
                                name: { contains: word, mode: "insensitive" }
                            }
                        }
                    }
                }))
            ];
        }

        const jobs = await prismaClient.job.findMany({
            where, orderBy: { id: "asc" },
            include: {
                job_tags: {
                    include: { tag: true }
                }
            }
        })

        return toJobResponseList(jobs)
    }

    
    static async isUserCompany(user: UserJWTPayload) {
        const dbUser = await prismaClient.user.findUnique({
            where: { id: user.id }
        })

        if(!dbUser) {
            throw new ResponseError(401, "User not found")
        }

        const company = await prismaClient.company.findFirst({
            where: { user_id: dbUser.id }
        })

        if(!company) {
            throw new ResponseError(403, "User is not a company, abort")
        }
    }
}