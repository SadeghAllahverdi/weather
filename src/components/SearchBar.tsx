import { Search } from "lucide-react";
import LiquidGlass from "liquid-glass-react";
interface SearchBarProps {
  containerRef?: React.RefObject<HTMLDivElement | null>;
}

export default function SearchBar({ containerRef }: Readonly<SearchBarProps>) {
  return (
    <LiquidGlass
      mouseContainer={containerRef}
      cornerRadius={20}
      elasticity={0.9}
      style={{ position: "fixed", top: "10%", left: "50%", zIndex: 1 }}
    >
      <button
        type="button"
        onClick={() => console.log("Search button clicked")}
        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600 hover:text-black hover:scale-110 transition-colors"
      >
        <Search className="w-5 h-5" />
      </button>
      <input
        className="pl-10 pr-4 text-black text-lg rounded-md focus:outline-none"
        type="text"
        placeholder="Search City"
      />
    </LiquidGlass>
  );
}
