"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toUserResponse = toUserResponse;
const jwt_util_1 = require("../util/jwt-util");
function toUserResponse(id, username, email, accountType = "user") {
    return {
        token: (0, jwt_util_1.generateToken)({
            id: id,
            username: username,
            email: email
        }, 
        //expired date
        "1h"),
        account_type: accountType,
    };
}
