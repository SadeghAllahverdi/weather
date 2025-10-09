import { LiquidGlass as NomalGlass } from "@liquidglass/react";
import type { HourlyWeather } from "../assets/api/WeatherApi";

interface HourlyWeatherProps {
  data?: HourlyWeather;
}

export default function HourlyWeather({ data }: HourlyWeatherProps) {
  if (!data) {
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
        <h2 className="text-2xl font-bold mb-2">Current Weather</h2>
        <p>Time: {JSON.stringify(data.time)}</p>
        <p>Tempreture: {JSON.stringify(data.temperature_2m)} m/s</p>
      </div>
    </NomalGlass>
  );
}
