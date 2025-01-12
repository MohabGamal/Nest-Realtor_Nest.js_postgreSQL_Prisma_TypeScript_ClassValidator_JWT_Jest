import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import * as jwt from 'jsonwebtoken'
import { PrismaService } from './../prisma/prisma.service'
import { IJWTPayload } from './../user/decorators/user.decorators';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly PrismaService: PrismaService,
  ) {}
  
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.getAllAndOverride('roles', [
      context.getHandler(),
      context.getClass(),
    ])
    if (roles?.length) {
      const request = context.switchToHttp().getRequest()
      const token = request.headers?.authorization?.split('Bearer ')[1]

      try {
        const payload = jwt.verify(token, process.env.JWT_SECRET) as IJWTPayload
        const user = await this.PrismaService.user.findUnique({
          where: { id: payload.id },
        })

        if (!user || !roles.includes(user.user_type)) {
          throw new UnauthorizedException()
        }
      } catch (error) {
        throw new UnauthorizedException()
      }
    }
    return true
  }
}
