"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyController = void 0;
const company_services_1 = require("../services/company-services");
class CompanyController {
    static async register(req, res, next) {
        try {
            const request = req.body;
            const response = await company_services_1.CompanyServices.register(request);
            res.status(200).json({
                data: response,
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.CompanyController = CompanyController;
