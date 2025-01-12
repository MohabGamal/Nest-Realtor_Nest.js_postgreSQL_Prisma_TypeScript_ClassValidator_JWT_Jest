import { Test, TestingModule } from '@nestjs/testing'
import { HomeController } from './home.controller'
import { HomeService } from './home.service'
import { PrismaService } from './../prisma/prisma.service'
describe('HomeController', () => {
  let controller: HomeController
  let prismaService: PrismaService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HomeController],
      providers: [
        {
          provide: HomeService,
          useValue: {
            getHomes: jest.fn().mockResolvedValue([]),
          },
        },
        PrismaService,
      ],
    }).compile()
    controller = module.get<HomeController>(HomeController)
    prismaService = module.get<PrismaService>(PrismaService)
  })

  describe('getHomes', async () => {
    it('should construct filter object correctly', async () => {
      const mockGetHomes = jest.fn().mockResolvedValue([])
      jest.spyOn(HomeService, 'getHomes').mockImplementation(mockGetHomes)
      await controller.getHomes('test', '1500')

      expect(mockGetHomes).toHaveBeenCalledWith({
        city: 'test',
        minPrice: '1500',
      })
    })
  })
})
