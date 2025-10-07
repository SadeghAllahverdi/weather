import { useRef, useState } from "react";
import SearchBar from "./components/SearchBar";
import CurrentWeather from "./components/CurrentWeather";
import DailyWeather from "./components/DailyWeather";
import HourlyWeather from "./components/HourlyWeather";
import FetchData from "./components/FetchData";

function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [weatherData, setWeatherData] = useState(null);

  return (

    <div className="w-screen h-screen">
      <div
        ref={containerRef}
        className="w-full h-full
          bg-[url(https://images.pexels.com/photos/956999/milky-way-starry-sky-night-sky-star-956999.jpeg)]
          bg-cover bg-center bg-no-repeat
          flex flex-col items-center justify-center gap-8 p-8"
      >
        <FetchData cityName={"Essen"} setWeatherData={setWeatherData} />
        <SearchBar containerRef={containerRef} />

        <div className="w-full mt-50 overflow flex flex-col items-center justify-center gap-4 md:min-h-screen md:mt-0">
          <div className="w-full gap-4 md:flex md:justify-between md:gap-5">
            <div className="w-full h-1/2 md:flex-1 md:h-84 md:rounded-2xl">
              <CurrentWeather />
            </div>

            <div className="w-full h-84  md:w-2/5 md:rounded-2xl">
              <DailyWeather />
            </div>
          </div>
          <div className="w-full mt-4 md:mt-0">
            <div className="w-full h-48 rounded-2xl">
            <HourlyWeather />
            </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default App;
