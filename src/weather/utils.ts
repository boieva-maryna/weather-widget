export function convertDegreeToCompassPoint(wind_deg: number): string {
  const compassPoints = [
    'North',
    'North North East',
    'North East',
    'East North East',
    'East',
    'East South East',
    'South East',
    'South South East',
    'South',
    'South South West',
    'South West',
    'West South West',
    'West',
    'West North West',
    'North West',
    'North North West',
  ];
  const rawPosition = Math.floor(wind_deg / 22.5 + 0.5);
  const arrayPosition = rawPosition % 16;
  return compassPoints[arrayPosition];
}
