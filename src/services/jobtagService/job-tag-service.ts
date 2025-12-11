import { JobTag } from "../../../generated/prisma/client";
import { ResponseError } from "../../error/response-error";
import { JobTagResponse, toJobTagReponseList, JobTagCreate } from "../../model/job-tag-model";
import { UserJWTPayload } from "../../model/user-request-model";
import { prismaClient } from "../../util/database-util";
import { JobTagValidation } from "../../validation/job-tag-validation";
import { Validation } from "../../validation/validation";

export class JobTagService{
    static async getAllJobTags(): Promise<JobTagResponse[]> {
        const tag = await prismaClient.jobTag.findMany();
        return toJobTagReponseList(tag);
    }

    static async createJobTag(user: UserJWTPayload, reqData: JobTagCreate): Promise<string> {
        this.isUserCompany(user);
        const validatedInput = Validation.validate(JobTagValidation.CREATE, reqData);
        await prismaClient.jobTag.create({
            data: {
                name: validatedInput.name
            }
        })

        return `New job tag has been created ${validatedInput.name}` 
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