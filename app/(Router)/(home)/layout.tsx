'use client'

import './home.css'
import { ListMusic, Newspaper, PersonStanding, Shapes, } from "lucide-react"
import Link from 'next/link'
import { usePathname } from 'next/navigation'


export default function Home({ children }) {
  const pathname = usePathname();

  const linknav = [
    {
      href: "/",
      name: "首页",
      logo: <Newspaper size={16} />
    },
    {
      href: "/music",
      name: "音乐",
      logo: <ListMusic size={16} />
    },
    {
      href: "/",
      name: "收集",
      logo: <Shapes size={16} />
    }
  ]
  return (
    <div className="mx-auto max-w-[1536px] pb-12">


      <div className="flex">
        {linknav.map((item, index) => (
          <div key={index} className={`home_nav mr-4 ${pathname === item.href ? 'active' : ''}`}>
            <Link
              href={item.href}
              className="flex items-center justify-start mb-1">
              {item.logo}
              <p className="text-sm ml-2">{item.name}</p>
            </Link>
          </div>
        ))}
      </div>

      <div className='mt-3 flex max-w-[100vw]  justify-center sm:justify-normal'>
       
          {children}
      
      </div>

    </div>
  )
}
