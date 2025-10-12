import { LiquidGlass as NomalGlass } from "@liquidglass/react";
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
      blur={4}
      contrast={1.1}
      brightness={1.05}
      saturation={1.8}
      elasticity={0.3}
    >
      <div
        className="w-full h-full grid grid-cols-4 grid-rows-2 gap-3 p-2 md:grid-cols-7
                 text-white text-shadow-[0_10px_20px_rgba(0,0,0,0.19),0_6px_6px_rgba(0,0,0,0.23)]"
      >
        <div className="col-span-3 row-span-1 flex flex-col md:col-span-5">
          <div className="w-full h-4/5 flex items-center justify-center">
            <p className="text-8xl">{info.temperature_2m.toFixed(1)}°</p>
          </div>
          <div className="w-full h-1/5 flex items-center justify-center">
            <p>Feels like {info.apparent_temperature.toFixed(1)}°C</p>
          </div>
        </div>

        <div
          className="col-span-1 row-span-1 md:col-span-2 flex flex-col md:flex-row bg-white rounded-2xl
                        shadow-[0_10px_20px_rgba(0,0,0,0.19),0_6px_6px_rgba(0,0,0,0.23)]"
        >
          <div className="w-full h-1/3 md:w-1/2 flex items-center justify-center md:h-full ">
            <p className="text-black text-4xl">{info.relative_humidity_2m}</p>
          </div>
          <div className="w-full h-2/3 md:w-1/2 flex items-center justify-center md:h-full">
            <img src={icons.metric.humidity} alt="wind icon" />
          </div>
        </div>

        <div
          className="col-span-1 row-span-1  md:col-span-2 flex flex-col p-1 md:flex-row bg-white rounded-2xl
                        shadow-[0_10px_20px_rgba(0,0,0,0.19),0_6px_6px_rgba(0,0,0,0.23)]"
        >
          <div className="w-full h-1/2 md:w-1/2 flex items-center justify-center md:h-full">
            <p className="text-black">{info.wind_speed_10m.toFixed(1)} Km/h</p>
          </div>
          <div className="w-full h-1/2 flex items-center justify-centermd:w-1/2 md:h-full">
            <img
              src={getBeaufortIcon(info.wind_speed_10m)}
              alt="wind icon"
              className="w-full h-full"
            />
          </div>
        </div>

        <div className="col-span-3 row-span-1 flex flex-col pb-4 md:col-span-5 md:flex-row">
          <div className="w-full h-9/10 md:w-7/10 md:h-full">
            <img
              src={getWeatherIcon(info.is_day, info.weather_code)}
              alt="weather icon"
              className="w-full h-full"
            />
          </div>
          <div className="w-full h-1/10 md:w-3/10 md:h-full flex items-center justify-center">
            <p>{getWeatherDescription(info.weather_code)}</p>
          </div>
        </div>
      </div>
    </NomalGlass>
  );
}
