import { PrismaService } from './../../prisma/prisma.service';
import { signInDto, signUpDto } from './../dtos/auth.dto';
import { UserType } from '@prisma/client';
export declare class AuthService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    private generateToken;
    generateProductKey(email: string, userType: string): Promise<string>;
    signUp(body: signUpDto, userType: UserType): Promise<string>;
    signIn(body: signInDto): Promise<string>;
}
