import { z, ZodType } from "zod";

export class CompanyValidation {
  static readonly REGISTER: ZodType = z.object({
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

    name: z
      .string({
        error: "Name must be string",
      })
      .min(1, {
        error: "Name cannot be empty",
      }),

    address: z.string().optional(),
    phone_number: z.string().optional(),
    website: z.string().optional(),
    vision_mission: z.string().optional(),
    description: z.string().optional(),

    // expecting YYYY-MM-DD (or full ISO). We'll parse later.
    founding_date: z.string().optional(),

    logo_path: z.string().optional(),
    image_path: z.string().optional(),

    user_name: z.string().optional(),
  });
}
