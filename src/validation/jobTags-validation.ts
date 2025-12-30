import { z, ZodType } from "zod";

export class JobTagValidation {
    static readonly CREATE: ZodType = z.object ({
        name: z.string({
            error: "Not string"
        })
    })
}