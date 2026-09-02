import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <button
      onClick={() => setDark((prev) => !prev)}
      type="button"
      className="p-3 rounded-full bg-green-100 dark:bg-slate-800 text-green-700 dark:text-yellow-400 transition cursor-pointer"
      aria-label="Toggle Theme"
    >
      {dark ? <Sun size={22} /> : <Moon size={22} />}
    </button>
  );
}
