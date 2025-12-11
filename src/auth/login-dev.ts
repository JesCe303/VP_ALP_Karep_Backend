import { Request, Response, NextFunction } from "express";
import { generateToken } from "../util/jwt-util";
import { UserJWTPayload } from "../model/model";

export class LoginDevController {
    static loginDev(req: Request, res: Response, next: NextFunction) {
        try {
            const fakeUser: UserJWTPayload = {
                id: 1,
                name: "Dev",
                email: "dev@example.com"
            };
            const token = generateToken(fakeUser, "30d");

            res.json({
                message: "Dev Login successfully",
                token,
                user: fakeUser,
            })
            
        } catch (error) {
            next(error)
        }
    }
}