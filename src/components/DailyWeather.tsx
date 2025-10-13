import { LiquidGlass as NormalGlass } from "@liquidglass/react";
import type { WeatherData } from "../assets/api/WeatherApi";
import { icons, getWeatherIcon } from "../assets/api/Icons";
interface DailyWeather {
  info?: WeatherData["daily"];
}

export default function DailyWeather(weather: Readonly<DailyWeather>) {
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
        <div className="px-8 py-4 text-black text-lg
        text-shadow-[0_10px_20px_rgba(0,0,0,0.19),0_6px_6px_rgba(0,0,0,0.23)]
         dark:text-white">Loading...</div>
      </NormalGlass>
    );
  }
  // prettier-ignore
  return (
    <NormalGlass
      borderRadius={20}
      blur={2}
      contrast={1.15}
      brightness={1}
      saturation={1.1}
      elasticity={0.3}
    >
      <div className="w-full h-full grid grid-cold-4 grid-rows-7
                      md:grid-cols-17 md:grid-rows-4 gap-2 p-2
                      text-shadow-[0_10px_20px_rgba(0,0,0,0.19),0_6px_6px_rgba(0,0,0,0.23)] ">
        <div className="col-span-4 row-span-1 flex flex-row
                        md:col-span-5 md:row-span-4 md:flex-col">
          <div className="w-1/4 h-full flex items-center justify-center
                          md:w-full md:h-1/8">
            <p className="text-sm md:text-xs ">{new Date(info.time[0]).toLocaleDateString('de-DE')}</p>
          </div>
          <div className="w-1/4 h-full flex items-center justify-center
                          md:w-full md:h-3/8">
             <img
                src={getWeatherIcon(1, info.weather_code[0])}
                alt="wind icon"
                className="w-full h-full"
             />
          </div>
          <div className="w-1/4 h-full flex flex-row
                          md:w-full md:h-2/8">
              <div className="w-1/2 h-full">
                <img
                src={icons.metric.thermoCold}
                alt="wind icon"
                className="w-full h-full"
                />
              </div>
              <div className="w-1/2 h-full flex items-center justify-center">
              <p className="text-sm md:text-xs">{info.temperature_2m_min[0].toFixed(1)}</p>
              </div>
          </div>
          <div className="w-1/4 h-full flex flex-row
                          md:w-full md:h-2/8">
              <div className="w-1/2 h-full">
                <img
                src={icons.metric.thermoWarm}
                alt="wind icon"
                className="w-full h-full"
                />
              </div>
              <div className="w-1/2 h-full flex items-center justify-center">
              <p className="text-sm md:text-xs">{info.temperature_2m_max[0].toFixed(1)}</p>
              </div>
          </div>
        </div>
        {info.time.slice(1, 7).map((t, i) => {
          return (
            <div
              key={new Date(t).toLocaleDateString()}
              className="col-span-4 row-span-1 flex flex-row  bg-white rounded-2xl p-2 shadow-[0_0_5px_rgba(0,0,0,0.19),0_4px_6px_rgba(0,0,0,0.23)]
                         md:col-span-4 md:row-span-2 md:flex-col"
            >
              <div className="w-1/4 h-full flex items-center justify-center
                              md:w-full md:h-1/8">
                <p className="text-sm md:text-xs">{new Date(t).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' })}</p>
              </div>
              <div className="w-1/4 h-full flex items-center justify-center
                              md:w-full md:h-3/8">
                <img
                  src={getWeatherIcon(1, info.weather_code[i + 1])}
                  alt="weather icon"
                  className="w-full h-full"
                />
              </div>
              <div className="w-1/4 h-full flex flex-row
                              md:w-full md:h-2/8">
                <div className="w-1/2 h-full">
                  <img
                    src={icons.metric.thermoCold}
                    alt="cold icon"
                    className="w-full h-full"
                  />
                </div>
                <div className="w-1/2 h-full flex items-center justify-center">
                  <p className="text-sm md:text-xs">{info.temperature_2m_min[i + 1].toFixed(1)}</p>
                </div>
              </div>
              <div className="w-1/4 h-full flex flex-row
                              md:w-full md:h-2/8">
                <div className="w-1/2 h-full">
                  <img
                    src={icons.metric.thermoWarm}
                    alt="warm icon"
                    className="w-full h-full"
                  />
                </div>
                <div className="w-1/2 h-full flex items-center justify-center">
                  <p className="text-sm md:text-xs">{info.temperature_2m_max[i + 1].toFixed(1)}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </NormalGlass>
  );
}
