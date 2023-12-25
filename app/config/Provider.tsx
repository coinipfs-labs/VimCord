import { ThemeProvider } from "@/config/theme-provider"
import { LensProvider } from '@/config/lens-provider'
import  {Web3Modal}   from './Web3Modal'
import NextUI from './NextUI'

export default function Provider({ children }) {
    return (
        <>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Web3Modal>
                    <LensProvider>
                        <NextUI>
                       {children}
                        </NextUI>
                    </LensProvider>
                    </Web3Modal>
            </ThemeProvider >
        </>
    )
}