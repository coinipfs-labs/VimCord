'use client'

import { motion } from 'framer-motion'
import './home.css'
import { ListMusic, Newspaper, PersonStanding, Shapes, } from "lucide-react"
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


      <div className="flex flex-row sm:flex-row border h-16 sm:w-screen   items-center sm:fixed sm:top-0 sm:backdrop-blur-2xl max-w-4xl mx-auto w-[100%]">
        {linknav.map((item, index) => (
          <div className='mx-auto justify-around w-[20%] flex hover:bg-[#6463631a]'>

          <Link key={index} href={item.href} className={`home_nav flex items-center justify-center w-[100%] h-[64px] sm:flex-col sm:justify-around ${pathname === item.href ? 'active' : ''}`}>
              <div className=' justify-center color-[#545353d3] text-2xl sm:text-xl'> {item.logo} </div>
              <p className="text-sm ml-2 sm:ml-0 ">{item.name}</p>
          </Link>
          </div>
        ))}
      </div>

      <div className=' flex  sm:justify-normal sm:pt-[64px]'>

        {children}

      </div>

    </div>
  )
}


