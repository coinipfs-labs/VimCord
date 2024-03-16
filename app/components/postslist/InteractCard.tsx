'use client'
import { useRouter } from "next/navigation";
import { RiChat1Line, RiHeart3Line, RiRepeat2Line, RiShieldCheckLine } from "react-icons/ri";
import Motion from '@/components/Motion'
export default function interactCard({ dataname }) {
  const router = useRouter();
  return (
    <div>
      {/* interactCard */}
      <div className='max-w-[50%] sm:max-w-[100vw] justify-around flex items-center mt-1'>
        <Motion>
          <button className=" grid justify-items-center pt-1 rounded-full size-6  hover:bg-primary/30" onClick={() => router.push(`/${dataname.by.handle.localName}.lens/posts/${dataname.id}`)} >
            <RiChat1Line className="size-4 " />
            <p>{dataname.stats.comments}</p>

          </button>
        </Motion>

        <Motion>
          <button className=" grid justify-items-center pt-1 rounded-full size-6  hover:bg-rose-600/30"  >
            <RiHeart3Line className="size-4 " />{/* RiHeart3Fill  */}
            <p>{dataname.stats.upvotes}</p>
          </button>
        </Motion>

        <Motion>
          <button className=" grid justify-items-center pt-1 rounded-full size-6  hover:bg-sky-400/30"  >
            <RiRepeat2Line className="size-4 " />
            <p>{dataname.stats.mirrors}</p>
          </button>
        </Motion>

        <Motion>
          <button className=" grid justify-items-center pt-1 rounded-full size-6  hover:bg-emerald-600/30"  >
            <RiShieldCheckLine className="size-4 " />
            <p>{dataname.stats.collects}</p>
          </button>
        </Motion>

      </div>
    </div>
  )
}

