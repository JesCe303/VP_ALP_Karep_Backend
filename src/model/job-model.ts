import { PrismaClient, Job } from "../../generated/prisma/client";

export interface JobResponce {
    id: number,
    name: string,
    description: string,
    company_id: number
}