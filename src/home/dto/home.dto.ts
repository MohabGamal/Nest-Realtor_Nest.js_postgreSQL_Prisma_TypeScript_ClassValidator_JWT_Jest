import { PropertyType } from '@prisma/client'
import { Exclude, Expose, Type } from 'class-transformer'
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator'

export class HomeResponseDto {
  constructor(partial: Partial<HomeResponseDto>) {
    Object.assign(this, partial)
  }

  id: number
  address: string
  city: string
  price: number
  image: string

  @Exclude()
  created_at: Date
  @Exclude()
  updated_at: Date
  @Exclude()
  realtor_id: number

  @Exclude()
  property_type: PropertyType
  @Expose({ name: 'propertyType' })
  getPropertyType(): PropertyType {
    return this.property_type
  }

  @Exclude()
  number_of_bedrooms: number
  @Expose({ name: 'numberOfBedrooms' })
  getNumberOfBedrooms(): number {
    return this.number_of_bedrooms
  }
  @Exclude()
  number_of_bathrooms: number
  @Expose({ name: 'numberOfBathrooms' })
  getNumberOfBathrooms(): number {
    return this.number_of_bathrooms
  }
  @Exclude()
  listed_date: Date
  @Expose({ name: 'listedDate' })
  getListedDate(): Date {
    return this.listed_date
  }
  @Exclude()
  land_size: number
  @Expose({ name: 'landSize' })
  getLandSize(): number {
    return this.land_size
  }
}

export class HomeRequestQueryDto {
  @IsOptional()
  @IsString()
  city?: string
  @IsOptional()
  @IsNumberString()
  minPrice?: string
  @IsOptional()
  @IsNumberString()
  maxPrice?: string
  @IsOptional()
  @IsEnum(PropertyType)
  property_type?: PropertyType
}

class Image {
  @IsString()
  @IsNotEmpty()
  url: string
}

export class HomeCreateDto {
  @IsString()
  @IsNotEmpty()
  address: string

  @IsString()
  @IsNotEmpty()
  city: string

  @IsNumber()
  @IsPositive()
  price: number

  @IsEnum(PropertyType)
  property_type: PropertyType

  @IsNumber()
  @IsPositive()
  number_of_bedrooms: number

  @IsNumber()
  @IsPositive()
  number_of_bathrooms: number

  @IsNumber()
  @IsPositive()
  land_size: number

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Image)
  images: Image[]
}

export class HomeUpdateDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  address?: string

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  city?: string

  @IsOptional()
  @IsNumber()
  @IsPositive()
  price?: number

  @IsOptional()
  @IsEnum(PropertyType)
  property_type?: PropertyType

  @IsOptional()
  @IsNumber()
  @IsPositive()
  number_of_bedrooms?: number

  @IsOptional()
  @IsNumber()
  @IsPositive()
  number_of_bathrooms?: number

  @IsOptional()
  @IsNumber()
  @IsPositive()
  land_size?: number

  @IsOptional()
  @IsNumber()
  @IsPositive()
  realtor_id?: number
}

export class InquireDto {
  @IsString()
  @IsNotEmpty()
  message: string
}