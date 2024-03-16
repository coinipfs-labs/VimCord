import './globals.css'
import { Inter } from 'next/font/google'
import Header from '@/components/header/header'
import Provider from '@/config/Provider'

import { headers } from 'next/headers'
import { cookieToInitialState } from 'wagmi'
import { config } from '@/config/WagmiProvider'
import { ContextProvider } from '@/context/Web3ModalProvider'


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


        <ContextProvider initialState={initialState}>
          <Provider>
            <Header />
            <div className='max-w-[1536px] mx-auto'>
              {children}
            </div>
          </Provider>
        </ContextProvider>


      </body>
    </html>
  )
}

