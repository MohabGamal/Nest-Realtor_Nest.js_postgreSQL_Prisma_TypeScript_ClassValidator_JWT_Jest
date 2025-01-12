import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Matches, MinLength } from 'class-validator'
import { UserType } from '@prisma/client';

export class signUpDto {
  @IsString()
  @IsNotEmpty()
  name: string
  @Matches(/^[0-9]{10}$/, {message: 'not a vaild phone number'}) // 10 digit number
  phone: string
  @IsEmail()
  email: string
  @IsString()
  @MinLength(5)
  password: string
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  productKey?: string
}

export class signInDto {
  @IsEmail()
  email: string
  @IsString()
  password: string
}

export class generateProductKeyDto {
  @IsEmail()
  email: string
  @IsEnum(UserType)
  userType: UserType
}