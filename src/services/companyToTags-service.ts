import { prismaClient } from "../util/database-util"
import { CompanyToTagsCreateRequest, CompanyToTagsResponse, toCompanyToTagsResponseList } from "../model/companyToTags-model";
import { ResponseError } from "../error/response-error";
import { Validation } from "../validation/validation";
import { CompanyToTagsValidation } from "../validation/companyToTags-validation";
import { CompanyToTags } from "../../generated/prisma/client";

export class CompanyToTagsService {
    static async getCompanyToTagsByCompanyId(
        companyId: number
    ): Promise<CompanyToTagsResponse[]> {
        const prismaCompanyToTags = await prismaClient.companyToTags.findMany({
            where: {
                company_id: companyId,
            },
        });

        if (!prismaCompanyToTags) {
            throw new ResponseError(400, "Company to Tags not found");
        }

        return toCompanyToTagsResponseList(prismaCompanyToTags);
    }

    static async getCompanyToTagsByTagId(
        tagId: number
    ): Promise<CompanyToTagsResponse[]> {
        const prismaCompanyToTags = await prismaClient.companyToTags.findMany({
            where: {
                company_tag_id: tagId,
            },
        });

        if (!prismaCompanyToTags) {
            throw new ResponseError(400, "Company to Tags not found");
        }

        return toCompanyToTagsResponseList(prismaCompanyToTags);
    }

    static async createCompanyToTags(
        reqData: CompanyToTagsCreateRequest
    ): Promise<String> {
        const validatedData = Validation.validate(
            CompanyToTagsValidation.CREATE,
            reqData
        )

        // Check if company exists
        const companyExists = await prismaClient.company.findUnique({
            where: { id: validatedData.company_id }
        });
        if (!companyExists) {
            throw new ResponseError(400, "Company not found");
        }

        // Check if tag exists
        const tagExists = await prismaClient.companyTag.findUnique({
            where: { id: validatedData.tag_id }
        });
        if (!tagExists) {
            throw new ResponseError(400, "Tag not found");
        }

        await prismaClient.companyToTags.create({
            data: {
                company_id: validatedData.company_id,
                company_tag_id: validatedData.tag_id,
            },
        }); 

        return "Company to Tags created successfully";
    }

    static async deleteCompanyToTags(
        user: UserJWTPayload,
        tagId: number
    ): Promise<String> {
        const company = await prismaClient.company.findFirst({
            where: { 
                user_id: user.id 
            }
        });

        if (!company) {
            throw new ResponseError(400, "Company not found");
        }

        await this.checkCompanyToTagsIsEmpty(company.id, tagId);

        await prismaClient.companyToTags.deleteMany({
            where: {
                company_id: company.id,
                company_tag_id: tagId,
            },
        });

        return "Company to Tags deleted successfully";
    }

    static async checkCompanyToTagsIsEmpty(
        companyId: number,
        tagId: number
    ): Promise<CompanyToTags> {
        const prismaCompanyToTags = await prismaClient.companyToTags.findFirst({
            where: {
                company_id: companyId,
                company_tag_id: tagId,
            },
        });

        if (!prismaCompanyToTags) {
            throw new ResponseError(400, "Company to Tags not found");
        }

        return prismaCompanyToTags;
    }
}