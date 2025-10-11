import { LiquidGlass as NomalGlass } from "@liquidglass/react";
import type { WeatherData } from "../assets/api/WeatherApi";
import { icons, getBeaufortIcon, getWeatherIcon } from "../assets/api/Icons";

// Defining Data type
interface CurrentWeather {
  info?: WeatherData["current"];
}

export default function CurrentWeather(weather: Readonly<CurrentWeather>) {
  const { info } = weather;
  if (!info) {
    return (
      <NomalGlass
        borderRadius={20}
        blur={2}
        contrast={1.15}
        brightness={1}
        saturation={1.1}
        elasticity={0.3}
      >
        <div className="px-8 py-4">
          <img src={icons.metric.notAvailable} alt="not available icon" />
        </div>
      </NomalGlass>
    );
  }
  return (
    <NomalGlass
      borderRadius={20}
      blur={2}
      contrast={1.15}
      brightness={1}
      saturation={1.1}
      elasticity={0.3}
    >
      <div className="w-full h-full grid grid-cols-4 grid-rows-2 gap-1 p-2 md:grid-cols-7 font-[Roboto_Serif]">
        <div className="col-span-3 row-span-1 md:col-span-5">
          <p>{info.temperature_2m.toFixed(1)}°</p>
          <p>Feels like {info.apparent_temperature.toFixed(1)}°C</p>
        </div>

        <div className="col-span-1 row-span-1 md:col-span-2 flex flex-col md:flex-row">
          <p className="w-full h-1/2 md:w-1/2 md:h-full">
            {info.relative_humidity_2m}%
          </p>
          <img
            src={icons.metric.humidity}
            alt="wind icon"
            className="w-full h-1/2 md:w-1/2 md:h-full bg-cyan-400 rounded-2xl opacity-60"
          />
        </div>

        <div className="col-span-1 row-span-1  md:col-span-2 flex flex-col md:flex-row">
          <p className="w-full h-1/2 md:w-1/2 md:h-full">
            {info.wind_speed_10m.toFixed(1)} Km/h
          </p>
          <img
            src={getBeaufortIcon(info.wind_speed_10m)}
            alt="wind icon"
            className="w-full h-1/2 md:w-1/2 md:h-full bg-cyan-400 rounded-2xl opacity-60"
          />
        </div>

        <div className="col-span-3 row-span-1 md:col-span-5">
          <img
            src={getWeatherIcon(info.is_day, info.weather_code)}
            alt="weather icon"
            className="w-full h-full"
          />
        </div>
      </div>
    </NomalGlass>
  );
}
