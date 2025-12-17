import {Request, Response, NextFunction } from 'express';
import { AchievementRequest, AchievementResponse, ExperienceRequest, ExperienceResponse, LoginUserRequest, ProfileResponse, RegisterUserRequest, UpdateProfileRequest, UserResponse } from '../model/user-model';
import { User } from '../../generated/prisma/client';
import { UserServices } from '../services/user-services';
import { UserRequest } from '../model/user-request-model';

export class UserController {

    static async register(req: Request, res: Response, next: NextFunction) {
        try {
            const request : RegisterUserRequest = req.body as RegisterUserRequest;
            const response : UserResponse = await UserServices.register(request);

            res.status(200).json({
                data: response
            })
        }
        catch (error) {
            next(error);
        }
    }

    static async login(req: Request, res: Response, next: NextFunction) {
        try {
            const request : LoginUserRequest = req.body as LoginUserRequest;
            const response : UserResponse = await UserServices.login(request);

            res.status(200).json({
                data: response
            })
        }
        catch (error) {
            next(error);
        }
    }

    // Update Profile
    static async updateProfile(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const userId = req.user!.id;
            const request: UpdateProfileRequest = req.body as UpdateProfileRequest;
            const response: ProfileResponse = await UserServices.updateProfile(userId, request);

            res.status(200).json({
                data: response
            })
        }
        catch (error) {
            next(error);
        }
    }

    // Get Profile
    static async getProfile(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const userId = req.user!.id;
            const response: ProfileResponse = await UserServices.getProfile(userId);

            res.status(200).json({
                data: response
            })
        }
        catch (error) {
            next(error);
        }
    }

    // CRUD Experience
    static async createExperience(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const userId = req.user!.id;
            const request: ExperienceRequest = req.body as ExperienceRequest;
            const response: ExperienceResponse = await UserServices.createExperience(userId, request);

            res.status(201).json({
                data: response
            })
        }
        catch (error) {
            next(error);
        }
    }

    static async getAllExperiences(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const userId = req.user!.id;
            const response: ExperienceResponse[] = await UserServices.getAllExperiences(userId);

            res.status(200).json({
                data: response
            })
        }
        catch (error) {
            next(error);
        }
    }

    static async getExperience(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const userId = req.user!.id;
            const experienceId = parseInt(req.params.id);
            const response: ExperienceResponse = await UserServices.getExperience(userId, experienceId);

            res.status(200).json({
                data: response
            })
        }
        catch (error) {
            next(error);
        }
    }

    static async updateExperience(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const userId = req.user!.id;
            const experienceId = parseInt(req.params.id);
            const request: ExperienceRequest = req.body as ExperienceRequest;
            const response: ExperienceResponse = await UserServices.updateExperience(userId, experienceId, request);

            res.status(200).json({
                data: response
            })
        }
        catch (error) {
            next(error);
        }
    }

    static async deleteExperience(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const userId = req.user!.id;
            const experienceId = parseInt(req.params.id);
            await UserServices.deleteExperience(userId, experienceId);

            res.status(200).json({
                message: "Experience deleted successfully"
            })
        }
        catch (error) {
            next(error);
        }
    }

    // CRUD Achievement
    static async createAchievement(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const userId = req.user!.id;
            const request: AchievementRequest = req.body as AchievementRequest;
            const response: AchievementResponse = await UserServices.createAchievement(userId, request);

            res.status(201).json({
                data: response
            })
        }
        catch (error) {
            next(error);
        }
    }

    static async getAllAchievements(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const userId = req.user!.id;
            const response: AchievementResponse[] = await UserServices.getAllAchievements(userId);

            res.status(200).json({
                data: response
            })
        }
        catch (error) {
            next(error);
        }
    }

    static async getAchievement(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const userId = req.user!.id;
            const achievementId = parseInt(req.params.id);
            const response: AchievementResponse = await UserServices.getAchievement(userId, achievementId);

            res.status(200).json({
                data: response
            })
        }
        catch (error) {
            next(error);
        }
    }

    static async updateAchievement(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const userId = req.user!.id;
            const achievementId = parseInt(req.params.id);
            const request: AchievementRequest = req.body as AchievementRequest;
            const response: AchievementResponse = await UserServices.updateAchievement(userId, achievementId, request);

            res.status(200).json({
                data: response
            })
        }
        catch (error) {
            next(error);
        }
    }

    static async deleteAchievement(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const userId = req.user!.id;
            const achievementId = parseInt(req.params.id);
            await UserServices.deleteAchievement(userId, achievementId);

            res.status(200).json({
                message: "Achievement deleted successfully"
            })
        }
        catch (error) {
            next(error);
        }
    }
}