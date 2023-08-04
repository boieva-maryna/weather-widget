import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GetWeatherQuery } from './dto';
import { Weather } from './types';
import { convertDegreeToCompassPoint } from './utils';

@Injectable()
export class WeatherService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async getByCity({ city }: GetWeatherQuery): Promise<Weather> {
    const appId = this.configService.get<string>('OPENWEATHERMAP_API_KEY');
    const response = await this.httpService.axiosRef.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${appId}`,
    );

    const [{ main }] = response.data.weather;
    const { temp, humidity } = response.data.main;
    const { speed, deg } = response.data.wind;
    return {
      main,
      temp,
      humidity,
      wind: {
        speed,
        direction: convertDegreeToCompassPoint(deg),
      },
      city: response.data.name,
    };
  }
}
