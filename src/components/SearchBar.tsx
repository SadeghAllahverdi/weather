import LiquidGlass from "liquid-glass-react";
interface SearchBarProps {
  containerRef?: React.RefObject<HTMLDivElement | null>;
}

export default function SearchBar({ containerRef }: SearchBarProps) {
  return (
    <LiquidGlass
      mouseContainer={containerRef}
      cornerRadius={20}
      elasticity={0.7}
      style={{ position: "fixed", top: "5%", left: "50%" }}
    >
      <div className="px-8 py-4 text-white text-lg">Search bar content</div>
    </LiquidGlass>
  );
}
