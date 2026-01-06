import z, { ZodType } from 'zod';

export class CompanyValidation {
    static readonly UPDATE: ZodType = z.object({
        name: z
            .string({
                error: 'Name must be a string',
            })
            .min(1, {
                error: 'Name is required',
            })
            .max(100, {
                error: 'Name must be at most 100 characters long',
            }),
        address: z
            .string({
                error: 'Address must be a string',
            })
            .max(255, {
                error: 'Address must be at most 255 characters long',
            })
            .optional(),
        phone_number: z
            .string({
                error: 'Phone number must be a string',
            })
            .max(20, {
                error: 'Phone number must be at most 20 characters long',
            })
            .optional(),
        website: z
            .string({
                error: 'Website must be a string',
            })
            .max(255, {
                error: 'Website must be at most 255 characters long',
            })
            .optional(),
        vision_mission: z
            .string({
                error: 'Vision and mission must be a string',
            })
            .optional(),
        description: z
            .string({
                error: 'Description must be a string',
            })
            .optional(),
        founding_date: z
            .preprocess((arg) => {
                if (typeof arg == 'string' || arg instanceof Date) return new Date(arg);
                return undefined;
            }, z.date({
                error: 'Founding date must be a valid date',
            }).optional()),
        logo_path: z
            .string({
                error: 'Logo path must be a string',
            })
            .max(255, {
                error: 'Logo path must be at most 255 characters long',
            })
            .optional(),
        image_path: z
            .string({
                error: 'Image path must be a string',
            })
            .max(255, {
                error: 'Image path must be at most 255 characters long',
            })
            .optional()
    })
}