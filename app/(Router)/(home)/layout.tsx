'use client'

import './home.css'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { RiFileTextLine, RiImageLine, RiMusic2Line, RiShapesLine, RiVideoLine } from 'react-icons/ri'


export default function Home({ children }) {
  const pathname = usePathname();

  const linknav = [
    {
      href: "/",
      name: "All",
      logo: <RiShapesLine  />
    },
    {
      href: "/article",
      name: "article",
      logo: <RiFileTextLine  />
    },
    {
      href: "/image",
      name: "image",
      logo: <RiImageLine  />
    },
    {
      href: "/music",
      name: "music",
      logo: <RiMusic2Line  />
    },
    {
      href: "/video",
      name: "video",
      logo: <RiVideoLine  />
    }
  ]
  return (
    <div className="mx-auto max-w-[1536px] justify-center pb-12  flex  flex-col">


      <div className="flex flex-row sm:flex-row border border-t-0 sm:border-r-0 sm:border-l-0 z-20 sm:bg-[--background-nav] sm:w-screen  h-[56px] items-center sm:fixed sm:top-0  max-w-4xl mx-auto w-[100vw]">
        {linknav.map((item) => (
          <div className='mx-auto justify-around w-[20%] flex hover:bg-[--link-hover-background] z-20' key={item.href}>

          <Link  href={item.href} className={`home_nav z-20 flex items-center justify-center w-[100%] h-[56px] sm:flex-col sm:justify-around text-[#878787]  ${pathname === item.href ? 'active' : ''}`}>
              <div className=' justify-center text-2xl sm:text-xl z-20'> {item.logo} </div>
              <p className="text-sm ml-2 sm:ml-0 text-inherit z-20">{item.name}</p>
          </Link>
          </div>
        ))}
      </div>

      <div className=' flex  sm:justify-normal sm:mt-[56px]'>

        {children}

      </div>

    </div>
  )
}


