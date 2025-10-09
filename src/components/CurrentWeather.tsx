import { LiquidGlass as NomalGlass } from "@liquidglass/react";
import type { CurrentWeather } from "../assets/api/WeatherApi";
import "weather-icons-animated/css/weather-icons-animated.css";
import { weatherMap } from "../assets/lib/WeatherIcon.ts";

interface CurrentWeatherProps {
  data?: CurrentWeather;
}

export default function CurrentWeather({ data }: CurrentWeatherProps) {
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
  const iconClass = getAnimatedWeatherIcon(data.weather_code);

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

        <p>Temperature: {data.temperature_2m.toFixed(1)}°C</p>
        <p>Feels like: {data.apparent_temperature.toFixed(1)}°C</p>
        <span
          className={`${iconClass}`}
          style={{ fontSize: "72px", color: "#1e3a8a" }}
        />
        <p>Humidity: {data.relative_humidity_2m}%</p>
        <p>Wind Speed: {data.wind_speed_10m} m/s</p>
      </div>
    </NomalGlass>
  );
}
