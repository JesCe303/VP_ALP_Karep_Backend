import { generateToken } from "../util/jwt-util";

export interface UserJWTPayload {
    id: number;
    username: string;
    email: string;
}

//  register
export interface RegisterUserRequest {
    username: string;
    password: string;
    email: string;
    address?: string;
    phone_number?: string;
}

export interface UserResponse {
    //artinya token boleh null 
    token: string
    account_type: "user" | "company"
}

export function toUserResponse(
    id: number,
    username: string,
    email: string,
    accountType: "user" | "company" = "user"
) : UserResponse {
    return {
            token: generateToken({
                id: id,
                username: username,
                email: email
        },
        //expired date
        "1h"),
        account_type: accountType,
    }
}

// login
export interface LoginUserRequest {
    email: string;
    password: string;
}

// Update Profile
export interface UpdateProfileRequest {
    name?: string;
    address?: string;
    phone_number?: string;
}

export interface ProfileResponse {
    id: number;
    email: string;
    name: string;
    address?: string | null;
    phone_number?: string | null;
}

export function toProfileResponse(user: any): ProfileResponse {
    return {
        id: user.id,
        email: user.email,
        name: user.name,
        address: user.address,
        phone_number: user.phone_number
    }
}

// Experience
export interface ExperienceRequest {
    title: string;
    description?: string;
}

export interface ExperienceResponse {
    id: number;
    title: string;
    description?: string | null;
    user_id: number;
}

export function toExperienceResponse(experience: any): ExperienceResponse {
    return {
        id: experience.id,
        title: experience.title,
        description: experience.description,
        user_id: experience.user_id
    }
}

// Achievement
export interface AchievementRequest {
    title: string;
    description?: string;
}

export interface AchievementResponse {
    id: number;
    title: string;
    description?: string | null;
    user_id: number;
}

export function toAchievementResponse(achievement: any): AchievementResponse {
    return {
        id: achievement.id,
        title: achievement.title,
        description: achievement.description,
        user_id: achievement.user_id
    }
}