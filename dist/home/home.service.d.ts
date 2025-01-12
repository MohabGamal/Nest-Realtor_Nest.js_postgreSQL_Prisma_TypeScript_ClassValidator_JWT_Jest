import { IJWTPayload } from 'src/user/decorators/user.decorators';
import { PrismaService } from './../prisma/prisma.service';
import { HomeRequestQueryDto, HomeResponseDto, HomeCreateDto, HomeUpdateDto, InquireDto } from './dto/home.dto';
export declare class HomeService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    getRealtorByHomeId(id: number): Promise<{
        id: number;
        name: string;
        email: string;
        phone: string;
    }>;
    getHomes(query: HomeRequestQueryDto): Promise<HomeResponseDto[]>;
    getHomeById(id: number): Promise<HomeResponseDto>;
    createHome(body: HomeCreateDto, userId: number): Promise<HomeResponseDto>;
    updateHomeById(id: number, body: HomeUpdateDto): Promise<HomeResponseDto>;
    deleteHomeById(id: number): Promise<void>;
    inquire(user: IJWTPayload, homeId: number, body: InquireDto): Promise<import(".prisma/client").Message>;
    getMessagesByHome(homeId: number): Promise<{
        message: string;
        buyer: {
            name: string;
            email: string;
            phone: string;
        };
    }[]>;
}
