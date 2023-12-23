'use client'
import { useTheme } from "next-themes";
import {Button} from '@nextui-org/react'

export default function page() {
  const { setTheme, theme } = useTheme();

  return (
    <div>
      <Button onClick={() => setTheme("light")} >Light</Button>
      <Button onClick={() => setTheme("dark")}>Dark</Button>
      <Button onClick={() => setTheme("system")}>System</Button>
    </div>
  );
}
