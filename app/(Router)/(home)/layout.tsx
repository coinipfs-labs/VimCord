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
      name: "推荐",
      logo: <RiShapesLine  />
    },
    {
      href: "/article",
      name: "文章",
      logo: <RiFileTextLine  />
    },
    {
      href: "/image",
      name: "图像",
      logo: <RiImageLine  />
    },
    {
      href: "/music",
      name: "音乐",
      logo: <RiMusic2Line  />
    },
    {
      href: "/video",
      name: "视频",
      logo: <RiVideoLine  />
    }
  ]
  return (
    <div className="mx-auto max-w-[1536px] justify-center pb-12  flex  flex-col">


      <div className="flex flex-row sm:flex-row border border-t-0 sm:border-r-0 sm:border-l-0 z-50 sm:bg-[--background-nav] sm:w-screen  h-14 items-center sm:fixed sm:top-0  max-w-4xl mx-auto w-[100vw]">
        {linknav.map((item) => (
          <div className='mx-auto justify-around w-[20%] flex hover:bg-[--link-hover-background]' key={item.href}>

          <Link  href={item.href} className={`home_nav flex items-center justify-center w-[100%] h-[56px] sm:flex-col sm:justify-around text-[#878787]  ${pathname === item.href ? 'active' : ''}`}>
              <div className=' justify-center text-2xl sm:text-xl'> {item.logo} </div>
              <p className="text-sm ml-2 sm:ml-0 text-inherit">{item.name}</p>
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


