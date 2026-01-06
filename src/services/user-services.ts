import { validate } from "uuid";
import { ResponseError } from "../error/response-error";
import { AchievementRequest, AchievementResponse, ExperienceRequest, ExperienceResponse, LoginUserRequest, ProfileResponse, RegisterUserRequest, toAchievementResponse, toExperienceResponse, toProfileResponse, toUserResponse, UpdateEmailRequest, UpdateEmailResponse, UpdatePasswordRequest, UpdatePasswordResponse, UpdateProfileRequest, UserResponse } from "../model/user-model";
import { prismaClient } from "../util/database-util";
import { UserValidation } from "../validation/user-validation";
import { Validation } from "../validation/validation";
import bcrypt from "bcrypt";

export class UserServices {
    static async register(request: RegisterUserRequest): Promise<UserResponse> {
        const validatedData = Validation.validate(
            UserValidation.REGISTER,
            request
        )

        const email = await prismaClient.user.findFirst({
            where: {
                email: validatedData.email
            },
        })

        if (email) {
            throw new ResponseError(400, "Email already exists");
        }

        validatedData.password = await bcrypt.hash(validatedData.password, 10)

        const user = await prismaClient.user.create({
            data: {
                name: validatedData.username, 
                email: validatedData.email,
                password: validatedData.password,
                address: validatedData.address,
                phone_number: validatedData.phone_number,
            }
        })

        return toUserResponse(user.id, user.name, user.email, "user")
    }

    static async login(request: LoginUserRequest): Promise<UserResponse> {
        const validatedData = Validation.validate(
            UserValidation.LOGIN,
            request
        )

        const user =  await prismaClient.user.findFirst({
            where: {
                email: validatedData.email
            },
        })

        if (!user) {
            throw new ResponseError(400, "Invalid email or password");
        }

        const passwordIsValid = await bcrypt.compare(validatedData.password, user.password);

        if (!passwordIsValid) {
            throw new ResponseError(400, "Invalid email or password");
        }

        const company = await prismaClient.company.findUnique({
            where: {
                user_id: user.id,
            },
            select: {
                id: true,
            }
        })

        const accountType = company ? "company" : "user";

        return toUserResponse(user.id, user.name, user.email, accountType)
    }

    // Update Profile User
    static async updateProfile(userId: number, request: UpdateProfileRequest): Promise<ProfileResponse> {
        const validatedData = Validation.validate(
            UserValidation.UPDATE_PROFILE,
            request
        )

        const user = await prismaClient.user.findUnique({
            where: {
                id: userId
            }
        })

        if (!user) {
            throw new ResponseError(404, "User not found");
        }

        const updatedUser = await prismaClient.user.update({
            where: {
                id: userId
            },
            data: validatedData
        })

        return toProfileResponse(updatedUser)
    }

    // Get Profile
    static async getProfile(userId: number): Promise<ProfileResponse> {
        const user = await prismaClient.user.findUnique({
            where: {
                id: userId
            }
        })

        if (!user) {
            throw new ResponseError(404, "User not found");
        }

        return toProfileResponse(user)
    }

    // Update Email
    static async updateEmail(userId: number, request: UpdateEmailRequest): Promise<UpdateEmailResponse> {
        const validatedData = Validation.validate(
            UserValidation.UPDATE_EMAIL,
            request
        )

        const user = await prismaClient.user.findUnique({
            where: {
                id: userId
            }
        })

        if (!user) {
            throw new ResponseError(404, "User not found");
        }

        // Verify current password
        const passwordIsValid = await bcrypt.compare(validatedData.current_password, user.password);

        if (!passwordIsValid) {
            throw new ResponseError(400, "Current password is incorrect");
        }

        // Check if new email already exists
        const existingEmail = await prismaClient.user.findFirst({
            where: {
                email: validatedData.new_email,
                NOT: {
                    id: userId
                }
            }
        })

        if (existingEmail) {
            throw new ResponseError(400, "Email already exists");
        }

        // Update email
        await prismaClient.user.update({
            where: {
                id: userId
            },
            data: {
                email: validatedData.new_email
            }
        })

        return {
            message: "Email updated successfully",
            email: validatedData.new_email
        }
    }

