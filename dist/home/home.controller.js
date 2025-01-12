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
exports.HomeController = void 0;
const common_1 = require("@nestjs/common");
const home_service_1 = require("./home.service");
const home_dto_1 = require("./dto/home.dto");
const user_decorators_1 = require("../user/decorators/user.decorators");
const auth_guard_1 = require("./../guards/auth.guard");
const roles_decorator_1 = require("../decorators/roles.decorator");
const client_1 = require("@prisma/client");
let HomeController = class HomeController {
    constructor(homeService) {
        this.homeService = homeService;
    }
    getHomes(query) {
        return this.homeService.getHomes(query);
    }
    getHome(id) {
        return this.homeService.getHomeById(id);
    }
    createHome(body, user) {
        return this.homeService.createHome(body, user.id);
    }
    async updateHome(id, body, user) {
        const realtor = await this.homeService.getRealtorByHomeId(id);
        if (realtor.id !== user.id) {
            throw new common_1.UnauthorizedException();
        }
        return this.homeService.updateHomeById(id, body);
    }
    async deleteHome(id, user) {
        const realtor = await this.homeService.getRealtorByHomeId(id);
        if (realtor.id !== user.id) {
            throw new common_1.UnauthorizedException();
        }
        return this.homeService.deleteHomeById(id);
    }
    inquireHome(homeId, user, body) {
        return this.homeService.inquire(user, homeId, body);
    }
    async getHomeMessages(homeId, user) {
        const realtor = await this.homeService.getRealtorByHomeId(homeId);
        if (realtor.id !== user.id) {
            throw new common_1.UnauthorizedException();
        }
        return this.homeService.getMessagesByHome(homeId);
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [home_dto_1.HomeRequestQueryDto]),
    __metadata("design:returntype", Promise)
], HomeController.prototype, "getHomes", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], HomeController.prototype, "getHome", null);
__decorate([
    (0, roles_decorator_1.Roles)(client_1.UserType.REALTOR, client_1.UserType.ADMIN),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorators_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [home_dto_1.HomeCreateDto, Object]),
    __metadata("design:returntype", void 0)
], HomeController.prototype, "createHome", null);
__decorate([
    (0, roles_decorator_1.Roles)(client_1.UserType.REALTOR, client_1.UserType.ADMIN),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseIntPipe())),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, user_decorators_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, home_dto_1.HomeCreateDto, Object]),
    __metadata("design:returntype", Promise)
], HomeController.prototype, "updateHome", null);
__decorate([
    (0, roles_decorator_1.Roles)(client_1.UserType.REALTOR, client_1.UserType.ADMIN),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseIntPipe())),
    __param(1, (0, user_decorators_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], HomeController.prototype, "deleteHome", null);
__decorate([
    (0, roles_decorator_1.Roles)(client_1.UserType.BUYER),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)('inquire/:id'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseIntPipe())),
    __param(1, (0, user_decorators_1.User)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, home_dto_1.InquireDto]),
    __metadata("design:returntype", void 0)
], HomeController.prototype, "inquireHome", null);
__decorate([
    (0, roles_decorator_1.Roles)(client_1.UserType.REALTOR),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)('messages/:id'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseIntPipe())),
    __param(1, (0, user_decorators_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], HomeController.prototype, "getHomeMessages", null);
HomeController = __decorate([
    (0, common_1.Controller)('home'),
    __metadata("design:paramtypes", [home_service_1.HomeService])
], HomeController);
exports.HomeController = HomeController;
//# sourceMappingURL=home.controller.js.map