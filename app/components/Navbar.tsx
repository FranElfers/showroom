import { useState, useEffect } from "react";
import { Category, photos } from "../constants";
import { ViewModeSwitch } from "./ViewModeSwitch";

interface NavbarProps {
  currentCategory: Category;
  currentView: "showroom" | "grid";
  onCategoryChange: (c: Category) => void;
  onViewChange: (v: "showroom" | "grid") => void;
}

export function Navbar({
  currentCategory,
  currentView,
  onCategoryChange,
  onViewChange,
}: NavbarProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const categories = ["todos", ...Object.keys(photos)] as Category[];

  return (
    <nav
      className={`fixed top-0 z-50 w-full  bg-gradient-to-b from-black/30 to-transparent transition-transform duration-500 ${isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
    >
      <div className="mx-auto flex h-20 max-w-[2560px] items-center justify-between px-6 md:px-12">
        <div className="flex items-center gap-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`text-xs uppercase tracking-[0.2em] transition-all duration-500 ${currentCategory === cat
                ? "text-white font-medium"
                : "text-white/50 hover:text-white/80"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <ViewModeSwitch currentView={currentView} onViewChange={onViewChange} />
      </div>
    </nav>
  );
}
