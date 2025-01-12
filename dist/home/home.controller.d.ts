import { HomeService } from './home.service';
import { HomeRequestQueryDto, HomeResponseDto, HomeCreateDto, InquireDto } from './dto/home.dto';
import { PropertyType } from '@prisma/client';
import { IJWTPayload } from './../user/decorators/user.decorators';
export interface IHomesQuery {
    city?: string;
    minPrice?: string;
    maxPrice?: string;
    property_type?: PropertyType;
}
export declare class HomeController {
    private readonly homeService;
    constructor(homeService: HomeService);
    getHomes(query: HomeRequestQueryDto): Promise<HomeResponseDto[]>;
    getHome(id: number): Promise<HomeResponseDto>;
    createHome(body: HomeCreateDto, user: IJWTPayload): Promise<HomeResponseDto>;
    updateHome(id: number, body: HomeCreateDto, user: IJWTPayload): Promise<HomeResponseDto>;
    deleteHome(id: number, user: IJWTPayload): Promise<void>;
    inquireHome(homeId: number, user: IJWTPayload, body: InquireDto): Promise<import(".prisma/client").Message>;
    getHomeMessages(homeId: number, user: IJWTPayload): Promise<{
        message: string;
        buyer: {
            name: string;
            email: string;
            phone: string;
        };
    }[]>;
}
