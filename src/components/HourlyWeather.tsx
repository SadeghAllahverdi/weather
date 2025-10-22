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
        <div
          className="px-8 py-4 text-dark text-lg dark:text-white
        text-shadow-[0_10px_20px_rgba(0,0,0,0.19),0_6px_6px_rgba(0,0,0,0.23)]"
        >
          Loading...
        </div>
      </NormalGlass>
    );
  }
  const maxTemperature_2m = Math.round(Math.max(...info.temperature_2m) + 1);
  const minTemperature_2m = Math.round(Math.min(...info.temperature_2m) - 1);
  const max_Humidity = Math.round(Math.max(...info.relative_humidity_2m) + 1);
  const min_Humidity = Math.round(Math.min(...info.relative_humidity_2m) - 1);
  const max_Dew = Math.round(Math.max(...info.dew_point_2m) + 1);
  const min_Dew = Math.round(Math.min(...info.dew_point_2m) - 1);

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
        pointHoverBackgroundColor: "#FF69B4 ",
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
      {
        label: "dew (%)",
        data: info.dew_point_2m,
        borderColor: "#FF00FF",
        borderWidth: 3,
        pointRadius: 2,
        pointHoverBackgroundColor: "#00FFFF",
        tension: 0.4,
        fill: false,
        yAxisID: "dew",
      },
    ],
  };
  const options = {
    plugins: {
      legend: {
        display: true,
        labels: {
          color: "white",
          borderRadius: 4,
          font: { size: 14, family: "'Roboto Serif', serif" },
        },
      },
    },
    scales: {
      temp: {
        min: minTemperature_2m,
        max: maxTemperature_2m,
        ticks: {
          color: "#E52B50",
          count: 6,
          font: { size: 14, family: "'Roboto Serif', serif" },
        },
      },
      humid: {
        min: min_Humidity,
        max: max_Humidity,
        ticks: {
          color: "#0CAFFF",
          count: 6,
          font: { size: 14, family: "'Roboto Serif', serif" },
        },
      },
      dew: {
        min: min_Dew,
        max: max_Dew,
        ticks: {
          color: "#FF00FF",
          count: 6,
          font: { size: 14, family: "'Roboto Serif', serif" },
        },
      },
      x: {
        ticks: {
          color: "white",
          font: { size: 14, family: "'Roboto Serif', serif" },
        },
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
      <div className="w-full h-full p-1 md:p-7 hover:scale-105 transition duration-500 ease-in-out">
        {/* <Line data={data} options={options} /> */}
        <Line data={data} options={options} />
      </div>
    </NormalGlass>
  );
}
