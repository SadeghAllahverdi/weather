import { LiquidGlass as NomalGlass } from "@liquidglass/react";
import type { WeatherData } from "../assets/api/WeatherApi";

interface HourlyWeather {
  info?: WeatherData["hourly"];
}

export default function HourlyWeather(weather: HourlyWeather) {
  const { info } = weather;
  if (!info) {
    return (
      <NomalGlass
        borderRadius={20}
        blur={1.8}
        contrast={1.15}
        brightness={1}
        saturation={1.1}
        elasticity={0.3}
      >
        <div className="px-8 py-4 text-white text-lg">Loading ...</div>
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
      <div className="text-black text-center">
        <h2 className="text-2xl font-bold mb-2">Hourly Weather</h2>
        <p>Time: {JSON.stringify(info.time)}</p>
        <p>Tempreture: {JSON.stringify(info.temperature_2m)} m/s</p>
      </div>
    </NomalGlass>
  );
}
