import './globals.css'
import { Inter } from 'next/font/google'

import Header from '@/components/header/header'
import Provider from './config/Provider'
const inter = Inter({ subsets: ['latin'] })

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <Header />
          <div className='max-w-[1536px] mx-auto'>
            {children}
          </div>
        </Provider>

      </body>
    </html>
  )
}

