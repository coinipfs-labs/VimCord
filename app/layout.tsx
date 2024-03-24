import './globals.css'
import { Inter } from 'next/font/google'
import Header from '@/components/header/header'
import Provider from '@/app/Provider'

import { headers } from 'next/headers'
import { cookieToInitialState } from 'wagmi'
import { config } from '@/config/WagmiProvider'
import { ContextProvider } from '@/app/context/Web3ModalProvider'
import { LensProvider } from '@/config/lens-provider'


const inter = Inter({ subsets: ['latin'] })
export const metadata = {
  title: {
    template: '%s | VimCord',
    default: 'VimCord',
  },
  description:
    "",
  icons: {
    icon: '/favicon.ico',
    shortcut: '/shortcut-icon.png',
    apple: '/apple-icon.png',
  },

};
export default function Layout({ children }: { children: React.ReactNode }) {
  const initialState = cookieToInitialState(config, headers().get('cookie'))
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      </head>
      <body className={`${inter.className} overflow-y-scroll`}>


        <Provider>
          <ContextProvider initialState={initialState}>
            <LensProvider>

              <Header />
              <div className='max-w-[1536px] mx-auto'>
                {children}
              </div>
            </LensProvider>
          </ContextProvider>
        </Provider>


      </body>
    </html>
  )
}

