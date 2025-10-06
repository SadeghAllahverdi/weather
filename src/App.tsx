import { useRef } from "react";
import "./App.css";
import LiquidGlass from "liquid-glass-react";

//import CurrentWeather from "./components/CurrentWeather";
// import DailyWeather from "./components/DailyWeather";
// import HourlyWeather from "./components/HourlyWeather";
// import SearchBar from "./components/SearchBar";
// import Footer from "./components/Footer";

function App() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="bg-linear-to-bl from-cyan-500 to-blue-500 w-full h-screen bg-image flex flex-col gap-6 p-8 mx-auto"
    >
      <LiquidGlass
        mouseContainer={containerRef}
        elasticity={0.3}
        style={{ position: "fixed", top: "50%", left: "50%" }}
        cornerRadius={10}
        className="bg-linear-to-r from-blue-50 to-red-200"
      >
        <div className="p-6">
          <h2>Glass responds to mouse anywhere in the container</h2>
        </div>
      </LiquidGlass>

      <LiquidGlass
        mouseContainer={containerRef}
        elasticity={1.0}
        style={{ position: "fixed", top: "10%", left: "50%" }}
      >
        <div className="p-6 ">
          <h2>Glass responds to mouse anywhere in the container</h2>
        </div>
      </LiquidGlass>
    </div>
  );
}

export default App;
