interface ViewModeSwitchProps {
  currentView: "showroom" | "grid";
  onViewChange: (v: "showroom" | "grid") => void;
}

export function ViewModeSwitch({ currentView, onViewChange }: ViewModeSwitchProps) {
  return (
    <div className="flex items-center gap-4">
      <button
        onClick={() => onViewChange("showroom")}
        className={`text-xs uppercase tracking-[0.2em] transition-all duration-500 ${currentView === "showroom"
            ? "text-white font-medium"
            : "text-white/50 hover:text-white/80"
          }`}
      >
        Showroom
      </button>
      <span className="text-neutral-300 text-xs">/</span>
      <button
        onClick={() => onViewChange("grid")}
        className={`text-xs uppercase tracking-[0.2em] transition-all duration-500 ${currentView === "grid"
            ? "text-white font-medium"
            : "text-white/50 hover:text-white/80"
          }`}
      >
        Grid
      </button>
    </div>
  );
}