    // Update Password
    static async updatePassword(userId: number, request: UpdatePasswordRequest): Promise<UpdatePasswordResponse> {
        const validatedData = Validation.validate(
            UserValidation.UPDATE_PASSWORD,
            request
        )

        const user = await prismaClient.user.findUnique({
            where: {
                id: userId
            }
        })

        if (!user) {
            throw new ResponseError(404, "User not found");
        }

        // Verify current password
        const passwordIsValid = await bcrypt.compare(validatedData.current_password, user.password);

        if (!passwordIsValid) {
            throw new ResponseError(400, "Current password is incorrect");
        }

        // Check if new password is same as current
        const samePassword = await bcrypt.compare(validatedData.new_password, user.password);

        if (samePassword) {
            throw new ResponseError(400, "New password must be different from current password");
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(validatedData.new_password, 10);

        // Update password
        await prismaClient.user.update({
            where: {
                id: userId
            },
            data: {
                password: hashedPassword
            }
        })

        return {
            message: "Password updated successfully"
        }
    }

    // CRUD Experience
    static async createExperience(userId: number, request: ExperienceRequest): Promise<ExperienceResponse> {
        const validatedData = Validation.validate(
            UserValidation.EXPERIENCE,
            request
        )

        const experience = await prismaClient.experience.create({
            data: {
                title: validatedData.title,
                description: validatedData.description,
                user_id: userId
            }
        })

        return toExperienceResponse(experience)
    }

    static async getAllExperiences(userId: number): Promise<ExperienceResponse[]> {
        const experiences = await prismaClient.experience.findMany({
            where: {
                user_id: userId
            }
        })

        return experiences.map(exp => toExperienceResponse(exp))
    }

    static async getExperience(userId: number, experienceId: number): Promise<ExperienceResponse> {
        const experience = await prismaClient.experience.findFirst({
            where: {
                id: experienceId,
                user_id: userId
            }
        })

        if (!experience) {
            throw new ResponseError(404, "Experience not found");
        }

        return toExperienceResponse(experience)
    }

    static async updateExperience(userId: number, experienceId: number, request: ExperienceRequest): Promise<ExperienceResponse> {
        const validatedData = Validation.validate(
            UserValidation.EXPERIENCE,
            request
        )

        const experience = await prismaClient.experience.findFirst({
            where: {
                id: experienceId,
                user_id: userId
            }
        })

        if (!experience) {
            throw new ResponseError(404, "Experience not found");
        }

        const updatedExperience = await prismaClient.experience.update({
            where: {
                id: experienceId
            },
            data: validatedData
        })

        return toExperienceResponse(updatedExperience)
    }

    static async deleteExperience(userId: number, experienceId: number): Promise<void> {
        const experience = await prismaClient.experience.findFirst({
            where: {
                id: experienceId,
                user_id: userId
            }
        })

        if (!experience) {
            throw new ResponseError(404, "Experience not found");
        }

        await prismaClient.experience.delete({
            where: {
                id: experienceId
            }
        })
    }

    // CRUD Achievement
    static async createAchievement(userId: number, request: AchievementRequest): Promise<AchievementResponse> {
        const validatedData = Validation.validate(
            UserValidation.ACHIEVEMENT,
            request
        )

        const achievement = await prismaClient.achievement.create({
            data: {
                title: validatedData.title,
                description: validatedData.description,
                user_id: userId
            }
        })

        return toAchievementResponse(achievement)
    }

    static async getAllAchievements(userId: number): Promise<AchievementResponse[]> {
        const achievements = await prismaClient.achievement.findMany({
            where: {
                user_id: userId
            }
        })

        return achievements.map(ach => toAchievementResponse(ach))
    }

    static async getAchievement(userId: number, achievementId: number): Promise<AchievementResponse> {
        const achievement = await prismaClient.achievement.findFirst({
            where: {
                id: achievementId,
                user_id: userId
            }
        })

        if (!achievement) {
            throw new ResponseError(404, "Achievement not found");
        }

        return toAchievementResponse(achievement)
    }

    static async updateAchievement(userId: number, achievementId: number, request: AchievementRequest): Promise<AchievementResponse> {
        const validatedData = Validation.validate(
            UserValidation.ACHIEVEMENT,
            request
        )

        const achievement = await prismaClient.achievement.findFirst({
            where: {
                id: achievementId,
                user_id: userId
            }
        })

        if (!achievement) {
            throw new ResponseError(404, "Achievement not found");
        }

        const updatedAchievement = await prismaClient.achievement.update({
            where: {
                id: achievementId
            },
            data: validatedData
        })

        return toAchievementResponse(updatedAchievement)
    }

    static async deleteAchievement(userId: number, achievementId: number): Promise<void> {
        const achievement = await prismaClient.achievement.findFirst({
            where: {
                id: achievementId,
                user_id: userId
            }
        })

        if (!achievement) {
            throw new ResponseError(404, "Achievement not found");
        }

        await prismaClient.achievement.delete({
            where: {
                id: achievementId
            }
        })
    }
}