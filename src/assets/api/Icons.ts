const ICON_BASE_URL =
  "https://basmilius.github.io/weather-icons/production/fill/all";
const windThresholds = [
  0.3, 1.6, 3.4, 5.5, 8, 10.8, 13.9, 17.2, 20.8, 24.5, 28.5, 32.7,
];
export const icons: {
  wind: Record<number, string>;
  weather: Record<number, string>;
  metric: Record<string, string>;
} = {
  wind: {
    0: `${ICON_BASE_URL}/wind-beaufort-0.svg`,
    1: `${ICON_BASE_URL}/wind-beaufort-1.svg`,
    2: `${ICON_BASE_URL}/wind-beaufort-2.svg`,
    3: `${ICON_BASE_URL}/wind-beaufort-3.svg`,
    4: `${ICON_BASE_URL}/wind-beaufort-4.svg`,
    5: `${ICON_BASE_URL}/wind-beaufort-5.svg`,
    6: `${ICON_BASE_URL}/wind-beaufort-6.svg`,
    7: `${ICON_BASE_URL}/wind-beaufort-7.svg`,
    8: `${ICON_BASE_URL}/wind-beaufort-8.svg`,
    9: `${ICON_BASE_URL}/wind-beaufort-9.svg`,
    10: `${ICON_BASE_URL}/wind-beaufort-10.svg`,
    11: `${ICON_BASE_URL}/wind-beaufort-11.svg`,
    12: `${ICON_BASE_URL}/wind-beaufort-12.svg`,
  },
  weather: {
    0: `${ICON_BASE_URL}/clear-day.svg`,
    1: `${ICON_BASE_URL}/partly-cloudy-day.svg`,
    2: `${ICON_BASE_URL}/partly-cloudy-day.svg`,
    3: `${ICON_BASE_URL}/overcast.svg`,
    45: `${ICON_BASE_URL}/fog-day.svg`,
    48: `${ICON_BASE_URL}/fog-day.svg`,
    51: `${ICON_BASE_URL}/partly-cloudy-day-drizzle.svg`,
    53: `${ICON_BASE_URL}/drizzle.svg`,
    55: `${ICON_BASE_URL}/drizzle.svg`,
    56: `${ICON_BASE_URL}/partly-cloudy-day-sleet.svg`,
    57: `${ICON_BASE_URL}/partly-cloudy-day-sleet.svg`,
    61: `${ICON_BASE_URL}/partly-cloudy-day-rain.svg`,
    63: `${ICON_BASE_URL}/rain.svg`,
    66: `${ICON_BASE_URL}/partly-cloudy-day-sleet.svg`,
    67: `${ICON_BASE_URL}/sleet.svg`,
    71: `${ICON_BASE_URL}/partly-cloudy-day-snow.svg`,
    73: `${ICON_BASE_URL}/snow.svg`,
    75: `${ICON_BASE_URL}/snow.svg`,
    77: `${ICON_BASE_URL}/snow.svg`,
    80: `${ICON_BASE_URL}/partly-cloudy-day-rain.svg`,
    81: `${ICON_BASE_URL}/rain.svg`,
    82: `${ICON_BASE_URL}/rain.svg`,
    85: `${ICON_BASE_URL}/partly-cloudy-day-snow.svg`,
    86: `${ICON_BASE_URL}/snow.svg`,
    95: `${ICON_BASE_URL}/thunderstorms-day.svg`,
    96: `${ICON_BASE_URL}/thunderstorms-day-rain.svg`,
    99: `${ICON_BASE_URL}/thunderstorms-day-snow.svg`,
  },
  metric: {
    compass: `${ICON_BASE_URL}/compass.svg`,
    humidity: `${ICON_BASE_URL}/raindrops.svg`,
    windsock: `${ICON_BASE_URL}/windsock.svg`,
    thermoCold: `${ICON_BASE_URL}/thermometer-colder.svg`,
    thermoWarm: `${ICON_BASE_URL}/thermometer-warmer.svg`,
    barometer: `${ICON_BASE_URL}/barometer.svg`,
    notAvailable: `${ICON_BASE_URL}/not-available.svg`,
  },
};

export function getBeaufortIcon(windSpeed: number): string {
  for (let i = 0; i < windThresholds.length; i++) {
    if (windSpeed < windThresholds[i]) return icons.wind[i];
  }
  return icons.wind[12];
}

export function getWeatherIcon(day: number, wcode: number): string {
  let weatherIcon = icons.weather[wcode] || icons.metric.notAvailable;
  if (day === 0) {
    weatherIcon = weatherIcon.replace("-day", "-night");
  }
  return weatherIcon;
}

export function getWeatherDescription(wcode: number): string {
  const link = icons.weather[wcode]
    .replace(ICON_BASE_URL + "/", "")
    .replace(".svg", "")
    .replace("-day", "");
  const desc = link.split("-");

  return desc.length === 1
    ? desc[0]
    : desc.length === 2
      ? `${desc[0]} and ${desc[1]}`
      : `${desc[0]} and ${desc[1]} with ${desc.slice(2).join(" ")}`;
}

export function getDewPoint(temp: number, humidity: number): number {
  const a = 17.27;
  const b = 237.7;
  const alpha = (a * temp) / (b + temp) + Math.log(humidity / 100);
  return (b * alpha) / (a - alpha);
}
