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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("./../prisma/prisma.service");
const home_dto_1 = require("./dto/home.dto");
let HomeService = class HomeService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async getRealtorByHomeId(id) {
        const home = await this.prismaService.home.findUnique({
            where: { id },
            select: {
                realtor: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        phone: true,
                    },
                },
            },
        });
        if (!home) {
            throw new common_1.NotFoundException('Home not found');
        }
        return home.realtor;
    }
    async getHomes(query) {
        const { city, minPrice, maxPrice, property_type } = query;
        const homes = await this.prismaService.home.findMany({
            select: {
                id: true,
                address: true,
                city: true,
                price: true,
                property_type: true,
                number_of_bathrooms: true,
                number_of_bedrooms: true,
                images: {
                    select: {
                        url: true,
                    },
                    take: 1,
                },
            },
            where: {
                city,
                property_type,
                price: {
                    gte: minPrice && parseFloat(minPrice),
                    lte: maxPrice && parseFloat(maxPrice),
                },
            },
        });
        if (!homes) {
            throw new common_1.NotFoundException('No homes found');
        }
        return homes.map((home) => {
            const fetchHome = Object.assign(Object.assign({}, home), { image: home.images[0].url });
            delete fetchHome.images;
            return new home_dto_1.HomeResponseDto(fetchHome);
        });
    }
    async getHomeById(id) {
        const home = await this.prismaService.home.findUnique({
            where: { id },
        });
        if (!home) {
            throw new common_1.NotFoundException('Home not found');
        }
        return new home_dto_1.HomeResponseDto(home);
    }
    async createHome(body, userId) {
        const { images } = body, others = __rest(body, ["images"]);
        const createdHome = await this.prismaService.home.create({
            data: Object.assign(Object.assign({}, others), { realtor_id: userId }),
        });
        await this.prismaService.image.createMany({
            data: images.map((image) => (Object.assign(Object.assign({}, image), { home_id: createdHome.id }))),
        });
        return new home_dto_1.HomeResponseDto(createdHome);
    }
    async updateHomeById(id, body) {
        const home = await this.prismaService.home.update({
            where: { id },
            data: Object.assign({}, body),
        });
        return new home_dto_1.HomeResponseDto(home);
    }
    async deleteHomeById(id) {
        await this.prismaService.home.delete({
            where: { id },
        });
    }
    async inquire(user, homeId, body) {
        const realtor = await this.getRealtorByHomeId(homeId);
        return await this.prismaService.message.create({
            data: {
                realtor_id: realtor.id,
                buyer_id: user.id,
                home_id: homeId,
                message: body.message,
            },
        });
    }
    async getMessagesByHome(homeId) {
        return await this.prismaService.message.findMany({
            where: { home_id: homeId },
            select: {
                message: true,
                buyer: {
                    select: {
                        name: true,
                        email: true,
                        phone: true,
                    },
                },
            },
        });
    }
};
HomeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], HomeService);
exports.HomeService = HomeService;
//# sourceMappingURL=home.service.js.map