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
exports.InquireDto = exports.HomeUpdateDto = exports.HomeCreateDto = exports.HomeRequestQueryDto = exports.HomeResponseDto = void 0;
const client_1 = require("@prisma/client");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class HomeResponseDto {
    constructor(partial) {
        Object.assign(this, partial);
    }
    getPropertyType() {
        return this.property_type;
    }
    getNumberOfBedrooms() {
        return this.number_of_bedrooms;
    }
    getNumberOfBathrooms() {
        return this.number_of_bathrooms;
    }
    getListedDate() {
        return this.listed_date;
    }
    getLandSize() {
        return this.land_size;
    }
}
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Date)
], HomeResponseDto.prototype, "created_at", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Date)
], HomeResponseDto.prototype, "updated_at", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Number)
], HomeResponseDto.prototype, "realtor_id", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", String)
], HomeResponseDto.prototype, "property_type", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'propertyType' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], HomeResponseDto.prototype, "getPropertyType", null);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Number)
], HomeResponseDto.prototype, "number_of_bedrooms", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'numberOfBedrooms' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Number)
], HomeResponseDto.prototype, "getNumberOfBedrooms", null);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Number)
], HomeResponseDto.prototype, "number_of_bathrooms", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'numberOfBathrooms' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Number)
], HomeResponseDto.prototype, "getNumberOfBathrooms", null);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Date)
], HomeResponseDto.prototype, "listed_date", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'listedDate' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Date)
], HomeResponseDto.prototype, "getListedDate", null);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Number)
], HomeResponseDto.prototype, "land_size", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'landSize' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Number)
], HomeResponseDto.prototype, "getLandSize", null);
exports.HomeResponseDto = HomeResponseDto;
class HomeRequestQueryDto {
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], HomeRequestQueryDto.prototype, "city", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumberString)(),
    __metadata("design:type", String)
], HomeRequestQueryDto.prototype, "minPrice", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumberString)(),
    __metadata("design:type", String)
], HomeRequestQueryDto.prototype, "maxPrice", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.PropertyType),
    __metadata("design:type", String)
], HomeRequestQueryDto.prototype, "property_type", void 0);
exports.HomeRequestQueryDto = HomeRequestQueryDto;
class Image {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], Image.prototype, "url", void 0);
class HomeCreateDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], HomeCreateDto.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], HomeCreateDto.prototype, "city", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], HomeCreateDto.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(client_1.PropertyType),
    __metadata("design:type", String)
], HomeCreateDto.prototype, "property_type", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], HomeCreateDto.prototype, "number_of_bedrooms", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], HomeCreateDto.prototype, "number_of_bathrooms", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], HomeCreateDto.prototype, "land_size", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => Image),
    __metadata("design:type", Array)
], HomeCreateDto.prototype, "images", void 0);
exports.HomeCreateDto = HomeCreateDto;
class HomeUpdateDto {
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], HomeUpdateDto.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], HomeUpdateDto.prototype, "city", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], HomeUpdateDto.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.PropertyType),
    __metadata("design:type", String)
], HomeUpdateDto.prototype, "property_type", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], HomeUpdateDto.prototype, "number_of_bedrooms", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], HomeUpdateDto.prototype, "number_of_bathrooms", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], HomeUpdateDto.prototype, "land_size", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], HomeUpdateDto.prototype, "realtor_id", void 0);
exports.HomeUpdateDto = HomeUpdateDto;
class InquireDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], InquireDto.prototype, "message", void 0);
exports.InquireDto = InquireDto;
//# sourceMappingURL=home.dto.js.map