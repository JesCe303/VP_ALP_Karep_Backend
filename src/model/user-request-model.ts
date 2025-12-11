import { Request } from "express";
import { UserJWTPayload } from "./model";

export interface UserRequest extends Request {
    user?: UserJWTPayload
}