export type Weather = {
  city: string;
  main: string;
  temp: number;
  humidity: number;
  wind: {
    speed: number;
    direction: string;
  };
};
