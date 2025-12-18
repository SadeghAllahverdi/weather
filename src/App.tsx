import { useEffect, useRef, useState } from "react";
import getWeather from "./assets/api/WeatherApi.ts";
import type { WeatherData } from "./assets/api/WeatherApi.ts";

import SearchBar from "./components/SearchBar";
import CurrentWeather from "./components/CurrentWeather";
import DailyWeather from "./components/DailyWeather";
import HourlyWeather from "./components/HourlyWeather";
import { cityBackgroundImage, getUserIp, ipToCity } from "./assets/api/InitialLocationGuess.ts";

export default function App() {
  const [backgroundImageUrl, setBackgroundImageUrl] = useState("/cologne-christmas-market-1600x890.jpg");
  const containerRef = useRef<HTMLDivElement>(null);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const handleSearch = async (cityName: string) => {
    const weatherData = await getWeather(cityName);
    setWeather(weatherData);
  };

  useEffect(() => {
    if (!weather) {
      getUserIp().then((ip) => {
        ipToCity(ip).then((city) => {
          getWeather(city).then((weatherData) => {
            setWeather(weatherData);
          });
          cityBackgroundImage(city).then((newImageUrl) => {
            setBackgroundImageUrl(newImageUrl);
          });
        });
      }).catch((err) => {
        console.error("Error during initial location guess:", err);
        getWeather("Düsseldorf").then((weatherData) => {
            setWeather(weatherData);
          });
          cityBackgroundImage("Düsseldorf").then((newImageUrl) => {
            setBackgroundImageUrl(newImageUrl);
          });
      });
    }
  }, []);

  return (
    <div className="w-full min-h-screen font-[Roboto_Serif]
                   bg-center bg-cover bg-no-repeat bg-fixed"
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}
    >
      <div
        ref={containerRef}
        className="flex flex-col items-center justify-center gap-5 p-8 max-w-full">
        <SearchBar containerRef={containerRef} onSearch={handleSearch} setBackgroundImageUrl={setBackgroundImageUrl} />
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