import {z, ZodType} from "zod";

export class UserValidation {
    static readonly REGISTER: ZodType = z.object({

        username: z
        .string({
            error: "Username must be string",
        })
        .min(1, {
            error: "Username cannot be empty",
        }),

        email: z
        .email({
            error: "Email format is invalid",
        })
        .min(1, {
            error: "Email cannot be empty",
        }),

        password: z
        .string({
            error: "Password must be string",
        })
        .min(8, {
            error: "Password must be at least 8 characters",
        }),

        address: z.string().optional(),
        phone_number: z.string().optional(),
    });


    static readonly LOGIN: ZodType = z.object({
         email: z
        .email({
            error: "Email format is invalid",
        })
        .min(1, {
            error: "Email cannot be empty",
        }),

        password: z
        .string({
            error: "Password must be string",
        })
        .min(8, {
            error: "Password must be at least 8 characters",
        }),
    });

    static readonly UPDATE_PROFILE: ZodType = z.object({
        name: z.string().min(1, {
            error: "Name cannot be empty"
        }).optional(),
        address: z.string().optional(),
        phone_number: z.string().optional(),
    }).refine(data => Object.keys(data).length > 0, {
        message: "At least one field must be provided"
    });

    static readonly EXPERIENCE: ZodType = z.object({
        title: z.string().min(1, {
            error: "Title cannot be empty"
        }),
        description: z.string().optional(),
    });

    static readonly ACHIEVEMENT: ZodType = z.object({
        title: z.string().min(1, {
            error: "Title cannot be empty"
        }),
        description: z.string().optional(),
    });
}