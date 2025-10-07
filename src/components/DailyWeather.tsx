import { LiquidGlass as NomalGlass } from "@liquidglass/react";

export default function DailyWeather() {
  return (
    <NomalGlass
      borderRadius={20}
      blur={2}
      contrast={1.15}
      brightness={1}
      saturation={1.1}
      elasticity={0.3}
    >
      <div className="px-8 py-4 text-white text-lg">Daily forecast info</div>
    </NomalGlass>
  );
}
