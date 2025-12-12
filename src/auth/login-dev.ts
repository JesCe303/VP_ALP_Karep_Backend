//TODO: Hapus file ini, hanya untuk buat saya bisa login saja - Joel

import { Request, Response, NextFunction } from "express";
import { generateToken } from "../util/jwt-util";
import { UserJWTPayload } from "../model/user-request-model";
import { prismaClient } from "../util/database-util";

export class LoginDevController {
    static async loginDev(req: Request, res: Response, next: NextFunction) {
        try {
            let user = await prismaClient.user.findUnique({
                where: { email: "dev@example.com" }
            });

        // If user doesn't exist, create it
            if (!user) {
                user = await prismaClient.user.create({
                    data: {
                        name: "Dev",
                        email: "dev@example.com",
                        password: "devpass"
                    }
                });
            }

            const token = generateToken(
                { id: user.id, name: user.name, email: user.email },
                "30d"
            );
            
            res.json({
                token,
            });
        
        } catch (error) {
            next(error);
        }   
    }

    static async loginDevUser(req: Request, res: Response, next: NextFunction) {
        try {
            let user = await prismaClient.user.findUnique({
                where: { email: "devuser@example.com" }
            });

        // If user doesn't exist, create it
            if (!user) {
                user = await prismaClient.user.create({
                    data: {
                        name: "DevUser",
                        email: "devuser@example.com",
                        password: "userpass" // no hashing since Dev only
                    }
                });
            }

            const token = generateToken(
                { id: user.id, name: user.name, email: user.email },
                "30d"
            );

            res.json({
                message: "Dev user logged in!",
                token,
                user
            });
        } catch (error) {
            next(error);
        }
    }


    static async companyConnect(req: Request, res: Response, next: NextFunction) {
        try {
        const company = await prismaClient.company.create({
            data: {
                email: "company@example.com",
                name: "My First Company",
                address: "123 Street",
                phone_number: "08123456789",
                website: "https://example.com",
                description: "This is a sample company.",
                user: {
                    connect: {
                        id: 1
                    }
                }
            }
        });

        res.json({
            message: "Company Created succefully",
            company
        })
    } catch (error) {
            next(error)
        }
    }
}