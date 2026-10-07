"use client";

import { useTheme } from "./ThemeContext";
import { Sun, Moon } from "lucide-react";
import ui from "@/data/site/ui.json";
import styles from "./ThemeToggle.module.css";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const label = theme === "dark" ? ui.themeToggle.toLight : ui.themeToggle.toDark;

  return (
    <button
      onClick={toggleTheme}
      className={styles.toggleBtn}
      aria-label={label}
      title={label}
    >
      {theme === "dark" ? (
        <Sun size={20} className={styles.sunIcon} />
      ) : (
        <Moon size={20} className={styles.moonIcon} />
      )}
    </button>
  );
}
