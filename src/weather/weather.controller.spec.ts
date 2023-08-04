import { Test, TestingModule } from '@nestjs/testing';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';
import { BadRequestException } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { Weather } from './types';

describe('WeatherController', () => {
  let controller: WeatherController;
  let service: WeatherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WeatherController],
      providers: [WeatherService],
      imports: [HttpModule, ConfigModule],
    }).compile();

    controller = module.get<WeatherController>(WeatherController);
    service = module.get<WeatherService>(WeatherService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getByCity', () => {
    it('should return BadRequest if no "city"', async () => {
      expect(controller.getByCity({ city: '' })).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should call service.getByCity', async () => {
      const result: Weather = {
        city: 'Kharkiv',
        temp: 20,
        wind: { speed: 15, direction: 'North' },
        main: 'Rain',
        humidity: 50,
      };
      jest
        .spyOn(service, 'getByCity')
        .mockImplementation(() => Promise.resolve(result));

      expect(await controller.getByCity({ city: 'kharkiv' })).toBe(result);
    });
  });
});
