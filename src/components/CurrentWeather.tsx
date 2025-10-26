import { LiquidGlass as NormalGlass } from "@liquidglass/react";
import type { WeatherData } from "../assets/api/WeatherApi";
import {
  icons,
  getBeaufortIcon,
  getWeatherIcon,
  getWeatherDescription,
  getDewPoint,
} from "../assets/api/Icons";

// Defining Data type
interface CurrentWeather {
  info?: WeatherData["current"];
}

export default function CurrentWeather(weather: Readonly<CurrentWeather>) {
  const { info } = weather;
  if (!info) {
    return (
      <NormalGlass
        borderRadius={20}
        blur={2}
        contrast={1.15}
        brightness={1.05}
        saturation={1.1}
        elasticity={0.3}
      >
        <div className="px-8 py-4">
          <div className="px-8 py-4 text-black text-lg dark:text-white text-shadow-[0_10px_20px_rgba(0,0,0,0.19),0_6px_6px_rgba(0,0,0,0.23)]">
            Loading...
          </div>
        </div>
      </NormalGlass>
    );
  }
  return (
    <NormalGlass
      borderRadius={20}
      blur={4}
      contrast={1.1}
      brightness={1.05}
      saturation={1.8}
      elasticity={0.3}
    >
      <div
        className="w-full h-full grid grid-cols-6 grid-rows-3 gap-2 p-2
             text-white text-shadow-[0_10px_20px_rgba(0,0,0,0.19),0_6px_6px_rgba(0,0,0,0.23)]"
      >
        <div
          className="col-span-3 row-span-2 flex flex-col items-center justify-center
                        hover:scale-115 transition duration-500 ease-in-out"
        >
          <div className="w-full flex items-center justify-center">
            <p className="text-3xl sm:text-5xl mb:text-6xl">
              {info.temperature_2m.toFixed(1)} °C
            </p>
          </div>
          <div className="w-full flex items-center justify-center">
            <p className="text-sm text-wrap text-center">
              Feels like {info.apparent_temperature.toFixed(1)}°C
            </p>
          </div>
          <div className="w-full flex items-center justify-center">
            <p className="text-sm text-wrap text-center">
              {getWeatherDescription(info.weather_code)}
            </p>
          </div>
        </div>

        <div
          className="col-span-3 row-span-2 flex flex-col items-center justify-center
                        hover:scale-115 transition duration-500 ease-in-out"
        >
          <figure className="flex flex-col items-center justify-center">
            <img
              src={getWeatherIcon(info.is_day, info.weather_code)}
              alt="weather icon"
              className="w-full h-full"
            />
          </figure>
        </div>

        <div
          className="col-span-2 row-span-1 flex flex-col items-center justify-center sm:flex-row rounded-bl-2xl
               bg-white text-black dark:bg-gray-800 dark:text-white shadow-[0_10px_20px_rgba(0,0,0,0.19),0_6px_6px_rgba(0,0,0,0.23)]"
        >
          <div className="w-1/2 h-full flex items-center justify-center">
            <p className="text-black dark:text-white text-sm">
              {getDewPoint(
                info.temperature_2m,
                info.relative_humidity_2m
              ).toFixed(2)}
              °C
            </p>
          </div>
          <div className="w-1/2 h-full flex items-center justify-center">
            <img src={icons.metric.humidity} alt="humidity icon" />
          </div>
        </div>

        <div
          className="col-span-2 row-span-1 flex flex-col items-center justify-center sm:flex-row
               bg-white dark:bg-gray-800 shadow-[0_10px_20px_rgba(0,0,0,0.19),0_6px_6px_rgba(0,0,0,0.23)]"
        >
          <div className="w-1/2 h-full flex items-center justify-center">
            <p className="text-black dark:text-white text-sm">
              {info.wind_speed_10m.toFixed(1)}
              <br />
              km/h
            </p>
          </div>
          <div className="w-1/2 h-full flex items-center justify-center">
            <img src={getBeaufortIcon(info.wind_speed_10m)} alt="wind icon" />
          </div>
        </div>

        <div
          className="col-span-2 row-span-1 flex flex-col items-center justify-center sm:flex-row rounded-br-2xl
                   bg-white dark:bg-gray-800 shadow-[0_10px_20px_rgba(0,0,0,0.19),0_6px_6px_rgba(0,0,0,0.23)]"
        >
          <div className="w-1/2 h-full flex items-center justify-center">
            <p className="text-black dark:text-white text-sm">
              {info.pressure_msl.toFixed(1)}
              <br />
              hPa
            </p>
          </div>
          <div className="w-1/2 h-full flex items-center justify-center">
            <img src={icons.metric.barometer} alt="pressure icon" />
          </div>
        </div>
      </div>
    </NormalGlass>
  );
}
