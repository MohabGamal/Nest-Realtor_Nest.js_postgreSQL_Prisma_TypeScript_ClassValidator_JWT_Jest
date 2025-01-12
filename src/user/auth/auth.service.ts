import { ConflictException, HttpException, Injectable } from '@nestjs/common'
import { PrismaService } from './../../prisma/prisma.service'
import { signInDto, signUpDto } from './../dtos/auth.dto'
import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'
import { UserType } from '@prisma/client'

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}

  private generateToken(name: string, id: number) {
    return jwt.sign({ name, id }, process.env.JSON_TOKEN_KEY, {
      expiresIn: 360000,
    })
  }

  generateProductKey(email: string, userType: string) {
    const string = `${email}-${userType}-${process.env.PRODUCT_KEY_SECRET}`
    return bcrypt.hash(string, 10)
  }

  async signUp(body: signUpDto, userType: UserType) {
    const userExists = await this.prismaService.user.findUnique({
      where: { email: body.email },
    })

    if (userExists) throw new ConflictException()

    const hashedPassword = await bcrypt.hash(body.password, 10)
    const user = await this.prismaService.user.create({
      data: {
        ...body,
        password: hashedPassword,
        user_type: userType,
      },
    })
    return this.generateToken(user.name, user.id)
  }

  async signIn(body: signInDto) {
    const user = await this.prismaService.user.findUnique({
      where: { email: body.email },
    })

    if (!user) throw new HttpException('Invalid Credentials', 400)

    const isValidPassword = await bcrypt.compare(body.password, user.password)
    if (!isValidPassword) throw new HttpException('Invalid Credentials', 400)

    return this.generateToken(user.name, user.id)
  }
}
