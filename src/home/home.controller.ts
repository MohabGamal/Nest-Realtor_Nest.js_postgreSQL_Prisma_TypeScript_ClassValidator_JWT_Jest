import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common'
import { HomeService } from './home.service'
import {
  HomeRequestQueryDto,
  HomeResponseDto,
  HomeCreateDto,
  InquireDto,
} from './dto/home.dto'
import { PropertyType } from '@prisma/client'
import { User } from 'src/user/decorators/user.decorators'
import { IJWTPayload } from './../user/decorators/user.decorators'
import { AuthGuard } from './../guards/auth.guard'
import { Roles } from 'src/decorators/roles.decorator'
import { UserType } from '@prisma/client'

export interface IHomesQuery {
  city?: string
  minPrice?: string
  maxPrice?: string
  property_type?: PropertyType
}

@Controller('home')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @Get()
  getHomes(@Query() query: HomeRequestQueryDto): Promise<HomeResponseDto[]> {
    return this.homeService.getHomes(query)
  }

  @Get(':id')
  getHome(@Param('id', new ParseIntPipe()) id: number) {
    return this.homeService.getHomeById(id)
  }

  @Roles(UserType.REALTOR, UserType.ADMIN)
  @UseGuards(AuthGuard)
  @Post()
  createHome(@Body() body: HomeCreateDto, @User() user: IJWTPayload) {
    return this.homeService.createHome(body, user.id)
  }

  @Roles(UserType.REALTOR, UserType.ADMIN)
  @UseGuards(AuthGuard)
  @Put(':id')
  async updateHome(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() body: HomeCreateDto,
    @User() user: IJWTPayload,
  ) {
    const realtor = await this.homeService.getRealtorByHomeId(id)
    if (realtor.id !== user.id) {
      throw new UnauthorizedException()
    }
    return this.homeService.updateHomeById(id, body)
  }

  @Roles(UserType.REALTOR, UserType.ADMIN)
  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteHome(
    @Param('id', new ParseIntPipe()) id: number,
    @User() user: IJWTPayload,
  ) {
    const realtor = await this.homeService.getRealtorByHomeId(id)
    if (realtor.id !== user.id) {
      throw new UnauthorizedException()
    }
    return this.homeService.deleteHomeById(id)
  }

  @Roles(UserType.BUYER)
  @UseGuards(AuthGuard)
  @Post('inquire/:id')
  inquireHome(
    @Param('id', new ParseIntPipe()) homeId: number,
    @User() user: IJWTPayload,
    @Body() body: InquireDto,
  ) {
    return this.homeService.inquire(user, homeId, body)
  }

  @Roles(UserType.REALTOR)
  @UseGuards(AuthGuard)
  @Get('messages/:id')
  async getHomeMessages(
    @Param('id', new ParseIntPipe()) homeId: number,
    @User() user: IJWTPayload,
  ) {
    const realtor = await this.homeService.getRealtorByHomeId(homeId)
    if (realtor.id !== user.id) {
      throw new UnauthorizedException()
    }
    return this.homeService.getMessagesByHome(homeId)
  }
}
