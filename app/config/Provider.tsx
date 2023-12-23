import { ThemeProvider } from "@/config/theme-provider"
import { LensProvider } from '@/config/lens-provider'
import  {Web3Modal}   from './Web3Modal'
import NextUI from './NextUI'

export default function Provider({ children }) {
    return (
        <>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
               
                    <LensProvider>
                        <NextUI>
                        <Web3Modal>{children}</Web3Modal>
                        </NextUI>
                    </LensProvider>
                
            </ThemeProvider >
        </>
    )
}