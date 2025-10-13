// prettier-ignore
import { LiquidGlass as NormalGlass } from "@liquidglass/react";
import type { WeatherData } from "../assets/api/WeatherApi";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

interface HourlyWeather {
  info?: WeatherData["hourly"];
}
export default function HourlyWeather(weather: Readonly<HourlyWeather>) {
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
        <div className="px-8 py-4 text-dark text-lg dark:text-white
        text-shadow-[0_10px_20px_rgba(0,0,0,0.19),0_6px_6px_rgba(0,0,0,0.23)]">Loading...</div>
      </NormalGlass>
    );
  }
  const maxTemperature_2m = Math.round(Math.max(...info.temperature_2m) + 1);
  const minTemperature_2m = Math.round(Math.min(...info.temperature_2m) - 1);
  const max_Humidity = Math.round(Math.max(...info.relative_humidity_2m));
  const min_Humidity = Math.round(Math.min(...info.relative_humidity_2m));
  const data = {
    labels: info.time.map((t) =>
      new Date(t).toLocaleString("de-DE", {
        hour: "2-digit",
        minute: "2-digit",
      })
    ),
    datasets: [
      {
        label: "temperature (°C)",
        data: info.temperature_2m,
        borderColor: "#E52B50",
        borderWidth: 3,
        pointRadius: 2,
        pointHoverBackgroundColor: "rgba(0, 0, 0, 0)",
        tension: 0.4,
        fill: false,
        yAxisID: "temp",
      },
      {
        label: "humidity (%)",
        data: info.relative_humidity_2m,
        borderColor: "#0CAFFF",
        borderWidth: 3,
        pointRadius: 2,
        pointHoverBackgroundColor: "#B9D9EB",
        tension: 0.4,
        fill: false,
        yAxisID: "humid",
      },
    ],
  };
  const options = {
    plugins: {
      legend: {
        display: true,
        labels: { color: "#E52B50", borderRadius: 4 },
      },
    },
    scales: {
      temp: {
        min: minTemperature_2m,
        max: maxTemperature_2m,
        ticks: { color: "rgba(255, 0, 0, 1)" },
      },
      humid: {
        min: min_Humidity,
        max: max_Humidity,
        ticks: { color: "rgba(0, 4, 255, 1)" },
      },
      x: {
        ticks: { color: "rgba(0, 0, 0, 1)" },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <NormalGlass
      borderRadius={20}
      blur={2}
      contrast={1.15}
      brightness={1}
      saturation={1.1}
      elasticity={0.3}
    >
      <div className="w-full h-full p-2">
        {/* <Line data={data} options={options} /> */}
        <Line data={data} options={options} />
      </div>
    </NormalGlass>
  );
}
