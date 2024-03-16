'use client'
import { useTheme } from "next-themes";
import {Button} from '@nextui-org/react'

export default function ThemeButton() {
  const { theme,setTheme } = useTheme();

  return (
    <div>
      <Button onClick={() => setTheme("light")} >Light</Button>
      <Button onClick={() => setTheme("dark")}>Dark</Button>
    </div>
  );
}
