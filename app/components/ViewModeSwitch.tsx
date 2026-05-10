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
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="4" width="20" height="7" rx="1" />
          <rect x="2" y="13" width="9" height="7" rx="1" />
          <rect x="13" y="13" width="9" height="7" rx="1" />
        </svg>
      </button>
      <span className="text-neutral-300 text-xs">/</span>
      <button
        onClick={() => onViewChange("grid")}
        className={`text-xs uppercase tracking-[0.2em] transition-all duration-500 ${currentView === "grid"
          ? "text-white font-medium"
          : "text-white/50 hover:text-white/80"
          }`}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
        </svg>
      </button>
    </div>
  );
}
