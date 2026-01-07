"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_services_1 = require("../services/user-services");
class UserController {
    static async register(req, res, next) {
        try {
            const request = req.body;
            const response = await user_services_1.UserServices.register(request);
            res.status(200).json({
                data: response
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async login(req, res, next) {
        try {
            const request = req.body;
            const response = await user_services_1.UserServices.login(request);
            res.status(200).json({
                data: response
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.UserController = UserController;
