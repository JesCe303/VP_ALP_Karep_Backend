"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const env_util_1 = require("./util/env-util");
const public_api_1 = require("./route/public-api");
const error_middleware_1 = require("./middleware/error-middleware");
console.log("hai aku jece");
const app = (0, express_1.default)();
app.use(express_1.default.json());
//Just JSON output pretty
app.set('json spaces', 2);
app.use("/api", public_api_1.publicRouter);
app.use(error_middleware_1.errorMiddleware);
app.listen(env_util_1.PORT || 3000, () => {
    console.log(`Connected to port ${env_util_1.PORT}`);
});
console.log("Server did not crash right after listen()");
