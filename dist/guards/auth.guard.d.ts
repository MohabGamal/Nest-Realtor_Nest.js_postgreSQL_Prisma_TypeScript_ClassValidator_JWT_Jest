import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaService } from './../prisma/prisma.service';
export declare class AuthGuard implements CanActivate {
    private readonly reflector;
    private readonly PrismaService;
    constructor(reflector: Reflector, PrismaService: PrismaService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
