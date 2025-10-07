import { LiquidGlass as NomalGlass } from "@liquidglass/react";

export default function HourlyWeather() {
  return (
    <NomalGlass
      borderRadius={20}
      blur={1.8}
      contrast={1.15}
      brightness={1}
      saturation={1.1}
      elasticity={0.3}
    >
      <div className="px-8 py-4 text-white text-lg">Hourly forecast info</div>
    </NomalGlass>
  );
}
