import { UserJWTPayload } from "../model/user-request-model";

declare global {
    namespace Express {
        interface Request {
            user?: UserJWTPayload;
        }
    }
}

export {};
