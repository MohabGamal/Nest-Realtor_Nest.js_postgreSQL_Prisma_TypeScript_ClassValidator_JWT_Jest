import { UserType } from '@prisma/client';
export declare class signUpDto {
    name: string;
    phone: string;
    email: string;
    password: string;
    productKey?: string;
}
export declare class signInDto {
    email: string;
    password: string;
}
export declare class generateProductKeyDto {
    email: string;
    userType: UserType;
}
