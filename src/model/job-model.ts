import { Prisma } from "../../generated/prisma/client";
import { JobTagResponse } from "./job-tag-model";

export interface JobResponse {
    id: number,
    name: string,
    description: string | null,
    company_id: number,
    tags: JobTagResponse[];
}

export function toJobResponseList(
    //this is a helper for connect jobtags -> job
    //where it get the payload of jobtags
    prismaJobs: Prisma.JobGetPayload<{
        include: { job_tags: { include: { tag: true }}}
    }>[]
): JobResponse[] {
    return prismaJobs.map(job => ({
        id: job.id,
        name: job.name,
        description: job.description,
        company_id: job.company_id,
        tags: job.job_tags.map(jt => ({
            id: jt.tag.id,
            name: jt.tag.name
        }))
    }));
}

export function toJobResponse(
    prismaJob: Prisma.JobGetPayload<{
        include: { job_tags: { include: { tag: true }} }
    }>
): JobResponse {
    return {
        id: prismaJob.id,
        name: prismaJob.name,
        description: prismaJob.description,
        company_id: prismaJob.company_id,
        tags: prismaJob.job_tags.map(jt => ({
            id: jt.tag.id,
            name: jt.tag.name
        }))
    }
} 

export interface JobUpdate {
    name: string;
    description?: string;
    tag_ids?: number[];
}

export interface JobCreate {
    name: string;
    description?: string;
    company_id: number;
    tag_ids?: number[];
}