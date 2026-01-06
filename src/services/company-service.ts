import { ResponseError } from "../error/response-error";
import { CompanyResponse, CompanyUpdateRequest, toCompanyResponse, toCompanyResponseList } from "../model/company-model";
import { prismaClient } from "../util/database-util";
import { CompanyValidation } from "../validation/company-validation";
import { Validation } from "../validation/validation";

export class CompanyService {
    static async getAllCompanies(): Promise<CompanyResponse[]> {
        const companies = await prismaClient.company.findMany({
            include: {
                company_tags: {
                    include: { company_tag: true }
                },
                jobs: true
            }
        });

        return toCompanyResponseList(companies);
    }

    static async getCompanyByCompanyId(
        companyId: number
    ): Promise<CompanyResponse> {
        const company = await prismaClient.company.findUnique({
            where: { 
                id: companyId 
            },
            include: {
                company_tags: {
                    include: { company_tag: true }
                },
                jobs: true
            }
        })

        if (!company) {
            throw new ResponseError(400, "Company not found");
        }
        
        return toCompanyResponse(company);
    }

    static async getCompanyByUserId(
        user: UserJWTPayload
    ): Promise<CompanyResponse> {
        const company = await prismaClient.company.findUnique({
            where: { 
                user_id: user.id
            },
            include: {
                company_tags: {
                    include: { company_tag: true }
                },
                jobs: true
            }
        })

        if (!company) {
            throw new ResponseError(400, "Company not found");
        }

        return toCompanyResponse(company);
    }

    static async getCompaniesByTagId(
        tagId: number
    ): Promise<CompanyResponse[]> {
        const companyTags = await prismaClient.companyToTags.findMany({
            where: {
                company_tag_id: tagId
            },
            include: {
                company: {
                    include: {
                        company_tags: {
                            include: { company_tag: true }
                        },
                        jobs: true
                    }
                }
            }
        });

        const companies = companyTags.map(ct => ct.company);
        return toCompanyResponseList(companies);
    }

    static async updateCompany(
        user: UserJWTPayload,
        reqData: CompanyUpdateRequest,
        companyId: number
    ) {
        const validatedData = Validation.validate(
            CompanyValidation.UPDATE,
            reqData
        )

        const company = await prismaClient.company.findFirst({
            where: {
                id: companyId,
                user_id: user.id
            }
        });

        if (!company) {
            throw new ResponseError(400, "Company not found");
        }

        await prismaClient.company.update({
            where: {
                user_id: user.id,
                id: companyId
            },
            data: {
                name: validatedData.name,
                address: validatedData.address,
                phone_number: validatedData.phone_number,
                website: validatedData.website,
                vision_mission: validatedData.vision_mission,
                description: validatedData.description,
                founding_date: validatedData.founding_date,
                logo_path: validatedData.logo_path,
                image_path: validatedData.image_path,
            },
        });

        return "Company updated successfully";
    }
}