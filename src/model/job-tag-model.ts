import { JobTag } from "../../generated/prisma/client";

export interface JobTagResponse {
    id: number;
    name: string;
}

export function toJobTagReponseList(prismaJobTag: JobTag[]): JobTagResponse[] {
    const result = prismaJobTag.map((jobtag) => {
        return {
            id: jobtag.id,
            name: jobtag.name
        }
    })

    return result;
}

export function toJobTagResponse(prismaJobTag: JobTag): JobTagResponse {
    return {
        id: prismaJobTag.id,
        name: prismaJobTag.name
    }
}

export interface JobTagCreate {
    name: string
}