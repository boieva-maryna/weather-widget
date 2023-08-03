import {
  BadRequestException,
  Controller,
  Get,
  InternalServerErrorException,
  Query,
} from '@nestjs/common';
import { WeatherService } from './weather.service';
import { GetWeatherQuery } from './dto';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get()
  async getByCity(@Query() query: GetWeatherQuery) {
    const { city } = query;

    if (!city) {
      throw new BadRequestException('"city" parameter is required');
    }

    try {
      const weather = await this.weatherService.getByCity({ city });
      return weather;
    } catch {
      throw new InternalServerErrorException();
    }
  }
}
