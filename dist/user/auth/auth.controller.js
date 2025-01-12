"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const auth_dto_1 = require("./../dtos/auth.dto");
const client_1 = require("@prisma/client");
const bcrypt = require("bcryptjs");
const user_decorators_1 = require("../decorators/user.decorators");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async signUp(body, userType) {
        if (userType !== client_1.UserType.BUYER) {
            if (!body.productKey) {
                throw new common_1.UnauthorizedException();
            }
        }
        const validProductKey = `${body.email}-${userType}-${process.env.PRODUCT_KEY_SECRET}`;
        const isValidProductKey = await bcrypt.compare(body.productKey, validProductKey);
        if (!isValidProductKey)
            throw new common_1.UnauthorizedException();
        return this.authService.signUp(body, userType);
    }
    signIn(body) {
        return this.authService.signIn(body);
    }
    generateProductKey(body) {
        return this.authService.generateProductKey(body.email, body.userType);
    }
    whoAmI(user) {
        return user;
    }
};
__decorate([
    (0, common_1.Post)('/signup/:userType'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('userType', new common_1.ParseEnumPipe(client_1.UserType))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.signUpDto, String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signUp", null);
__decorate([
    (0, common_1.Post)('/signin'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.signInDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "signIn", null);
__decorate([
    (0, common_1.Post)('/key'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.generateProductKeyDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "generateProductKey", null);
__decorate([
    (0, common_1.Get)('/whoami'),
    __param(0, (0, user_decorators_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "whoAmI", null);
AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map