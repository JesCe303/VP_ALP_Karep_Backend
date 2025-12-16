import { PrismaClient } from "@prisma/client";
import { NotificationCreateRequest, NotificationResponse, toNotificationResponseList } from "../model/notification-model";
import { prismaClient } from "../util/database-util";
import { ResponseError } from "../error/response-error";
import { UserJWTPayload } from "../model/user-model";

export class NotificationService {
    static async getNotifications(
        user: UserJWTPayload
    ): Promise<NotificationResponse[]> {
        const notifications = await prismaClient.notification.findMany({
            where: {
                user_id: user.id
            }
        });

        return toNotificationResponseList(notifications);
    }

    static async deleteNotification(
        user: UserJWTPayload,
        notificationId: number
    ) {
        const notification = await PrismaClient.notification.findFirst({
            where: {
                id: notificationId,
                user_id: user.id
            }
        })

        if (!notification) {
            throw new ResponseError(400, "Notification not found");
        }

        await prismaClient.notification.delete({
            where: {
                id: notificationId,
                user_id: user.id
            }
        });

        return "Notification deleted successfully";
    }

    static async createNotificationIfAccepted(
        user: UserJWTPayload,
        job_id: number,
        company_id: number
    ) {
        const job = await prismaClient.job.findUnique({
            where: {
                id: job_id
            }
        });

        if (!job) {
            throw new ResponseError(400, "Job not found");
        }

        const company = await prismaClient.company.findUnique({
            where: {
                id: company_id
            }
        });

        if (!company) {
            throw new ResponseError(400, "Company not found");
        }

        await prismaClient.notification.create({
            data: {
                title: "Lamaran Diterima!",
                subtitle: "Selamat, Lamaran Anda untuk posisi " + job.name + " di " + company.name + " telah diterima",
                user_id: user.id
            }
        })

        return "Notification created successfully";
    }

    static async createNotificationIfRejected(
        user: UserJWTPayload,
        job_id: number,
        company_id: number
    ) {
        const job = await prismaClient.job.findUnique({
            where: {
                id: job_id
            }
        });

        if (!job) {
            throw new ResponseError(400, "Job not found");
        }

        const company = await prismaClient.company.findUnique({
            where: {
                id: company_id
            }
        });

        if (!company) {
            throw new ResponseError(400, "Company not found");
        }

        await prismaClient.notification.create({
            data: {
                title: "Lamaran Ditolak",
                subtitle: "Maaf, Lamaran Anda untuk posisi " + job.name + " di " + company.name + " belum dapat kami terima",
                user_id: user.id
            }
        })

        return "Notification created successfully";
    }
}