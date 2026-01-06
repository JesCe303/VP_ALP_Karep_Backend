import z, { ZodType } from 'zod';

export class CompanyToTagsValidation {
    static readonly CREATE: ZodType = z.object({
        company_id: z
            .number({
                error: 'Company ID must be a number',
            })
            .min(1, {
                error: 'Company ID is required',
            }),
        tag_id: z
            .number({
                error: 'Tag ID must be a number',
            })
            .min(1, {
                error: 'Tag ID is required',
            }),
    });
}