import { NextFunction, Response } from "express";
import { NotificationService } from "../services/notification-service";
import { UserRequest } from "../model/user-request-model";

export class NotificationController {
    static async getNotifications(
        req: UserRequest,
        res: Response,
        next: NextFunction
    ) {
        try {
            const response = await NotificationService.getNotifications(req.user!);

            res.status(200).json({
                data: response
            });
        } catch (error) {
            next(error);
        }
    }

    static async deleteNotification(
        req: UserRequest,
        res: Response,
        next: NextFunction
    ) {
        try {
            const notificationId = Number(req.params.notificationId);

            const response = await NotificationService.deleteNotification(req.user!, notificationId);

            res.status(200).json({
                data: response
            });
        } catch (error) {
            next(error);
        }
    }
}