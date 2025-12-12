//TODO: Hapus file ini, hanya untuk buat saya bisa login saja - Joel

import { Request } from "express";

export interface UserJWTPayload {
    id: number;
    name: string;
    email: string
}

export interface UserRequest extends Request {
    user?: UserJWTPayload
}