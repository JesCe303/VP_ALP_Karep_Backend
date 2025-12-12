import { Prisma } from "../../generated/prisma/client";
import { CompanyTagResponse } from "./companyTag-model";

export interface CompanyResponse {
    id: number;
    email: string;
    name: string;
    address?: string;
    phone_number?: string;
    website?: string;
    vision_mission?: string;
    description?: string;
    founding_date?: Date;
    logo_path?: string;
    image_path?: string;
    user_id: number;
    company_tags: CompanyTagResponse[];
    total_jobs: number;
}

export function toCompanyResponseList(
    prismaCompanies: Prisma.CompanyGetPayload<{
        include: { 
            company_tags: { 
                include: { 
                    company_tag: true 
                } 
            }, 
            jobs: true 
        }
    }>[]): CompanyResponse[] {
        const companies = prismaCompanies.map((company) => {
            return {
                id: company.id,
                email: company.email,
                name: company.name,
                address: company.address || undefined,
                phone_number: company.phone_number || undefined,
                website: company.website || undefined,
                vision_mission: company.vision_mission || undefined,
                description: company.description || undefined,
                founding_date: company.founding_date || undefined,
                logo_path: company.logo_path || undefined,
                image_path: company.image_path || undefined,
                user_id: company.user_id,
                company_tags: company.company_tags?.map(ct => ({ id: ct.company_tag.id, name: ct.company_tag.name })) || [],
                total_jobs: company.jobs?.length || 0
            };
        });

    return companies;
}

export function toCompanyResponse(
    prismaCompany: Prisma.CompanyGetPayload<{
        include: { 
            company_tags: { 
                include: { 
                    company_tag: true 
                } 
            }, 
            jobs: true }
    }>): CompanyResponse {
        return {
            id: prismaCompany.id,
            email: prismaCompany.email,
            name: prismaCompany.name,
            address: prismaCompany.address || undefined,
            phone_number: prismaCompany.phone_number || undefined,
            website: prismaCompany.website || undefined,
            vision_mission: prismaCompany.vision_mission || undefined,
            description: prismaCompany.description || undefined,
            founding_date: prismaCompany.founding_date || undefined,
            logo_path: prismaCompany.logo_path || undefined,
            image_path: prismaCompany.image_path || undefined,
            user_id: prismaCompany.user_id,
            company_tags: prismaCompany.company_tags?.map(ct => ({ id: ct.company_tag.id, name: ct.company_tag.name })) || [],
            total_jobs: prismaCompany.jobs?.length || 0
    };
}

export interface CompanyUpdateRequest {
    name: string;
    address?: string;
    phone_number?: string;
    website?: string;
    vision_mission?: string;
    description?: string;
    founding_date?: Date;
    logo_path?: string;
    image_path?: string;
}