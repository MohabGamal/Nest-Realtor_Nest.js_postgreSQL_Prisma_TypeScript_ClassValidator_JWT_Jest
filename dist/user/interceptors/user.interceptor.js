"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInterceptor = void 0;
const jwt = require("jsonwebtoken");
class UserInterceptor {
    intercept(context, handler) {
        var _a;
        const request = context.switchToHttp().getRequest();
        const token = (_a = request.headers.authorization) === null || _a === void 0 ? void 0 : _a.split('Bearer ')[1];
        const user = jwt.decode(token);
        request.user = user;
        return handler.handle();
    }
}
exports.UserInterceptor = UserInterceptor;
//# sourceMappingURL=user.interceptor.js.map