import { CompanyTagResponse, toCompanyTagResponseList } from "../model/companyTag-model";
import { prismaClient } from "../util/database-util";

export class CompanyTagService {
    static async getAllCompanyTags(): Promise<CompanyTagResponse[]> {
        const prismaCompanyTags = await prismaClient.companyTag.findMany();

        return toCompanyTagResponseList(prismaCompanyTags);
    }
}