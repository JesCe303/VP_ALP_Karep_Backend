"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyValidation = void 0;
const zod_1 = require("zod");
class CompanyValidation {
}
exports.CompanyValidation = CompanyValidation;
CompanyValidation.REGISTER = zod_1.z.object({
    email: zod_1.z
        .email({
        error: "Email format is invalid",
    })
        .min(1, {
        error: "Email cannot be empty",
    }),
    password: zod_1.z
        .string({
        error: "Password must be string",
    })
        .min(8, {
        error: "Password must be at least 8 characters",
    }),
    name: zod_1.z
        .string({
        error: "Name must be string",
    })
        .min(1, {
        error: "Name cannot be empty",
    }),
    address: zod_1.z.string().optional(),
    phone_number: zod_1.z.string().optional(),
    website: zod_1.z.string().optional(),
    vision_mission: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    // expecting YYYY-MM-DD (or full ISO). We'll parse later.
    founding_date: zod_1.z.string().optional(),
    logo_path: zod_1.z.string().optional(),
    image_path: zod_1.z.string().optional(),
    user_name: zod_1.z.string().optional(),
});
