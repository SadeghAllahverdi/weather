import { LiquidGlass as NormalGlass } from "@liquidglass/react";
import type { WeatherData } from "../assets/api/WeatherApi";
import {
  icons,
  getBeaufortIcon,
  getWeatherIcon,
  getWeatherDescription,
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
          <div className="px-8 py-4 text-black text-lg dark:text-white text-shadow-[0_10px_20px_rgba(0,0,0,0.19),0_6px_6px_rgba(0,0,0,0.23)]">Loading...</div>
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
        <div className="col-span-3 row-span-2 flex flex-col items-center justify-center">
          <div className="w-full flex items-center justify-center">
            <p className="text-6xl mb:text-7xl">
              {info.temperature_2m.toFixed(1)}°
            </p>
          </div>
          <div className="w-full flex items-center justify-center">
            <p className="text-sm">
              Feels like {info.apparent_temperature.toFixed(1)}°C
            </p>
          </div>
          <div className="w-full flex items-center justify-center">
            <p className="text-sm">
              {getWeatherDescription(info.weather_code)}
            </p>
          </div>
        </div>

        <div className="col-span-3 row-span-2 flex flex-col items-center justify-center">
          <figure className="flex flex-col items-center justify-center">
            <img
              src={getWeatherIcon(info.is_day, info.weather_code)}
              alt="weather icon"
              className="w-full h-full"
            />
          </figure>
        </div>

        <div
          className="col-span-2 row-span-1 flex flex-row
               bg-white rounded-2xl shadow-[0_10px_20px_rgba(0,0,0,0.19),0_6px_6px_rgba(0,0,0,0.23)]"
        >
          <div className="w-1/2 h-full flex items-center justify-center">
            <p className="text-black text-sm">{info.relative_humidity_2m}%</p>
          </div>
          <div className="w-1/2 h-full flex items-center justify-center">
            <img src={icons.metric.humidity} alt="humidity icon" />
          </div>
        </div>

        <div
          className="col-span-2 row-span-1 flex items-center justify-center
               bg-white rounded-2xl shadow-[0_10px_20px_rgba(0,0,0,0.19),0_6px_6px_rgba(0,0,0,0.23)]"
        >
          <div className="w-1/2 h-full flex items-center justify-center">
            <p className="text-black text-sm">
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
          className="col-span-2 row-span-1 flex items-center justify-center
               bg-white rounded-2xl shadow-[0_10px_20px_rgba(0,0,0,0.19),0_6px_6px_rgba(0,0,0,0.23)]"
        >
          <div className="w-1/2 h-full flex items-center justify-center">
            <p className="text-black text-sm">
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
