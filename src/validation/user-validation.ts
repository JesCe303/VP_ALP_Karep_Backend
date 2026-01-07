import {z, ZodType} from "zod";

export class UserValidation {
    static readonly REGISTER: ZodType = z.object({

        username: z
        .string({
            message: "Username must be string",
        })
        .min(1, {
            message: "Username cannot be empty",
        }),

        email: z
        .email({
            message: "Email format is invalid",
        })
        .min(1, {
            message: "Email cannot be empty",
        }),

        password: z
        .string({
            message: "Password must be string",
        })
        .min(8, {
            message: "Password must be at least 8 characters",
        }),

        address: z.string().optional(),
        phone_number: z.string().optional(),
    });


    static readonly LOGIN: ZodType = z.object({
         email: z
        .email({
            message: "Email format is invalid",
        })
        .min(1, {
            message: "Email cannot be empty",
        }),

        password: z
        .string({
            message: "Password must be string",
        })
        .min(8, {
            message: "Password must be at least 8 characters",
        }),
    });

    static readonly UPDATE_PROFILE: ZodType = z.object({
        name: z.string().min(1, {
            message: "Name cannot be empty"
        }).optional(),
        address: z.string().optional(),
        phone_number: z.string().optional(),
    }).refine(data => Object.keys(data).length > 0, {
        message: "At least one field must be provided"
    });

    static readonly UPDATE_EMAIL: ZodType = z.object({
        current_password: z.string().min(1, {
            message: "Current password is required"
        }),
        new_email: z.email({
            message: "Email format is invalid"
        }).min(1, {
            message: "New email cannot be empty"
        }),
    });

    static readonly UPDATE_PASSWORD: ZodType = z.object({
        current_password: z.string().min(1, {
            message: "Current password is required"
        }),
        new_password: z.string().min(8, {
            message: "New password must be at least 8 characters"
        }),
    });

    static readonly EXPERIENCE: ZodType = z.object({
        title: z.string().min(1, {
            message: "Title cannot be empty"
        }),
        description: z.string().optional(),
    });

    static readonly ACHIEVEMENT: ZodType = z.object({
        title: z.string().min(1, {
            message: "Title cannot be empty"
        }),
        description: z.string().optional(),
    });
}