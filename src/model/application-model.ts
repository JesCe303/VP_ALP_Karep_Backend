import { Prisma } from "../../generated/prisma/client";
import { JobResponse, toJobResponse } from "./job-model";

export interface ApplicationResponse {
    id: number,
    status: string,
    user_id: number,
    job: JobResponse
}

export type ApplicationWithJob = Prisma.ApplicationGetPayload<{
    include: {
        job: {
            include: {
                job_tags: { include: { tag: true }}
            }
        }
    }
}>

export function toApplicationResponseList (
    prismaApps: ApplicationWithJob[]
): ApplicationResponse[] {
    return prismaApps.map(app => ({
        id: app.id,
        status: app.status,
        user_id: app.user_id,
        job: toJobResponse(app.job)
    }))
}

export function toApplicationResponse (
    prismaApp: ApplicationWithJob
): ApplicationResponse {
    return {
        id: prismaApp.id,
        status: prismaApp.status,
        user_id: prismaApp.user_id,
        job: toJobResponse(prismaApp.job)
    }
}

export interface ApplicationCreate {
    status: string,
    user_id: number,
    job_id: number
}

export interface ApplicationUpdate {
    status: string
}