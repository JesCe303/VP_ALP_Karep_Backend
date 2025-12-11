import { error } from "console";
import { z, ZodType } from "zod";

export class JobValidation {
    static readonly CREATE: ZodType = z.object ({
        name: z.string({
            error: "The job title must be a string!"
        }).min(1, {
            error: "The field must NOT be empty!"
        }),

        description: z.string({
            error: "The description must be a string!"
        }).optional(),

        tag_ids: z.array(
                z.number({
                    error: "Each tag ID must be a number!",
                }), {
                    error: "Tag must be an array!",}).optional()
            .refine(
                (ids) => !ids || new Set(ids).size === ids.length,
                { message: "Tag cannot be duplicate!" }
            ),
    })

    static readonly UPDATE: ZodType = z.object ({
        name: z.string({
            error: "Name must be a string!"
        }).min(1, {
            error: "Name must NOT be empty!"
        }),

        description: z.string({
            error: "Description must be a string!"
        }).optional(),

        tag_ids: z.array(
                z.number({
                    error: "Each tag ID must be a number!",
                }), {
                    error: "Tag must be an array!",}).optional()
            .refine(
                (ids) => !ids || new Set(ids).size === ids.length,
                { message: "Tag cannot be duplicate!" }
            ),
    })
}