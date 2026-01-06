import { CompanyTag } from "../../generated/prisma/client";

export interface CompanyTagResponse {
    id: number;
    name: string;
}

export function toCompanyTagResponseList(prismaCompanyTags: CompanyTag[]): CompanyTagResponse[] {
    const companyTags = prismaCompanyTags.map((companyTag) => {
        return {
            id: companyTag.id,
            name: companyTag.name,
        }
    });
    return companyTags;
}

export function toCompanyTagResponse(prismaCompanyTag: CompanyTag): CompanyTagResponse {
    return {
        id: prismaCompanyTag.id,
        name: prismaCompanyTag.name,
    }
}