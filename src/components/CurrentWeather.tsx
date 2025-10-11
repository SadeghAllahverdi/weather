import { LiquidGlass as NomalGlass } from "@liquidglass/react";
import type { WeatherData } from "../assets/api/WeatherApi";
import { icons, getBeaufortIcon, getWeatherIcon } from "../assets/api/Icons";

// Defining Data type
interface CurrentWeather {
  info?: WeatherData["current"];
}

export default function CurrentWeather(weather: CurrentWeather) {
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
      <div className="w-full h-full p-4 flex flex-col justify-between font-[Inter] text-gray-900 ">
        <h2 className="text-l text-center">Current Weather</h2>
        <div className="grid grid-cols-2">
          <div className="flex flex-col justify-center">
            <div className="h-2/3 w-full flex items-end bg-green-500 ">
              <p className="text-6xl font-bold">
                {info.temperature_2m.toFixed(1)}°
              </p>
            </div>
            <div className="h-1/3 w-full flex items-end bg-yellow-500">
              <p className="opacity-70">
                Feels like {info.apparent_temperature.toFixed(1)}°C
              </p>
            </div>
          </div>
          <div>
            <img
              src={getWeatherIcon(info.is_day, info.weather_code)}
              alt="weather icon"
              className="bg-red-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-2">
          <div className="">
            <img src={icons.metric.humidity} alt="humidity icon" />
            <p className="opacity-70">{info.relative_humidity_2m}%</p>
          </div>
          <div className="bg-blue-500">
            <img src={getBeaufortIcon(info.wind_speed_10m)} alt="wind icon" />
            <p className="opacity-70">{info.wind_speed_10m.toFixed(1)}Km/h</p>
          </div>
        </div>
      </div>
    </NomalGlass>
  );
}
