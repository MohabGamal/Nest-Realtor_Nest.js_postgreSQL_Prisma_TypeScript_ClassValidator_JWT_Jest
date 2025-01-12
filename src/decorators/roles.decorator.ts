import { UserType } from '@prisma/client';
import { SetMetadata } from '@nestjs/common';

export function Roles (...roles: UserType[]) {
  return SetMetadata('roles', roles)
} 