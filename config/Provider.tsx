import { LensProvider } from '@/config/lens-provider'
import { ThemeProvider } from "next-themes";
import NextUI from './NextUI'

export default function Provider({ children }) {
    return (
        <>
            <ThemeProvider >
                <LensProvider>
                    <NextUI>
                        {children}
                    </NextUI>
                </LensProvider>
            </ThemeProvider >
        </>
    )
}