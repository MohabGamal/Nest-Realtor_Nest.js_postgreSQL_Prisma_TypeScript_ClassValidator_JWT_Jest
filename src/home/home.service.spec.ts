import { Test, TestingModule } from '@nestjs/testing'
import { PrismaService } from 'src/prisma/prisma.service'
import { HomeService } from './home.service'
import { PropertyType } from '@prisma/client'

const mockGetHomes = [
  {
    id: 1,
    address: 'test',
    city: 'test',
    price: 1,
    Property_type: PropertyType.RESIDENTIAL,
    image: 'test1',
    number_of_bathrooms: 1,
    number_of_bedrooms: 1,
    land_size: 1,
    images: [
      {
        url: 'test1',
      },
    ],
  },
]

const mockGetHome = {
  id: 1,
  address: 'test',
  city: 'test',
  price: 1,
  Property_type: PropertyType.RESIDENTIAL,
  image: 'test1',
  land_size: 1,
  number_of_bathrooms: 1,
  number_of_bedrooms: 1,
  realtor_id: 1,
}

const mockImages = [
  {
    id: 1,
    url: 'test1',
  },
  {
    id: 2,
    url: 'test2',
  },
]

describe('HomeService', () => {
  let service: HomeService
  let prismaService: PrismaService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HomeService,
        {
          provide: PrismaService,
          useValue: {
            home: {
              findMany: jest.fn().mockResolvedValue(mockGetHomes),
              create: jest.fn().mockResolvedValue(mockGetHome),
              findUnique: jest.fn().mockResolvedValue({}),
              update: jest.fn().mockResolvedValue({}),
              delete: jest.fn().mockResolvedValue({}),
              deleteMany: jest.fn().mockResolvedValue({}),
            },
            image: {
              createMany: jest.fn().mockResolvedValue(mockImages),
            },
          },
        },
      ],
    }).compile()

    service = module.get<HomeService>(HomeService)
    prismaService = module.get<PrismaService>(PrismaService)
  })

  it('services should be defined', () => {
    expect(service).toBeDefined()
    expect(prismaService).toBeDefined()
  })

  describe('getHomes', () => {
    const homeQuery = {
      city: 'test',
      minPrice: '0',
      maxPrice: '10000000',
      property_type: PropertyType.RESIDENTIAL,
    }

    it('should call prismaService.home.findMany with correct params', async () => {
      const { city, minPrice, maxPrice, property_type } = homeQuery

      const mockPrismaFindManyHomes = jest.fn().mockResolvedValue(mockGetHomes)
      jest
        .spyOn(prismaService.home, 'findMany')
        .mockImplementation(mockPrismaFindManyHomes)

      await service.getHomes(homeQuery)
      expect(mockPrismaFindManyHomes).toHaveBeenCalledWith({
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
    })

    it('should throw not found exception', async () => {
      jest
        .spyOn(prismaService.home, 'findMany')
        .mockResolvedValueOnce(undefined)

      await expect(service.getHomes(homeQuery)).rejects.toThrow(
        'No homes found',
      )
    })
  })

  describe('create home', () => {
    const mockCreateHomeBody = {
      address: 'test',
      city: 'test',
      price: 1,
      property_type: PropertyType.RESIDENTIAL,
      number_of_bathrooms: 1,
      number_of_bedrooms: 1,
      land_size: 1,
      images: [
        {
          url: 'test1',
        },
      ],
    }
    it('should call prismaService.home.create with correct params', async () => {
      const mockPrismaCreateHome = jest.fn().mockResolvedValue(mockGetHome)
      jest
        .spyOn(prismaService.home, 'create')
        .mockImplementation(mockPrismaCreateHome)

      await service.createHome(mockCreateHomeBody, 1)
      expect(mockPrismaCreateHome).toHaveBeenCalledWith({
        data: mockGetHome,
      })
     })
  })

})


