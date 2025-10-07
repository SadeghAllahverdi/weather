import { useRef } from "react";
import SearchBar from "./components/SearchBar";
import CurrentWeather from "./components/CurrentWeather";
import DailyWeather from "./components/DailyWeather";
import HourlyWeather from "./components/HourlyWeather";

function App() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="w-screen h-screen">
      <div
        ref={containerRef}
        className="w-full h-full 
          bg-[url(https://images.pexels.com/photos/956999/milky-way-starry-sky-night-sky-star-956999.jpeg)]
          bg-cover bg-center bg-no-repeat
          flex flex-col items-center justify-center gap-8 p-8"
      >
        <SearchBar containerRef={containerRef} />

        <div className="w-full min-h-screen flex flex-col items-center justify-center gap-4">
          <div className="w-full flex justify-between gap-4">
            <div className="flex-1 h-84 rounded-2xl">
              <CurrentWeather />
            </div>

            <div className="w-2/5 h-84 rounded-2xl">
              <DailyWeather />
            </div>
          </div>

          <div className="w-full h-48 rounded-2xl">
            <HourlyWeather />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
