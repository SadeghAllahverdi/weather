import { useRef, useState } from "react";
import getWeather from "./assets/api/WeatherApi.ts";
import type { WeatherData } from "./assets/api/WeatherApi.ts";

import SearchBar from "./components/SearchBar";
import CurrentWeather from "./components/CurrentWeather";
import DailyWeather from "./components/DailyWeather";
import HourlyWeather from "./components/HourlyWeather";

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const handleSearch = async (cityName: string) => {
    const weattherData = await getWeather(cityName);
    setWeather(weattherData);
  };
  return (
    <div className="w-full min-h-screen font-[Roboto_Serif]
                  bg-[url(https://img.craftpix.net/2022/12/Free-Mountain-Backgrounds-Pixel-Art6.png)] bg-center">
      <div
        ref={containerRef}
        className="flex flex-col items-center justify-center gap-5 p-8 max-w-full">
        <SearchBar containerRef={containerRef} onSearch={handleSearch} />
        {/* Weather components */}
        <div className="w-8/10 min-h-screen z-0 flex flex-col items-center justify-center gap-7 mt-30 md:mt-20">
          <div className="w-full flex flex-col md:flex-row justify-between gap-7">
            <div className="w-full md:flex-1 h-96 md:h-84 rounded-2xl hover:scale-105 transition duration-500 ease-in-out">
              <CurrentWeather info={weather?.current} />
            </div>
            <div className="w-full md:w-2/5 h-64 md:h-84 rounded-2xl hover:scale-105 transition duration-500 ease-in-out">
              <DailyWeather info={weather?.daily} />
            </div>
          </div>
          <div className="w-full h-64 rounded-2xl hover:scale-105 transition duration-500 ease-in-out">
            <HourlyWeather info={weather?.hourly} />
          </div>
        </div>
      </div>
    </div>
  );
}