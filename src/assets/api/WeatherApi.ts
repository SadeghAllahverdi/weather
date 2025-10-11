import { fetchWeatherApi } from "openmeteo";

// Defining Constants
const WEATHER_URL = "https://api.open-meteo.com/v1/forecast";
const GEO_URL = "https://geocoding-api.open-meteo.com/v1/search";

// Defining Data types
//Coordinate
export interface Coordinates {
  latitude: number;
  longitude: number;
}

//Weather Data
export interface WeatherData {
  current: {
    time: Date;
    is_day: number;
    weather_code: number;
    temperature_2m: number;
    apparent_temperature: number;
    relative_humidity_2m: number;
    wind_speed_10m: number;
  };
  hourly: {
    time: Date[];
    temperature_2m: number[];
  };
  daily: {
    time: Date[];
    weather_code: number[];
    temperature_2m_min: number[];
    temperature_2m_max: number[];
  };
}

// Function to get Coordinates from a city name
async function cityToCoord(cityName: string): Promise<Coordinates> {
  try {
    const apiUrl = `${GEO_URL}?name=${cityName}&count=1&language=en&format=json`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const responseJson = await response.json();

    if (!responseJson.results || responseJson.results.length === 0) {
      throw new Error(`City not found ${cityName}`);
    }

    const responseData = responseJson.results[0];
    const coordinates: Coordinates = {
      latitude: responseData.latitude,
      longitude: responseData.longitude,
    };
    return coordinates;
  } catch (err: unknown) {
    console.error("Error fetching coordinates:", err);
    throw err;
  }
}

// prettier-ignore
// Function to get Weather data from the coordinate
export default async function getWeather( cityName: string): Promise<WeatherData> {
  try {
    const coordinates = await cityToCoord(cityName);
    const params = {
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
      current: ["is_day", "weather_code", "temperature_2m", "apparent_temperature", "relative_humidity_2m", "wind_speed_10m"],
      daily: ["weather_code", "temperature_2m_min", "temperature_2m_max"],
      hourly: "temperature_2m",
      timezone: "auto",
    };
    const response = await fetchWeatherApi(WEATHER_URL, params);
    const responseData = response[0];
    // for timezone
    const utcOffsetSeconds = responseData.utcOffsetSeconds();

    const daily = responseData.daily();
    const hourly = responseData.hourly();
    const curr = responseData.current();

    const weatherData: WeatherData = {
      current: {
        time: new Date((Number(curr!.time()) + utcOffsetSeconds) * 1000),
        is_day: curr!.variables(0)!.value(),
        weather_code: curr!.variables(1)!.value(),
        temperature_2m: curr!.variables(2)!.value(),
        apparent_temperature: curr!.variables(3)!.value(),
        relative_humidity_2m: curr!.variables(4)!.value(),
        wind_speed_10m: curr!.variables(5)!.value()
      },
      hourly: {
        time: [...new Array((Number(hourly!.timeEnd()) - Number(hourly!.time())) / hourly!.interval())].map(
			            (_, i) => new Date((Number(hourly!.time()) + i * hourly!.interval() + utcOffsetSeconds) * 1000)
		          ).slice(0, 24),
		    temperature_2m: [...(hourly!.variables(0)?.valuesArray() || [])],
      },
      daily: {
		    time: [...new Array((Number(daily!.timeEnd()) - Number(daily!.time())) / daily!.interval())].map(
			            (_, i) => new Date((Number(daily!.time()) + i * daily!.interval() + utcOffsetSeconds) * 1000)
		          ).slice(0, 7),
		    weather_code: [...(daily!.variables(0)?.valuesArray() || [])],
		    temperature_2m_max: [...(daily!.variables(1)!.valuesArray() || [])],
		    temperature_2m_min: [...(daily!.variables(2)!.valuesArray() || [])],
	    },
    }

    return weatherData;

  } catch (err: unknown) {
    console.error("Error fetching weather data:", err);
    throw err;
  }
}
