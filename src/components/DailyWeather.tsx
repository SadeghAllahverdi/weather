import { LiquidGlass as NomalGlass } from "@liquidglass/react";
import type { DailyWeather } from "../assets/api/WeatherApi";

interface DailyWeatherProps {
  data?: DailyWeather;
}

export default function DailyWeather({ data }: DailyWeatherProps) {
  if (!data) {
    return (
      <NomalGlass
        borderRadius={20}
        blur={2}
        contrast={1.15}
        brightness={1}
        saturation={1.1}
        elasticity={0.3}
      >
        <div className="px-8 py-4 text-white text-lg">Loading...</div>
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
        <h2 className="text-2xl font-bold mb-2">Current Weather</h2>
        <p>Time: {JSON.stringify(data.time)}</p>
        <p>Weather Code: {JSON.stringify(data.weather_code)}</p>
        <p>Tempreture min: {JSON.stringify(data.temperature_2m_min)}%</p>
        <p>Tempreture max: {JSON.stringify(data.temperature_2m_max)} m/s</p>
      </div>
    </NomalGlass>
  );
}
