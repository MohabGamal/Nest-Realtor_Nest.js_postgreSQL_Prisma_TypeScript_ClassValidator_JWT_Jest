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
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateProductKeyDto = exports.signInDto = exports.signUpDto = void 0;
const class_validator_1 = require("class-validator");
const client_1 = require("@prisma/client");
class signUpDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], signUpDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.Matches)(/^[0-9]{10}$/, { message: 'not a vaild phone number' }),
    __metadata("design:type", String)
], signUpDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], signUpDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(5),
    __metadata("design:type", String)
], signUpDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], signUpDto.prototype, "productKey", void 0);
exports.signUpDto = signUpDto;
class signInDto {
}
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], signInDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], signInDto.prototype, "password", void 0);
exports.signInDto = signInDto;
class generateProductKeyDto {
}
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], generateProductKeyDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(client_1.UserType),
    __metadata("design:type", String)
], generateProductKeyDto.prototype, "userType", void 0);
exports.generateProductKeyDto = generateProductKeyDto;
//# sourceMappingURL=auth.dto.js.map