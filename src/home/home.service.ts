import { Injectable, NotFoundException } from '@nestjs/common'
import { IJWTPayload } from 'src/user/decorators/user.decorators'
import { PrismaService } from './../prisma/prisma.service'
import {
  HomeRequestQueryDto,
  HomeResponseDto,
  HomeCreateDto,
  HomeUpdateDto,
  InquireDto,
} from './dto/home.dto'

@Injectable()
export class HomeService {
  constructor(private readonly prismaService: PrismaService) {}

  async getRealtorByHomeId(id: number) {
    const home = await this.prismaService.home.findUnique({
      where: { id },
      select: {
        realtor: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
      },
    })
    if (!home) {
      throw new NotFoundException('Home not found')
    }
    return home.realtor
  }

  async getHomes(query: HomeRequestQueryDto): Promise<HomeResponseDto[]> {
    const { city, minPrice, maxPrice, property_type } = query

    const homes = await this.prismaService.home.findMany({
      select: {
        id: true,
        address: true,
        city: true,
        price: true,
        property_type: true,
        number_of_bathrooms: true,
        number_of_bedrooms: true,
        images: {
          select: {
            url: true,
          },
          take: 1,
        },
      },
      where: {
        city,
        property_type,
        price: {
          gte: minPrice && parseFloat(minPrice),
          lte: maxPrice && parseFloat(maxPrice),
        },
      },
    })

    if (!homes) {
      throw new NotFoundException('No homes found')
    }

    return homes.map((home) => {
      const fetchHome = { ...home, image: home.images[0].url }
      delete fetchHome.images
      return new HomeResponseDto(fetchHome)
    })
  }

  async getHomeById(id: number) {
    const home = await this.prismaService.home.findUnique({
      where: { id },
    })
    if (!home) {
      throw new NotFoundException('Home not found')
    }
    return new HomeResponseDto(home)
  }

  async createHome(body: HomeCreateDto, userId: number) {
    const { images, ...others } = body

    const createdHome = await this.prismaService.home.create({
      data: { ...others, realtor_id: userId },
    })

    // there is a better way in Prisma to do this (without making multiple queries)
    await this.prismaService.image.createMany({
      data: images.map((image) => ({
        ...image,
        home_id: createdHome.id,
      })),
    })
    return new HomeResponseDto(createdHome)
  }

  async updateHomeById(id: number, body: HomeUpdateDto) {
    const home = await this.prismaService.home.update({
      where: { id },
      data: { ...body },
    })

    return new HomeResponseDto(home)
  }

  async deleteHomeById(id: number) {
    await this.prismaService.home.delete({
      where: { id },
    })
  }

  async inquire(user: IJWTPayload, homeId: number, body: InquireDto) {
    const realtor = await this.getRealtorByHomeId(homeId)
    return await this.prismaService.message.create({
      data: {
        realtor_id: realtor.id,
        buyer_id: user.id,
        home_id: homeId,
        message: body.message,
      },
    })
  }

  async getMessagesByHome(homeId: number) {
    return await this.prismaService.message.findMany({
      where: { home_id: homeId },
      select: {
        message: true,
        buyer: {
          select: {
            name: true,
            email: true,
            phone: true,
          },
        },
      },
    })
  }
}
