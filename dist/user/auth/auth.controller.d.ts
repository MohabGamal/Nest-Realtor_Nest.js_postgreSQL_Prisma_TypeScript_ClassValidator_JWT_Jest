import { AuthService } from './auth.service';
import { signInDto, signUpDto, generateProductKeyDto } from './../dtos/auth.dto';
import { UserType } from '@prisma/client';
import { IJWTPayload } from './../decorators/user.decorators';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signUp(body: signUpDto, userType: UserType): Promise<string>;
    signIn(body: signInDto): Promise<string>;
    generateProductKey(body: generateProductKeyDto): Promise<string>;
    whoAmI(user: IJWTPayload): IJWTPayload;
}
