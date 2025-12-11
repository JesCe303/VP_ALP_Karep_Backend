import { ResponseError } from "../../error/response-error";
import { ApplicationCreate, ApplicationResponse, ApplicationUpdate, toApplicationResponse, toApplicationResponseList } from "../../model/application-model";
import { UserJWTPayload } from "../../model/user-request-model";
import { prismaClient } from "../../util/database-util";

export class ApplicationService {
    //hiring user application on hiring
    static async hiringApplication(user: UserJWTPayload, jobId: number): Promise<ApplicationResponse> {
        //Check job is exist in the DB
        const job = await prismaClient.job.findFirst({
            where: { id: jobId }
        })

        if (!job) {
            throw new ResponseError(404, "Job not found!")
        }

        //Checking the database IF the job_id that the user hired in
        //is the same, so double hiring which is an illegal action
        const exist = await prismaClient.application.findFirst({
            where: {
                job_id: jobId,
                user_id: user.id
            }
        });

        if(exist) throw new ResponseError(400, "Already applied, denied")

            const app = await prismaClient.application.create({
                data: {
                    status: "pending",
                    user_id: user.id,
                    job_id: jobId
                },
                include: {
                    job: {
                        include: {
                            job_tags: { include: { tag: true }}
                        }
                    }
                }
            });

            return toApplicationResponse(app);
    }

    static async getMyApplications(user: UserJWTPayload): Promise<ApplicationResponse[]> {
        const apps = await prismaClient.application.findMany({
            where: { user_id: user.id },
            orderBy: { id: "asc" },
            include: {
                job: {
                    include: {
                        job_tags: { include: {tag: true }}
                    }
                }
            }
        });

        return toApplicationResponseList(apps)
    } 

    static async cancelApplication(user: UserJWTPayload, idApp: number): Promise<ApplicationResponse> {
        //check if application
        const application = await prismaClient.application.findUnique({
            where: { id: idApp }
        })

        if(!application) {
            throw new ResponseError(404, "No application has been made")
        }

        if(application.user_id !== user.id) {
            throw new ResponseError(403, "Unauthorized Access!")
        }

        if(application.status !== "pending") {
            throw new ResponseError(400, "You can only cancel application that is still in pending")
        }

        const updated = await prismaClient.application.update({
            where: { id: idApp },
            data: {
                status: "cancelled"
            },
            include: {
                job: {
                    include: {
                        job_tags: {
                            include: { tag: true }
                        }
                    }
                }
            }
        });

        return toApplicationResponse(updated);
    }
}