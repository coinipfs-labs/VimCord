'use client'

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
          <div>
            <Link
              key={index}
              href={item.href}
              className="justify-start mb-1">
              {item.logo}
              <p className="text-sm">{item.name}</p>
            </Link>
          </div>
        ))}
      </div>

      <div className='md:flex min-h-[300px] mt-3'>
        <div className="flex flex-1 pb-4 ">
          {children}
        </div>
      </div>

    </div>
  )
}
