import { Body, Controller, Get, Param, ParseEnumPipe, Post, UnauthorizedException } from '@nestjs/common'
import { AuthService } from './auth.service'
import { signInDto, signUpDto, generateProductKeyDto } from './../dtos/auth.dto'
import { UserType } from '@prisma/client'
import * as bcrypt from 'bcryptjs'
import { User } from '../decorators/user.decorators'
import { IJWTPayload } from './../decorators/user.decorators';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup/:userType')
  async signUp(
    @Body() body: signUpDto,
    @Param('userType', new ParseEnumPipe(UserType)) userType: UserType,
  ) {
    if (userType !== UserType.BUYER) {
      if (!body.productKey) {
        throw new UnauthorizedException()
      }
    }

    const validProductKey = `${body.email}-${userType}-${process.env.PRODUCT_KEY_SECRET}`
    const isValidProductKey = await bcrypt.compare(body.productKey, validProductKey)
    if (!isValidProductKey) throw new UnauthorizedException()

    return this.authService.signUp(body, userType)
  }

  @Post('/signin')
  signIn(@Body() body: signInDto) {
    return this.authService.signIn(body)
  }

  @Post('/key')
  generateProductKey(@Body() body: generateProductKeyDto) {
    return this.authService.generateProductKey(body.email, body.userType)
  }

  @Get('/whoami')
  whoAmI(@User() user: IJWTPayload) {
    return user
  }
}
