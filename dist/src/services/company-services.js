"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyServices = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const response_error_1 = require("../error/response-error");
const database_util_1 = require("../util/database-util");
const validation_1 = require("../validation/validation");
const company_validation_1 = require("../validation/company-validation");
const company_model_1 = require("../model/company-model");
class CompanyServices {
    static async register(request) {
        const validatedData = validation_1.Validation.validate(company_validation_1.CompanyValidation.REGISTER, request);
        const existingUser = await database_util_1.prismaClient.user.findFirst({
            where: { email: validatedData.email },
        });
        if (existingUser) {
            throw new response_error_1.ResponseError(400, "Email already exists");
        }
        const hashedPassword = await bcrypt_1.default.hash(validatedData.password, 10);
        const userName = validatedData.user_name && validatedData.user_name.trim().length > 0
            ? validatedData.user_name
            : validatedData.name;
        const user = await database_util_1.prismaClient.user.create({
            data: {
                name: userName,
                email: validatedData.email,
                password: hashedPassword,
                address: validatedData.address,
                phone_number: validatedData.phone_number,
            },
        });
        const foundingDate = validatedData.founding_date
            ? new Date(validatedData.founding_date)
            : undefined;
        await database_util_1.prismaClient.company.create({
            data: {
                user_id: user.id,
                email: validatedData.email,
                name: validatedData.name,
                address: validatedData.address,
                phone_number: validatedData.phone_number,
                website: validatedData.website,
                vision_mission: validatedData.vision_mission,
                description: validatedData.description,
                founding_date: foundingDate,
                logo_path: validatedData.logo_path,
                image_path: validatedData.image_path,
            },
        });
        return (0, company_model_1.toAuthResponse)(user.id, user.name, user.email, "company");
    }
}
exports.CompanyServices = CompanyServices;
