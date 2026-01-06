import { Notification } from "../../generated/prisma/client";

export interface NotificationResponse {
    id: number;
    title: string;
    subtitle?: string;
    date: Date;
}

export function toNotificationResponseList(prismaNotifications: Notification[]): NotificationResponse[] {
    const notifications = prismaNotifications.map((notification) => {
        return {
            id: notification.id,
            title: notification.title,
            subtitle: notification.subtitle || undefined,
            date: notification.date,
        }
    });
    return notifications;
}

export function toNotificationResponse(prismaNotification: Notification): NotificationResponse {
    return {
        id: prismaNotification.id,
        title: prismaNotification.title,
        subtitle: prismaNotification.subtitle || undefined,
        date: prismaNotification.date,
    }
}

export interface NotificationCreateRequest {
    title: string;
    subtitle?: string;
}