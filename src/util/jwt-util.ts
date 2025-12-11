import jwt from 'jsonwebtoken'
//import { UserJWTPayload } from '../models/user-model'
import { StringValue } from "ms"
import { JWT_SECRET_KEY } from './env-util'
import { UserJWTPayload } from '../model/model'

export const generateToken = (
    payload: UserJWTPayload,
    expiryTime: StringValue = "30d"
): string => {
    return jwt.sign(payload, JWT_SECRET_KEY || "secret_key", {
        expiresIn: expiryTime
    })
}

export const verifyToken = (token: string): UserJWTPayload => {
    return jwt.verify(token, JWT_SECRET_KEY || "secret_key") as UserJWTPayload
}