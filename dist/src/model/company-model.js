"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toAuthResponse = toAuthResponse;
const jwt_util_1 = require("../util/jwt-util");
function toAuthResponse(id, username, email, accountType) {
    return {
        token: (0, jwt_util_1.generateToken)({
            id,
            username,
            email,
        }, "1h"),
        account_type: accountType,
    };
}
