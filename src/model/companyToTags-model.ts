import { CompanyToTags } from "../../generated/prisma/client";

export interface CompanyToTagsResponse {
    company_id: number;
    tag_id: number;
}

export function toCompanyToTagsResponseList(prismaCompanyToTags: CompanyToTags[]): CompanyToTagsResponse[] {
    const companyToTags = prismaCompanyToTags.map((companyToTags) => {
        return {
            company_id: companyToTags.company_id,
            tag_id: companyToTags.company_tag_id,
        }
    });

    return companyToTags;
}

export function toCompanyToTagsResponse(prismaCompanyToTags: CompanyToTags): CompanyToTagsResponse {
    return {
        company_id: prismaCompanyToTags.company_id,
        tag_id: prismaCompanyToTags.company_tag_id,
    }
}

export interface CompanyToTagsCreateRequest {
    company_id: number;
    tag_id: number;
}

