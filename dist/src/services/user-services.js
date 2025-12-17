"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const response_error_1 = require("../error/response-error");
const user_model_1 = require("../model/user-model");
const database_util_1 = require("../util/database-util");
const user_validation_1 = require("../validation/user-validation");
const validation_1 = require("../validation/validation");
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserServices {
    static async register(request) {
        const validatedData = validation_1.Validation.validate(user_validation_1.UserValidation.REGISTER, request);
        const email = await database_util_1.prismaClient.user.findFirst({
            where: {
                email: validatedData.email
            },
        });
        if (email) {
            throw new response_error_1.ResponseError(400, "Email already exists");
        }
        validatedData.password = await bcrypt_1.default.hash(validatedData.password, 10);
        const user = await database_util_1.prismaClient.user.create({
            data: {
                name: validatedData.username,
                email: validatedData.email,
                password: validatedData.password,
                address: validatedData.address,
                phone_number: validatedData.phone_number,
            }
        });
        return (0, user_model_1.toUserResponse)(user.id, user.name, user.email, "user");
    }
    static async login(request) {
        const validatedData = validation_1.Validation.validate(user_validation_1.UserValidation.LOGIN, request);
        const user = await database_util_1.prismaClient.user.findFirst({
            where: {
                email: validatedData.email
            },
        });
        if (!user) {
            throw new response_error_1.ResponseError(400, "Invalid email or password");
        }
        const passwordIsValid = await bcrypt_1.default.compare(validatedData.password, user.password);
        if (!passwordIsValid) {
            throw new response_error_1.ResponseError(400, "Invalid email or password");
        }
        const company = await database_util_1.prismaClient.company.findUnique({
            where: {
                user_id: user.id,
            },
            select: {
                id: true,
            }
        });
        const accountType = company ? "company" : "user";
        return (0, user_model_1.toUserResponse)(user.id, user.name, user.email, accountType);
    }
}
exports.UserServices = UserServices;
