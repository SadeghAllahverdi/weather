import { useRef } from "react";

import { LiquidGlass as NomalGlass } from "@liquidglass/react";
import LiquidGlass from "liquid-glass-react";

function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  return (
    <div className="w-screen h-screen">
      <div
        className="w-full h-full 
                      bg-[url(https://images.pexels.com/photos/956999/milky-way-starry-sky-night-sky-star-956999.jpeg?_gl=1*1r4qe7s*_ga*MTQyOTQzODc5NS4xNzU5Nzc3NTE2*_ga_8JE65Q40S6*czE3NTk4Mjg0MTckbzIkZzEkdDE3NTk4Mjg1MTYkajQyJGwwJGgw)] 
                      bg-cover bg-center bg-no-repeat
                      flex flex-col items-center justify-center gap-8 p-8"
      >
        <LiquidGlass
          mouseContainer={containerRef}
          cornerRadius={20}
          elasticity={0.7}
          style={{ position: "fixed", top: "5%", left: "50%" }}
        >
          <div className="h-5 w-50">this tracks mouse</div>
        </LiquidGlass>

        <div className="w-full min-h-screen flex flex-col items-center justify-center gap-4">
          <div className="w-full flex justify-between gap-4">
            <div className="flex-1 h-84 rounded-2xl">
              <NomalGlass
                borderRadius={20}
                blur={2}
                contrast={1.15}
                brightness={2}
                saturation={1.1}
                elasticity={0.3}
              >
                <div className="px-8 py-4 w-auto">this tracks mouse</div>
              </NomalGlass>
            </div>

            <div className="w-2/5 h-84 rounded-2xl">
              <NomalGlass
                borderRadius={20}
                blur={2}
                contrast={1.15}
                brightness={2}
                saturation={1.1}
                elasticity={0.2}
              >
                <div className="px-8 py-4 w-auto">this tracks mouse</div>
              </NomalGlass>
            </div>
          </div>

          <div className="w-full h-48 rounded-2xl">
            <NomalGlass
              borderRadius={20}
              blur={1.8}
              contrast={1.15}
              brightness={2}
              saturation={1.1}
              elasticity={0.2}
            >
              <div className="px-8 py-4 w-auto">this tracks mouse</div>
            </NomalGlass>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
