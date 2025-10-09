import { fetchWeatherApi } from "openmeteo";

const WEATHER_URL = "https://api.open-meteo.com/v1/forecast";
const GEO_URL = "https://geocoding-api.open-meteo.com/v1/search";

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface CurrentWeather {
  time: Date;
  temperature_2m: number;
  relative_humidity_2m: number;
  apparent_temperature: number;
  weather_code: number;
  wind_speed_10m: number;
}

export interface HourlyWeather {
  time: Date[];
  temperature_2m: number[];
}

export interface DailyWeather {
  time: Date[];
  weather_code: number[];
  temperature_2m_min: number[];
  temperature_2m_max: number[];
}

export interface WeatherData {
  current: CurrentWeather;
  hourly: HourlyWeather;
  daily: DailyWeather;
}

/**
 * Get coordinates for a city name
 */
async function getCoordByCity(cityName: string): Promise<Coordinates> {
  const url = `${GEO_URL}?name=${encodeURIComponent(cityName)}&count=1`;
  const response = await fetch(url);
  const data = await response.json();

  if (!data.results || data.results.length === 0) {
    throw new Error(`No results found for the given city name: ${cityName}`);
  }

  const { latitude, longitude } = data.results[0];
  return { latitude, longitude };
}

/**
 * Fetch weather data for a given city
 */
export default async function getWeatherByCity(
  cityName: string
): Promise<WeatherData> {
  try {
    const { latitude, longitude } = await getCoordByCity(cityName);

    const params = {
      latitude,
      longitude,
      current: [
        "temperature_2m",
        "relative_humidity_2m",
        "apparent_temperature",
        "weather_code",
        "wind_speed_10m",
      ],
      daily: ["weather_code", "temperature_2m_min", "temperature_2m_max"],
      hourly: "temperature_2m",
      timezone: "auto",
    };

    const responses = await fetchWeatherApi(WEATHER_URL, params);
    const response = responses[0];

    const utcOffsetSeconds = Number(response.utcOffsetSeconds());
    const current = response.current()!;
    const hourly = response.hourly()!;
    const daily = response.daily()!;

    // Convert everything to numbers so TypeScript is happy
    const currentTime = Number(current.time());

    const hourlyStart = Number(hourly.time());
    const hourlyEnd = Number(hourly.timeEnd());
    const hourlyInterval = Number(hourly.interval());

    const dailyStart = Number(daily.time());
    const dailyEnd = Number(daily.timeEnd());
    const dailyInterval = Number(daily.interval());

    const weatherData: WeatherData = {
      current: {
        time: new Date((currentTime + utcOffsetSeconds) * 1000),
        temperature_2m: current.variables(0)!.value(),
        relative_humidity_2m: current.variables(1)!.value(),
        apparent_temperature: current.variables(2)!.value(),
        weather_code: current.variables(3)!.value(),
        wind_speed_10m: current.variables(4)!.value(),
      },
      hourly: {
        time: Array.from(
          { length: (hourlyEnd - hourlyStart) / hourlyInterval },
          (_, i) =>
            new Date(
              (hourlyStart + i * hourlyInterval + utcOffsetSeconds) * 1000
            )
        ).slice(0, 24),
        temperature_2m: [...(hourly.variables(0)!.valuesArray() || [])].slice(
          0,
          24
        ),
      },
      daily: {
        time: Array.from(
          { length: (dailyEnd - dailyStart) / dailyInterval },
          (_, i) =>
            new Date((dailyStart + i * dailyInterval + utcOffsetSeconds) * 1000)
        ),
        weather_code: [...(daily.variables(0)!.valuesArray() || [])],
        temperature_2m_min: [...(daily.variables(1)!.valuesArray() || [])],
        temperature_2m_max: [...(daily.variables(2)!.valuesArray() || [])],
      },
    };
    return weatherData;
  } catch (err: unknown) {
    console.error("Error fetching weather data:", err);
    throw err;
  }
}
