'use client'
import { ThemeProvider } from "next-themes";
import NextUI from '@/config/NextUI'

export default function Provider({ children }) {
    return (
        <>
            <NextUI>
                <ThemeProvider >
                    {children}
                </ThemeProvider >
            </NextUI>
        </>
    )
}