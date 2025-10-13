// prettier-ignore
import { LiquidGlass as NomalGlass } from "@liquidglass/react";
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
      <NomalGlass
        borderRadius={20}
        blur={2}
        contrast={1.15}
        brightness={1.05}
        saturation={1.1}
        elasticity={0.3}
      >
        <div className="px-8 py-4 text-white text-lg">Loading...</div>
      </NomalGlass>
    );
  }
  const data = {
    labels: info.time.map((t) =>
      new Date(t).toLocaleString("de-DE", {
        hour: "2-digit",
        minute: "2-digit",
      })
    ),
    datasets: [
      {
        label: "",
        data: info.temperature_2m,
        borderColor: "#E52B50",
        borderWidth: 3,
        pointRadius: 2,
        pointHoverBackgroundColor: "#FBCEB1",
        tension: 0.4,
        fill: false,
        yAxisID: "temp",
      },
      {
        label: "",
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
        min: 0,
        max: 60,
        ticks: { color: "#fff" },
      },
      humid: {
        min: 0,
        max: 100,
        ticks: { color: "#fff" },
      },
      x: {
        ticks: { color: "#fff" },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <NomalGlass
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
    </NomalGlass>
  );
}
