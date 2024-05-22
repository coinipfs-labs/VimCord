"use client";
import { useTheme } from "next-themes";
import {  Switch } from "@nextui-org/react";
import { useEffect, useState } from "react";
import {FaSun,FaMoon} from 'react-icons/fa6'
export default function ThemeButton() {
  const { theme, setTheme } = useTheme();
  const [isDark, setIsDark] = useState(theme === "dark");

  useEffect(() => {
    setIsDark(theme === "light");
  }, [theme]);

  const handleSwitchChange = () => {
    const newTheme = isDark ? "dark" : "light";
    setTheme(newTheme);
    setIsDark(!isDark);
  };
  return (
    <div>
      <Switch
        checked={isDark}
        onChange={handleSwitchChange}
        //startContent={<FaSun />}
        //endContent={<FaMoon />}
        thumbIcon={({ isSelected, className }) =>
          isSelected ? (
            <FaMoon className={className} />
          ) : (
            <FaSun className={className} />
          )
        }
    />

    </div>
  );
}

