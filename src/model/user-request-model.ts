import { Request } from "express";

export interface UserJWTPayload {
    id: number;
    username: string;
    email: string;
}

export interface UserRequest extends Request {
    user?: UserJWTPayload;
}
