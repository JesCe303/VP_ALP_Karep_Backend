"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const response_error_1 = require("../error/response-error");
const jwt_util_1 = require("../util/jwt-util");
//Why do we use the req with data from UserRequest?
//because we extend to the Request at the user-request-model
//there so no need for duping
const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        // We use Bearer tokens for authorization.
        // The 'Authorization' header typically looks like this:
        // "Authorization": "Bearer <your_token_here>"
        // So we split the string by space and take the second part ([1]), which is the actual token.
        if (!token) {
            next(new response_error_1.ResponseError(401, "Unauthorized user!"));
        }
        //Check if the token on the payload is really a token
        const payload = (0, jwt_util_1.verifyToken)(token);
        //checking if the token is expired or not
        if (payload) {
            req.user = payload;
        }
        else {
            next(new response_error_1.ResponseError(401, "Unauthorized user!"));
        }
        //use next to go to the to do list endpoint
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.authMiddleware = authMiddleware;
