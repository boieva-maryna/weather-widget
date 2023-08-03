export type Weather = {
  main: string;
  temp: number;
  humidity: number;
  wind: {
    speed: number;
    direction: string;
  };
};
